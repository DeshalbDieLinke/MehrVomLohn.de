import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar isAnimationActive={false} dataKey="value">
                    {props.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SteuernChart;
