import Slider from "../components/Slider.tsx";
import SteuernChart from "../components/SteuernChart.tsx";
import { useState } from "react";
import taxdata from "../data/taxdata.json";
import CallToActionWrappe from "./CallToActionWrapper.tsx";

export default function SliderChartWrapper() {
    let [userdata, setUserdata] = useState({ income: 40000, children: false });
    let [output, setOutput] = useState("");

    return (
        <>
            <Slider value={userdata} setValue={setUserdata} />
            <SteuernChart userinput={userdata} data={taxdata} output={setOutput} />
            {output != "" && <CallToActionWrappe output={output}/>}
        </>
    );
}
