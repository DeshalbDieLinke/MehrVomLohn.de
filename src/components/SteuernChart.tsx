import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Status } from "./CallToActionWrapper.tsx";

function isNumberString(value: string): boolean {
    return !isNaN(Number(value));
}

interface TaxGroup {
    type: string;
    cdu: [number, number];
    linke: [number, number];
    spd: [number, number];
    gruene: [number, number];
    bsw: [number, number];
    fdp: [number, number];
    afd: [number, number];
}

interface TaxData {
    taxgroups: TaxGroup[];
    colors: { [key: string]: string };
}

interface RechartsData {
    name: string;
    value: number;
    color: string;
}

function UserIncomeIsInGroup(userincome: number, taxgroup: number): boolean {
    return userincome <= taxgroup;
}

const SteuernChart = (props: {
    setValue: (value: { party: string; status: Status; entlastung: number }) => void;
    data: TaxData;
    userinput: { income: number; children: boolean };
}) => {
    let data: RechartsData[] = [];
    let found = false;
    props.data.taxgroups.forEach((taxgroup) => {
        if (
            // !props.userinput.children &&
            isNumberString(taxgroup.type) &&
            UserIncomeIsInGroup(props.userinput.income, parseInt(taxgroup.type, 10)) &&
            !found
        ) {
            for (const [key, value] of Object.entries(taxgroup)) {
                if (key !== "type") {
                    data.push({ name: key, value: value[0] * (props.userinput.income / 100), color: props.data.colors[key] });
                }
            }
            found = true;
        }
    });

    data.forEach((entry) => {
        entry.value = Math.round(entry.value);
    });

    // find the heigest value
    let max = { v: 0, p: "" };
    data.forEach((entry) => {
        if (entry.value > max.v) {
            max = { v: entry.value, p: entry.name };
        }
    });
    let status = Status.andere;
    if (max.p == "linke") {
        status = Status.linke;
        if (max.v < 0) {
            status = Status.linkenegativ;
        }
    }
    props.setValue({ party: max.p, status: status, entlastung: max.v });
    console.log("here");

    return (
        <ResponsiveContainer width="100%" height={600}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar isAnimationActive={false} dataKey="value">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SteuernChart;
