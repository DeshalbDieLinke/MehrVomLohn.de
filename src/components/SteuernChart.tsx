import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList, Label } from "recharts";

export interface RechartsData {
    name: string;
    value: number;
    color: string;
}

const SteuernChart = (props: { data: RechartsData[] }) => {
    return (
        <ResponsiveContainer width="100%" height={600}>
            <BarChart data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false}>
                    <Label value="Parteien" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis>
                    <Label value="Steuern in €" offset={0} position="insideLeft" angle={-90} />
                </YAxis>
                <Tooltip />
                <Bar isAnimationActive={false} dataKey="value">
                    {props.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList dataKey="name" position="inside" fill="#ffffff" angle={-90} fontSize={20} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SteuernChart;
