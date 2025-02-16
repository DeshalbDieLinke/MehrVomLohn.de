import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList, Label } from "recharts";

export interface RechartsData {
    name: string;
    value: number;
    color: string;
}


const SteuernChart = (props: { data: RechartsData[]; percentage_or_value: boolean }) => {
    const ChartTooltip = ({ payload, active, label }: any) => {
        if (active && payload && payload.length) {
            if (props.percentage_or_value) {
                return (
                    <div className="bg-white p-4 shadow-md">
                        <p className="text-lg p-0 m-0">{`Partei: ${label.toUpperCase()}`}</p>
                        <p className="text-lg p-0 m-0">{`Ersparnisse: ${payload[0].value}%`}</p>
                    </div>
                );
            } else {
                return (
                    <div className="bg-white p-4 shadow-md">
                        <p className="text-lg p-0 m-0">{`Partei: ${label.toUpperCase()}`}</p>
                        <p className="text-lg p-0 m-0">{`Ersparnisse: ${payload[0].value}€`}</p>
                    </div>
                );
            }
        }

        return null;
    };

    return (
        <div className="relative">
            <span className="absolute text-base -rotate-90 -left-[170px] top-1/2 -translate-y-full">
                Veränderung des verfügbaren Einkommen in €
            </span>
            <ResponsiveContainer width="100%" height={600} className="pl-2 mb-10">
                <BarChart data={props.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false}>
                        <Label value="Parteien" offset={0} position="insideBottom" />
                    </XAxis>
                    <YAxis />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="value" radius={[5, 5, 0, 0]}>
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
