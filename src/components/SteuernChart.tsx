import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

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

const Chart = (props: { data: TaxData; userinput: { income: number; children: boolean } }) => {
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
                    data.push({ name: key, value: value[0] * props.userinput.income, color: props.data.colors[key] });
                }
            }
            found = true;
        }
    });

    return (
        <ResponsiveContainer width="100%" height={400}>
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

export default Chart;
