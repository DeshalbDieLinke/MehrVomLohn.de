import Slider from "../components/Slider.tsx";
import SteuernChart from "../components/SteuernChart.tsx";
import { useState } from "react";
import taxdata from "../data/taxdata.json";
import { CallToActionWrapper, Status } from "./CallToActionWrapper.tsx";

export default function SliderChartWrapper() {
    let [userdata, setUserdata] = useState({ income: 25000, children: false });
    let [outputdata, setOutputData] = useState({ party: "", status: Status.andere, entlastung: 0 });

    return (
        <>
            {outputdata.party}
            {outputdata.status}
            {outputdata.entlastung}
            <Slider value={userdata} setValue={setUserdata} />
            <SteuernChart setValue={setOutputData} userinput={userdata} data={taxdata} />
            {outputdata.party != "" && <CallToActionWrapper output={outputdata} />}
        </>
    );
}
