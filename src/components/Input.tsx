import { useState } from "react";
import type { ChangeEvent } from "react";

export default function Input(props: {
    value: { income: number; children: boolean };
    setValue: (value: { income: number; children: boolean }) => void;
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setValue({ income: parseInt(event.target.value), children: false });
    };

    return (
        <>
            <h1>Wie viel verdienst du?</h1>
            <input type="number" value={props.value.income} onChange={handleChange} />
            <input type="range" min={0} max={180000} className="range" value={props.value.income} onChange={handleChange} />
        </>
    );
}
