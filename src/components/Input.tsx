import { Input } from "./ui/input.tsx";
import { useState, type ChangeEvent } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InputComponent(props: {
    value: { income: number; children: boolean };
    setValue: (value: { income: number; children: boolean }) => void;
}) {
    const [selectedOption, setSelectedOption] = useState(props.value.children ? "twochilden" : "single");
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setValue({ ...props.value, income: parseInt(event.target.value) });
    };

    return (
        <>
            <div className="pt-8 px-8 flex flex-col gap-8 py-8">
                <div>
                <h1 className="text-3xl ">Wie hoch ist dein Bruttoeinkommen im Jahr in Euro?</h1>
                <p className="text-xs">Gib deine Daten in Euro anonym im Nummernfeld ein oder nutze den Regler.</p>
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
                                    children: e == "twochilden",
                                });
                                setSelectedOption(e);
                            }}
                            value={selectedOption}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="twochilden">Ehepaar mit 2 Kindern (Haushaltseinkommen)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <input type="range" min={0} max={130000} className="range" value={props.value.income} onChange={handleChange} />
            </div>
        </>
    );
}
