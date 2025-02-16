import ArmutsChart from "./ArmutsChart";
import BestesErgebnis from "./BestesErgebnis";
import Callout from "./Callout";
import ListeDieLinke from "./ListeDieLinke";
// import PartyLinks from "./PartyLinks.tsx";
import armutsdata from "../data/armutsdata.json";
import ArmutsChartWrapper from "./ArmutsChartWrapper";

export enum Status {
    "linke",
    "linkenegativ",
    "andere",
}

export function CallToActionWrapper(props: {
    output: { party: string; status: Status; entlastung_linke: number; best_entlastung: number };
    isPercentage: boolean;
}) {
    return (
        <>
            <BestesErgebnis party={props.output.party} />

            <div className="p-2 md:p-6 bg-grey-background text-2xl">
                {/* Die Linke ist bester Wert */}
                {props.output.status == Status.linke && (
                    <div className="border-y-2 border-black p-4">
                        <p>
                            Für dich springt bei <b>Der Linken</b> am meisten bei raus! <br />
                            Mit der Linke kannst du bis zu
                            {props.isPercentage && <b> {props.output.best_entlastung}% mehr im Jahr </b>}
                            {!props.isPercentage && <b> {props.output.entlastung_linke}€ mehr im Jahr </b>}
                            erhalten, weil das Steuerprogramm in diesem Bereich sehr starke Entlastungen vorsieht.{" "}
                            <b>So stark entlastet dich keine andere Partei!</b>
                        </p>
                        <p>Hinzu kommen weitere Vergünstigungen und Angebote, die in die Berechnung des ZEW nicht einfließen:</p>
                        <ArmutsChartWrapper data={armutsdata} output={props.output} />
                        <ListeDieLinke />
                    </div>
                )}
                {/* Die Linke BELASTET */}
                {props.output.status == Status.linkenegativ && (
                    <Callout>
                        <b>
                            Mit {props.output.party.toUpperCase()} hättest du zwar mehr auf dem Konto, aber der Kontostand alleine ist nicht
                            alles.
                        </b>
                        <span className="flex flex-col">
                            <p>
                                <img src="/logos/linke.svg" className="float-start h-8 rounded-none mx-2" />
                                Garantiert dir zwar vergleichbar weniger Entlastung aber viele alternative{" "}
                                <a href="#DieLinke">Vorschläge</a>, um das Leben aller Menschen zu verbessern.
                            </p>
                            <ArmutsChartWrapper data={armutsdata} output={props.output} />
                            <ListeDieLinke />
                        </span>
                    </Callout>
                )}
                {/* Andere Partei als die Linke ist bester Wert */}
                {props.output.status == Status.andere && (
                    <Callout>
                        <b className="w-fit">Wir Empfehlen dennoch Die Linke: </b>
                        <p>
                            Mit ihr würdest du bis zu
                            {props.isPercentage && <b> {props.output.entlastung_linke}% mehr im Jahr </b>}
                            {!props.isPercentage && <b> {props.output.entlastung_linke}€ mehr im Jahr </b>}
                            mehr auf dem Konto haben und auch noch einen solidarischen Beitrag für die gesamte Gesellschaft leisten.{" "}
                            <b>
                                {" "}
                                Es könnten bis zu 82% der Bevölkerung entlastet werden <a href="/Quellen#STATISTA">[Statista]</a>.
                            </b>{" "}
                            Dabei Springt natürlich auch viel für dich raus.
                            <ArmutsChartWrapper data={armutsdata} output={props.output} />
                            <ListeDieLinke />
                        </p>
                    </Callout>
                )}
                <p className="text-lg">
                    Es wird keine Garantie für eine exakte Korrektheit der Zahlen übernommen. Die Daten stammen aus einer{" "}
                    <a href="/Quellen#ZEW">Studie des ZEW</a> und wurden durch uns ausschließlich skaliert. <br />
                    (*alle Quelle <a href="/Quellen#WP1">WP1</a>)
                </p>
            </div>
        </>
    );
}
