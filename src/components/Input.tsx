import { Input } from "./ui/input.tsx";
import { useState, type ChangeEvent } from "react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type UserData from "@/lib/UserData.ts";

function CleanIncomeData(income: number, children: string): number {
    let value = income;
    console.log(children);
    if (children == "twochildren" || children == "paar") {
        if (value <= 40000) {
            value = 40000;
        } else if (value <= 60000) {
            value = 60000;
        } else if (value <= 80000) {
            value = 80000;
        } else if (value <= 120000) {
            value = 120000;
        } else {
            value = 180000;
        }
    } else if (children == "single") {
        // round up the value into steps: 10000, 20000, 30000, 40000, 55000, 80000, 100000, 150000, 250000, 2000000
        if (value <= 10000) {
            value = 10000;
        } else if (value <= 20000) {
            value = 20000;
        } else if (value <= 30000) {
            value = 30000;
        } else if (value <= 40000) {
            value = 40000;
        } else if (value <= 55000) {
            value = 55000;
        } else if (value <= 80000) {
            value = 80000;
        } else if (value <= 100000) {
            value = 100000;
        } else if (value <= 150000) {
            value = 150000;
        } else if (value <= 250000) {
            value = 250000;
        } else {
            value = 2000000;
        }
    }
    return value;
}

export default function InputComponent(props: {
    value: UserData;
    setValue: (value: UserData) => void;
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = CleanIncomeData(parseInt(event.target.value), props.value.status);
        console.log(value);
        props.setValue({ ...props.value, income: value });
    };

    return (
        <>
            <div className="flex flex-col gap-8 py-8">
                <div>
                    <h1 className="text-3xl ">Wie hoch ist dein Bruttoeinkommen im Jahr in Euro?</h1>
                    <p className="text-xl">Wähle deine Daten in Euro anonym im Menu ein oder nutze den Regler.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                        <Select
                            onValueChange={(e) => {
                                const value = CleanIncomeData(parseInt(e), props.value.status);
                                props.setValue({
                                    ...props.value,
                                    income: value,
                                });
                            }}
                            value={CleanIncomeData(props.value.income, props.value.status).toString()}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {props.value.status == "single" && (
                                    <>
                                        <SelectItem value="10000">0€-10000€</SelectItem>
                                        <SelectItem value="20000">10001€-20000€</SelectItem>
                                        <SelectItem value="30000">20001€-30000€</SelectItem>
                                        <SelectItem value="40000">30001€-40000€</SelectItem>
                                        <SelectItem value="55000">40001€-55000€</SelectItem>
                                        <SelectItem value="80000">55001€-80000€</SelectItem>
                                        <SelectItem value="100000">80001€-100000€</SelectItem>
                                        <SelectItem value="150000">100001€-150000€</SelectItem>
                                        <SelectItem value="250000">150001€-250000€</SelectItem>
                                        <SelectItem value="2000000">250001€-2000000€</SelectItem>
                                    </>
                                )}
                                {props.value.status != "single" && (
                                    <>
                                        <SelectItem value="40000">40000€</SelectItem>
                                        <SelectItem value="60000">60000€</SelectItem>
                                        <SelectItem value="80000">80000€</SelectItem>
                                        <SelectItem value="120000">120000€</SelectItem>
                                        <SelectItem value="180000">180000€</SelectItem>
                                    </>
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full sm:w-[180px]">
                        <Select
                            onValueChange={(e) => {
                                const value = CleanIncomeData(props.value.income, e);
                                props.setValue({
                                    ...props.value,
                                    income: value,
                                    status: e as "single" | "paar" | "twochildren",
                                });
                            }}
                            value={props.value.status}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paar">Paar</SelectItem>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="twochildren">Ehepaar mit 2 Kindern (Haushaltseinkommen)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {props.value.status == "single" && (
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="airplane-mode"
                                checked={props.value.isPercentage}
                                onCheckedChange={(e) => {
                                    props.setValue({ income: props.value.income, status: props.value.status, isPercentage: !!e  });
                                }}
                            />
                            <Label htmlFor="airplane-mode">Daten in Prozent</Label>
                        </div>
                    )}
                </div>

                {/* <div className="slider-container py-0">
                    {props.value.children == "single" && (
                        <input type="range" min={0} max={80000} className="range" value={props.value.income} onChange={handleChange} />
                    )}
                </div> */}
            </div>
        </>
    );
}
