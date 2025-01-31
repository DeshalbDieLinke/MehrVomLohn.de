import BestesErgebnis from "./BestesErgebnis";
import Callout from "./Callout";
import ListeDieLinke from "./ListeDieLinke";

export enum Status {
    "linke",
    "linkenegativ",
    "andere",
}

export function CallToActionWrapper(props: {
    output: { party: string; status: Status; entlastung_linke: number; best_entlastung: number };
}) {
    const format = () => {
        if (props.output.party == "afd") {
            return (
                <>
                    <span style={{ color: "#964B00" }}>der rechtsextremen AFD</span>
                </>
            );
        } else if (props.output.party == "fdp") {
            return (
                <>
                    <span>der FDP</span>
                </>
            );
        }
    };
    return (
            <>  

                <BestesErgebnis party={props.output.party} />

                <div className="p-6 bg-grey-background text-2xl">

                    {/* Die Linke ist bester Wert */}
                    {props.output.status == Status.linke && 
                    <div className="border-y-2 border-black p-4">
                    
                        <p>
                        Für dich springt bei <b>Der Linken</b> am meisten bei raus! <br />
                        Mit der Linke kannst du bis zu <b>{props.output.entlastung_linke}€ mehr im Jahr</b> erhalten, weil das
                        Steuerprogramm in diesem Bereich sehr starke Entlastungen vorsieht.{" "}
                        <b>So stark entlastet dich keine andere Partei!</b>
                        </p>

                        <p>
                            Hinzu kommen weitere Vergünstigungen und Angebote(*alle Quelle <a href="/Quellen#WP1">WP1</a>), die in die
                            Berechnung des ZEW nicht einfließen:
                        </p>
                        <ListeDieLinke />

                    </div> }
                    {/* Die Linke BELASTET */}
                    {props.output.status == Status.linkenegativ &&  
                    <Callout>
                            <b>Mit {props.output.party.toUpperCase()} hättest du zwar mehr auf dem Konto, aber der Kontostand alleine ist nicht alles.</b>
                            <span className="flex">
                                <p><img src="/logos/linke.svg" className="float-start h-8 rounded-none mx-2" /> 
                                Garantiert dir zwar vergleichbar weniger Entlastung aber viele alternative <a href="#DieLinke">Vorschläge</a>, um das Leben aller Menschen zu verbessern.(*Quellen <a href="/Quellen#WP1">WP1</a>)</p>
                                <ListeDieLinke />
                            </span>
                    </Callout>
                    }
                {/* Andere Partei als die Linke ist bester Wert */}
                    {props.output.status == Status.andere  && 
                <Callout>
                    <b className="w-fit">Wir Empfehlen dennoch Die Linke: </b>
                    <p>
                        Mit ihr würdest du bis zu {props.output.entlastung_linke}€ mehr auf dem Konto haben und auch noch einen solidarischen
                        Beitrag für die gesamte Gesellschaft leisten. Dabei Springt natürlich auch viel für dich raus.
                        <ListeDieLinke />

                    </p>
                </Callout>
                    }
                    <p className="text-lg">
                            Es wird keine Garantie für eine exakte Korrektheit der Zahlen übernommen. Die Daten stammen aus einer{" "}
                            <a href="/Quellen#ZEW">Studie des ZEW</a> und wurden durch uns ausschließlich skaliert.
                    </p>
                </div>
            </>
        );
    }
