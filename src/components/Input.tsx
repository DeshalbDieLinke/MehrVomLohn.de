import { Input } from "./ui/input.tsx";
import type { ChangeEvent } from "react";

export default function InputComponent(props: {
    value: { income: number; children: boolean };
    setValue: (value: { income: number; children: boolean }) => void;
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setValue({ ...props.value, income: parseInt(event.target.value) });
    };

    return (
        <>
            <div className="pt-8 px-8 flex flex-col gap-8 py-8">
                <h1 className="text-3xl">Wie hoch ist dein Bruttoeinkommen im Jahr in Euro?</h1>
                <p>Gib deine Daten in Euro anonym im Nummernfeld ein oder nutze den Regler.</p>
                <Input type="number" value={props.value.income} onChange={handleChange} max={2_000_000_0} />
                <input type="range" min={0} max={130000} className="range" value={props.value.income} onChange={handleChange} />
                <label>
                    Bist du verheiratet und hast 2 Kinder?{" "}
                    <input
                        type="checkbox"
                        name="children"
                        checked={props.value.children}
                        onChange={(e) =>
                            props.setValue({
                                ...props.value,
                                children: e.target.checked,
                            })
                        }
                    />
                </label>
            </div>
        </>
    );
}
