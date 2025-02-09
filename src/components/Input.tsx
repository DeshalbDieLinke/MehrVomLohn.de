import { Input } from "./ui/input.tsx";
import { useState, type ChangeEvent } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InputComponent(props: {
    value: { income: number; children: string };
    setValue: (value: { income: number; children: string }) => void;
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // round up the value into steps: 40000 60000 80000 120000 >180000
        var value = parseInt(event.target.value);
        if (props.value.children == "twochilden" || props.value.children == "paar") {
            if (value < 40000) {
                value = 40000;
            } else if (value < 60000) {
                value = 60000;
            } else if (value < 80000) {
                value = 80000;
            } else if (value < 120000) {
                value = 120000;
            } else {
                value = 180000;
            }
        } else if (props.value.children == "single") {
            // round up the value into steps: 10000, 20000, 30000, 40000, 55000, 80000, 100000, 150000, 250000, 2000000
            if (value < 10000) {
                value = 10000;
            } else if (value < 20000) {
                value = 20000;
            } else if (value < 30000) {
                value = 30000;
            } else if (value < 40000) {
                value = 40000;
            } else if (value < 55000) {
                value = 55000;
            } else if (value < 80000) {
                value = 80000;
            } else if (value < 100000) {
                value = 100000;
            } else if (value < 150000) {
                value = 150000;
            } else if (value < 250000) {
                value = 250000;
            } else {
                value = 2000000;
            }
        }
        props.setValue({ ...props.value, income: value });
    };

    return (
        <>
            <div className="pt-8 px-8 flex flex-col gap-8 py-8">
                <div>
                    <h1 className="text-3xl ">Wie hoch ist dein Bruttoeinkommen im Jahr in Euro?</h1>
                    <p className="text-xl">Gib deine Daten in Euro anonym im Nummernfeld ein oder nutze den Regler.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                        <Input type="number" value={props.value.income} onChange={handleChange} max={2_000_000_0} />
                    </div>
                    <div className="w-full sm:w-[180px]">
                        <Select
                            onValueChange={(e) => {
                                props.setValue({
                                    ...props.value,
                                    children: e,
                                });
                            }}
                            value={props.value.children}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paar">Paar</SelectItem>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="twochilden">Ehepaar mit 2 Kindern (Haushaltseinkommen)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <input type="range" min={0} max={80000} className="range" value={props.value.income} onChange={handleChange} />
            </div>
        </>
    );
}
