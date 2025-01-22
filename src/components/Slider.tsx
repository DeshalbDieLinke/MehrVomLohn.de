import { useState } from "react";
import type { ChangeEvent } from "react";

export default function Slider(props: {
    value: { income: number; children: boolean };
    setValue: (value: { income: number; children: boolean }) => void;
}) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setValue({ income: parseInt(event.target.value), children: false });
    };

    return (
        <>
            <h1>Wie viel verdienst du?</h1>
            <p>{props.value.income} €</p>
            <input type="range" min={0} max={180000} className="range" value={props.value.income} onChange={handleChange} />
        </>
    );
}
