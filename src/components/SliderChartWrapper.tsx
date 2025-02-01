import InputComponent from "../components/Input.tsx";
import SteuernChart from "../components/SteuernChart.tsx";
import type { RechartsData } from "../components/SteuernChart.tsx";
import { useState } from "react";
import taxdata from "../data/taxdata.json";
import { CallToActionWrapper, Status } from "./CallToActionWrapper.tsx";

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
    let [userdata, setUserdata] = useState({ income: 25000, children: false });

    let data = CalcGraphData(taxdata.taxgroups, taxdata.colors, userdata);
    let recom = GetRecomendations(data);
    // console.log(recom);

    return (
        <>
            <InputComponent value={userdata} setValue={setUserdata} />
            <div className="sd:p-8 p-4">
                <SteuernChart data={data} />
            </div>
            <div className="">
                <CallToActionWrapper output={recom} />
            </div>
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
            data.push({ name: key, value: value[0] * (userinput.income / 100), color: colors[key] });
        }
    }
    console.log(taxgroup);
    return [data, true];
}

// TODO: fix types
// TODO: add a proper algo. now everything only works if the data in taxdata.json is the the right order
function CalcGraphData(taxgroups: TaxGroup[], colors: any, userinput: any): RechartsData[] {
    let data: RechartsData[] = [];

    let found = false;
    taxgroups.forEach((taxgroup: TaxGroup) => {
        if (userinput.children && !found && !isNumberString(taxgroup.type)) {
            let familyFourtyK = userinput.income <= 40000 && taxgroup.type == "twochildrenfourtyk";
            let familySixtyK = userinput.income <= 60000 && taxgroup.type == "twochildrenfourtyk";
            let familyEightyK = userinput.income <= 80000 && taxgroup.type == "twochildreneightk";
            let familySemiRich = userinput.income <= 120000 && taxgroup.type == "twochildrenonetwentyk";
            let familyRichRich = userinput.income <= 180000 && taxgroup.type == "twochildrenveryrich" || userinput.income > 180000 && taxgroup.type == "twochildrenveryrich";
            // console.log(familyFourtyK, familySixtyK, familyEightyK, familyRichRich);
            //it needs to be exclusiv -> if else. fuck this. tomorrow prod.
            if (familyFourtyK) {
                console.log(taxgroup);
                let res = PushTaxgroupToData(taxgroup, userinput, colors);
                data = res[0];
                found = res[1];
            } else if (familySixtyK) {
                let res = PushTaxgroupToData(taxgroup, userinput, colors);
                data = res[0];
                found = res[1];
            } else if (familyEightyK) {
                let res = PushTaxgroupToData(taxgroup, userinput, colors);
                data = res[0];
                found = res[1];
            } else if (familySemiRich) {
                let res = PushTaxgroupToData(taxgroup, userinput, colors);
                data = res[0];
                found = res[1];
            } else if (familyRichRich) {
                let res = PushTaxgroupToData(taxgroup, userinput, colors);
                data = res[0];
                found = res[1];
            }
        }
        if (
            !userinput.children &&
            isNumberString(taxgroup.type) &&
            UserIncomeIsInGroup(userinput.income, parseInt(taxgroup.type, 10)) &&
            !found
        ) {
            let res = PushTaxgroupToData(taxgroup, userinput, colors);
            data = res[0];
            found = res[1];
        }
    });

    data.forEach((entry) => {
        entry.value = Math.round(entry.value);
    });
    return data;
}
