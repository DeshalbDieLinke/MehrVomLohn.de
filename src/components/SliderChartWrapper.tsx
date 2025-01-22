import Slider from "../components/Slider.tsx";
import SteuernChart from "../components/SteuernChart.tsx";
import { useState } from "react";
import taxdata from "../data/taxdata.json";

export default function SliderChartWrapper() {
    let [userdata, setUserdata] = useState({ income: 0, children: false });

    return (
        <>
            <Slider value={userdata} setValue={setUserdata} />
            <SteuernChart userinput={userdata} data={taxdata}  />
        </>
    );
}
