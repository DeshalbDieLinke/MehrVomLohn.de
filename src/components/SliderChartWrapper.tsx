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
    let [userdata, setUserdata] = useState({ income: 25000, children: "single" });

    let data = CalcGraphData(taxdata.taxgroups, taxdata.colors, userdata);
    console.log(data);
    let recom = GetRecomendations(data);
    // console.log(recom);

    return (
        <>
            <InputComponent value={userdata} setValue={setUserdata} />
            <div>
                <SteuernChart data={data} />
            </div>
            <div>
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
            data.push({ name: key, value: value[1], color: colors[key] });
        }
    }
    console.log(taxgroup);
    console.log(data);
    return [data, true];
}

// TODO: fix types
// TODO: add a proper algo. now everything only works if the data in taxdata.json is the the right order
function CalcGraphData(taxgroups: TaxGroup[], colors: any, userinput: any): RechartsData[] {
    let data: RechartsData[] = [];

    let found = false;
    taxgroups.forEach((taxgroup: TaxGroup) => {
        if (
            userinput.children == "twochilden" &&
            taxgroup.type.includes("twochildren") &&
            UserIncomeIsInGroup(userinput.income, parseInt(taxgroup.type.replace("twochildren", ""), 10)) &&
            !found
        ) {
            let res = PushTaxgroupToData(taxgroup, userinput, colors);
            data = res[0];
            found = res[1];
        }
        if (
            userinput.children == "single" &&
            isNumberString(taxgroup.type) &&
            UserIncomeIsInGroup(userinput.income, parseInt(taxgroup.type, 10)) &&
            !found
        ) {
            let res = PushTaxgroupToData(taxgroup, userinput, colors);
            data = res[0];
            found = res[1];
        }
        if (
            userinput.children == "paar" &&
            taxgroup.type.includes("paar") &&
            UserIncomeIsInGroup(userinput.income, parseInt(taxgroup.type.replace("paar", ""), 10)) &&
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
