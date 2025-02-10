import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList, Label } from "recharts";

export interface RechartsData {
    name: string;
    value: number;
    color: string;
}

export function ChartTooltip({ payload, active, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 shadow-md">
                <p className="text-lg p-0 m-0">{`Partei: ${label.toUpperCase()}`}</p>
                <p className="text-lg p-0 m-0">{`Ersparnisse: ${payload[0].value}€`}</p>
            </div>
        );
    }

    return null;
}

const SteuernChart = (props: { data: RechartsData[] }) => {
    return (
        <div className="relative">
            <span className="absolute text-base -rotate-90 -left-[170px] top-1/2 -translate-y-full">
                Veränderung des verfügbaren Einkommen in €
            </span>
            <ResponsiveContainer width="100%" height={600} className="pl-10 mb-10">
                <BarChart data={props.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false}>
                        <Label value="Parteien" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar isAnimationActive={false} dataKey="value">
                        {props.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        {/* Uppercase the Names using a formatter func */}
                        <LabelList
                            dataKey="name"
                            position="inside"
                            fill="#ffffff"
                            angle={-90}
                            fontSize={20}
                            formatter={(value: string) => {
                                return value.toUpperCase();
                            }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SteuernChart;
