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

function GetRecomendations(data: RechartsData[]): { party: string; status: Status; entlastung_linke: number } {
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
    return { party: max.p, status: status, entlastung_linke: dielinke_entlastung };
}

export default function SliderChartWrapper() {
    let [userdata, setUserdata] = useState({ income: 25000, children: false });

    let data = CalcGraphData(taxdata.taxgroups, taxdata.colors, userdata);
    let recom = GetRecomendations(data);
    console.log(recom);

    return (
        <>
            <InputComponent value={userdata} setValue={setUserdata} />
            <SteuernChart data={data} />
            <div className="sd:p-8 p-4">
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

function CalcGraphData(taxgroups: TaxGroup[], colors: any, userinput: any): RechartsData[] {
    let data: RechartsData[] = [];
    let found = false;
    taxgroups.forEach((taxgroup: TaxGroup) => {
        if (
            // !props.userinput.children &&
            isNumberString(taxgroup.type) &&
            UserIncomeIsInGroup(userinput.income, parseInt(taxgroup.type, 10)) &&
            !found
        ) {
            for (const [key, value] of Object.entries(taxgroup)) {
                if (key !== "type") {
                    data.push({ name: key, value: value[0] * (userinput.income / 100), color: colors[key] });
                }
            }
            found = true;
        }
    });

    data.forEach((entry) => {
        entry.value = Math.round(entry.value);
    });
    return data;
}
