import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList, Label } from "recharts";
import { type RechartsData } from "./SteuernChart.tsx";

function ChartTooltip({ payload, active, label }: any) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 shadow-md">
                <p className="text-lg">{`Partei: ${label}`}</p>
                <p className="text-lg">{`Armutsrisikoquote: ${payload[0].value}%`}</p>
            </div>
        );
    }

    return null;
}

export default function ArmutsChart(props: { data: RechartsData[] }) {
    return (
        <ResponsiveContainer width="100%" height={490}>
            <BarChart data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false}>
                    <Label value="Parteien" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis>
                    <Label value="Veränderung der Armutsrisikoquote" offset={10} position="insideBottomLeft" angle={-90} />
                </YAxis>
                <Tooltip content={<ChartTooltip />} />
                <Bar isAnimationActive={true} dataKey="value" radius={[10, 10, 0, 0]}>
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
    );
}
