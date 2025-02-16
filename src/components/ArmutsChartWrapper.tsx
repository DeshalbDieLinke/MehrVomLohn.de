import ArmutsChart from "./ArmutsChart";
import { type RechartsData } from "./SteuernChart";

export default function ArmutsChartWrapper(props: { data: RechartsData[]; output: { party: string } }) {
    return (
        <div className="pt-3">
            <b>Die Linke senkt das Arumtsrisiko am stärksten von Allen Partein:</b>
            {props.output.party == "afd" && (
                <p>
                    <b>Die AfD</b> hingegen würde die Armutsrisikoqoute um <b>12.9%</b> erhöhen.{" "}
                    <b>Das ist höher als jede andere Partei!</b>
                </p>
            )}
            {props.output.party == "fdp" && (
                <p>
                    <b>Die FDP</b> hingegen würde die Armutsrisikoqoute um <b>11%</b> erhöhen.{" "}
                </p>
            )}
            <div className="flex justify-center lg:px-7">
                <ArmutsChart data={props.data} />
            </div>
        </div>
    );
}
