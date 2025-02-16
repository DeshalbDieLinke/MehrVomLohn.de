import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputComponent from "../components/Input.tsx";
import SteuernChart from "../components/SteuernChart.tsx";
import type { RechartsData } from "../components/SteuernChart.tsx";
import { useState, useRef, useEffect} from "react";
import taxdata from "../data/taxdata.json";
import { CallToActionWrapper, Status } from "./CallToActionWrapper.tsx";
import { FirstInput, type IncomeGroupsForInput } from "./FirstInput.tsx";

export interface TaxGroup {
    type: string;
    linke: number[];
    gruene: number[];
    spd: number[];
    bsw: number[];
    cdu: number[];
    fdp: number[];
    afd: number[];
}

export interface TaxData {
    taxgroups: TaxGroup[];
    colors: { [key: string]: string };
}

function GetRecomendations(data: RechartsData[]): { party: string; status: Status; entlastung_linke: number; best_entlastung: number } {
    let max = { v: 0, p: "" };
    let dielinke_entlastung = 0;
    data.forEach((entry: RechartsData) => {
        if (entry.name == "linke") {
            dielinke_entlastung = entry.value;
        }
        if (entry.value > max.v) {
            max = { v: entry.value, p: entry.name };
        }
    });
    let status = Status.andere;
    if (max.p == "linke") {
        status = Status.linke;
    }
    if (dielinke_entlastung < 0) {
        status = Status.linkenegativ;
    }
    return { party: max.p, status: status, best_entlastung: max.v, entlastung_linke: dielinke_entlastung };
}

export default function SliderChartWrapper() {
    let [userdata, setUserdata] = useState({ income: -1, status: "single", percentage_or_value: false });

    // Updates the query params.
    useEffect(() => {
        if (userdata.income == -1) {
            return;
        }
        console.log("userdata:" + userdata);
        let params = new URLSearchParams(window.location.search);
        params.set("income", userdata.income.toString());
        params.set("status", userdata.status.toString());
        window.history.pushState({}, "", "?"+ params.toString());
    }, [userdata]);

    // Initialize the user data from the query params.
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let income = params.get("income");
        let status = params.get("status");
        if (income != null && status != null) {
            setUserdata({ income: parseInt(income), status: status, percentage_or_value: false });
        }
    }, []);

    let data = CalcGraphData(taxdata.taxgroups, taxdata.colors, userdata);
    console.log(data);
    let recom = GetRecomendations(data);
    // console.log(recom);
    const tabs = useRef<HTMLInputElement | null>(null)
    return (
        <>
            {userdata.income == -1 && (
                <Tabs ref={tabs} defaultValue="single" className="w-full">
                    <TabsList className="flex justify-center">
                        <TabsTrigger value="single">Singe</TabsTrigger>
                        <TabsTrigger value="paar">Paar</TabsTrigger>
                        <TabsTrigger value="twochildren">Paar mit zwei Kindern</TabsTrigger>
                    </TabsList>
                    <TabsContent value="single" className={tabs.current?.value == "single" ? "bg-r-500" : ""}>
                        <FirstInput
                            setUserData={setUserdata}
                            status="single"
                            input={[
                                { value: 10000, label: "0€-10000€" },
                                { value: 20000, label: "10001€-20000€" },
                                { value: 30000, label: "20001€-30000€" },
                                { value: 40000, label: "30001€-40000€" },
                                { value: 55000, label: "40001€-55000€" },
                                { value: 80000, label: "55001€-80000€" },
                                { value: 100000, label: "80001€-100000€" },
                                { value: 150000, label: "100001€-150000€" },
                                { value: 250000, label: "150001€-250000€" },
                                { value: 2000000, label: "250001€-2000000€" },
                            ]}
                        />
                    </TabsContent>
                    <TabsContent value="paar">
                        <FirstInput
                            setUserData={setUserdata}
                            status="paar"
                            input={[
                                { value: 40000, label: "40000€" },
                                { value: 60000, label: "60000€" },
                                { value: 80000, label: "80000€" },
                                { value: 120000, label: "120000€" },
                                { value: 180000, label: "180000€" },
                            ]}
                        />
                    </TabsContent>
                    <TabsContent value="twochildren">
                        <FirstInput
                            setUserData={setUserdata}
                            status="twochildren"
                            input={[
                                { value: 40000, label: "40000€" },
                                { value: 60000, label: "60000€" },
                                { value: 80000, label: "80000€" },
                                { value: 120000, label: "120000€" },
                                { value: 180000, label: "180000€" },
                            ]}
                        />
                    </TabsContent>
                </Tabs>
            )}
            {userdata.income != -1 && (
                <div className="md:p-4" id="result">
                    <InputComponent value={userdata} setValue={setUserdata} />
                    <div >
                        <SteuernChart data={data} percentage_or_value={userdata.percentage_or_value} />
                    </div>
                    <div>
                        <CallToActionWrapper output={recom} percentage_or_value={userdata.percentage_or_value} />
                    </div>
                </div>
            )}
        </>
    );
}

function UserIncomeIsInGroup(userincome: number, taxgroup: number): boolean {
    return userincome <= taxgroup;
}

function isNumberString(value: string): boolean {
    return !isNaN(Number(value));
}

// TODO: fix types
function PushTaxgroupToData(taxgroup: TaxGroup, userinput: any, colors: any): [RechartsData[], boolean] {
    let data: RechartsData[] = [];
    for (const [key, value] of Object.entries(taxgroup)) {
        if (key !== "type") {
            let push_value = value[1];
            if (userinput.percentage_or_value && userinput.children == "single") {
                push_value = value[0];
            }
            data.push({ name: key, value: push_value, color: colors[key] });
        }
    }
    console.log(taxgroup);
    console.log(data);
    return [data, true];
}

// TODO: fix types
// TODO: add a proper algo. now everything only works if the data in taxdata.json is the the right order
function CalcGraphData(taxgroups: TaxGroup[], colors: any, userinput: {income: number, status: string, percentage_or_value: boolean}): RechartsData[] {
    let data: RechartsData[] = [];

    let found = false;
    taxgroups.forEach((taxgroup: TaxGroup) => {
        if (
            userinput.status == "twochildren" &&
            taxgroup.type.includes("twochildren") &&
            UserIncomeIsInGroup(userinput.income, parseInt(taxgroup.type.replace("twochildren", ""), 10)) &&
            !found
        ) {
            let res = PushTaxgroupToData(taxgroup, userinput, colors);
            data = res[0];
            found = res[1];
        }
        if (
            userinput.status == "single" &&
            isNumberString(taxgroup.type) &&
            UserIncomeIsInGroup(userinput.income, parseInt(taxgroup.type, 10)) &&
            !found
        ) {
            let res = PushTaxgroupToData(taxgroup, userinput, colors);
            data = res[0];
            found = res[1];
        }
        if (
            userinput.status == "paar" &&
            taxgroup.type.includes("paar") &&
            UserIncomeIsInGroup(userinput.income, parseInt(taxgroup.type.replace("paar", ""), 10)) &&
            !found
        ) {
            let res = PushTaxgroupToData(taxgroup, userinput, colors);
            data = res[0];
            found = res[1];
        }
    });

    // data.forEach((entry) => {
    //     entry.value = Math.round(entry.value);
    // });
    return data;
}
