export enum Status {
    "linke",
    "linkenegativ",
    "andere",
}

export function CallToActionWrapper(props: {
    output: { party: string; status: Status; entlastung_linke: number; best_entlastung: number };
}) {
    if (props.output.status == Status.linke) {
        return (
            <>
                <h1 className="text-4xl flex flex-row">
                    Bestes Ergebnis – <div style={{ color: "#ff0000" }}>Die Linke</div>:
                </h1>

                <div className="p-6 bg-grey-background">
                    <p>
                        Für dich springt am meisten heraus bei: <b>Die Linke!</b> <br />
                        Mit der Linke kannst du bis zu <b>{props.output.entlastung_linke}€ mehr im Jahr</b> erhalten, weil das
                        Steuerprogramm in diesem Bereich sehr starke Entlastungen vorsieht. So stark entlastet dich keine andere Partei!
                    </p>

                    <p>
                        Hinzu kommen weitere Vergünstigungen und Angebote(*alle Quelle <a href="/Quellen#WP1">WP1</a>), die in die
                        Berechnung des ZEW nicht einfließen:
                    </p>
                    <ul className="list-disc">
                        <li>
                            Bundesweiter Mietendeckel – Durch gedeckelte Mieten, nicht nur in Großstädten, entgehst du Wuchermieten!
                            Mehrwertsteuer
                        </li>
                        <li>
                            auf 0% senken für Grundnahrungsmittel, Hygieneprodukte und Bus- oder Bahntickets. Über eine Vermögenssteuer für
                        </li>
                        <li>
                            superreiche Milliardäre profitierst du vom Ausbau der öffentlichen Infrastruktur, modernen Schulen und
                            öffentlichen
                        </li>
                        <li>
                            Einrichtungen. Über eine einheitliche Krankenversicherung für alle wird der Krankenkassenbeitrag von 17,1 auf
                            etwa
                        </li>
                        <li>
                            13,3%. Abschlagsfreie Rente nach 40 Jahren Arbeit. Davon profitieren vor allem Menschen die schwer körperlich
                            arbeiten!
                        </li>
                        <li>
                            Ein erhöhter Mindestlohn von 15€ pro Stunde führt automatisch zu besserem Einkommen! Kostenfreies Mittagessen in
                            KiTas
                        </li>
                        <li>und Schulen Kostenfreie Kindertagesstätten und vieles mehr!</li>
                    </ul>
                </div>
            </>
        );
    }
    if (props.output.status == Status.linkenegativ) {
        return (
            <>
                <h1 className="text-4xl flex flex-row">
                    Wir empfehlen dir: – <div style={{ color: "#ff0000" }}>Die Linke</div>:
                </h1>

                <div className="p-6 bg-grey-background">
                    <p>
                        <b>Mit ihr hättest du zwar weniger auf dem Konto, aber leistest damit einen immensen Beitrag zur Gesellschaft.</b>{" "}
                        So trägst du zur Solidarität bei und finanzierst viele Projekte mit, von denen du und dein Umfeld auch profitieren
                        würden (*alle Quelle <a href="/Quellen#WP1">WP1</a>):
                    </p>
                    <ul className="list-disc">
                        <li>Bundesweiter Mietendeckel – Durch gedeckelte Mieten, nicht nur in Großstädten, entgehst du Wuchermieten!</li>
                        <li>
                            Mehrwertsteuer auf 0% senken für Grundnahrungsmittel, Hygieneprodukte und Bus- oder Bahntickets – so sparst du
                            mehr Geld ein.
                        </li>
                        <li>
                            Über eine Vermögenssteuer für superreiche Milliardäre und hohe Steuern für Reiche profitierst du von modernen
                            Schulen, stabiler Infrastruktur und dem klimapolitischen Umbau der Wirtschaft.
                        </li>
                        <li>Über eine einheitliche Krankenversicherung für alle wird der Krankenkassenbeitrag von 17,1 auf etwa 13,3%.</li>
                        <li>
                            Abschlagsfreie Rente nach 40 Jahren Arbeit. Davon profitieren vor allem Menschen die schwer körperlich arbeiten!
                        </li>
                        <li>
                            Ein erhöhter Mindestlohn von 15€ pro Stunde führt automatisch zu besserem Einkommen für Menschen mit wenig Geld!
                        </li>
                        <li>Kostenfreies Mittagessen in KiTas und Schulen.</li>
                        <li>Kostenfreie Kindertagesstätten.</li>
                        <li>Klimageld, um gezahlte CO2-Steuern wieder rückerstattet zu bekommen.</li>
                        <li>und vieles mehr!</li>
                    </ul>

                    <p>
                        <b>
                            Finanziell profitierst du am meisten von {props.output.party} mit {props.output.best_entlastung}€
                        </b>
                        {/*– aber dabei bekommst du finanziell in der offiziellen Berechnung nicht gegengerechnete Nachteile: (PARTEI XY
                            NACHTEILE TEXT)*/}
                    </p>
                </div>
            </>
        );
    }
    if (props.output.status == Status.andere) {
        return (
            <>
                <h1 className="text-4xl flex flex-row">
                    Wir empfehlen dir: – <div style={{ color: "#ff0000" }}>Die Linke</div>:
                </h1>

                <div className="p-6 bg-grey-background">
                    <p>
                        Mit ihr würdest du bis zu {props.output.entlastung_linke}€ mehr auf dem Konto haben und dennoch einen solidarischen
                        Beitrag für die gesamte Gesellschaft leisten. Hinzu kommen weitere Vergünstigungen und Angebote(*alle Quelle{" "}
                        <a href="/Quellen#WP1">WP1</a>), die in die Berechnung des ZEW nicht einfließen:
                    </p>
                    <ul className="list-disc">
                        <li>Bundesweiter Mietendeckel – Durch gedeckelte Mieten, nicht nur in Großstädten, entgehst du Wuchermieten!</li>
                        <li>Mehrwertsteuer auf 0% senken für Grundnahrungsmittel, Hygieneprodukte und Bus- oder Bahntickets.</li>
                        <li>
                            Über eine Vermögenssteuer für superreiche Milliardäre profitierst du vom Ausbau der öffentlichen Infrastruktur,
                            modernen Schulen und öffentlichen Einrichtungen.
                        </li>
                        <li>Über eine einheitliche Krankenversicherung für alle wird der Krankenkassenbeitrag von 17,1 auf etwa 13,3%.</li>
                        <li>
                            Abschlagsfreie Rente nach 40 Jahren Arbeit. Davon profitieren vor allem Menschen die schwer körperlich arbeiten!
                        </li>
                        <li>Ein erhöhter Mindestlohn von 15€ pro Stunde führt automatisch zu besserem Einkommen!</li>
                        <li>Kostenfreies Mittagessen in KiTas und Schulen</li>
                        <li>Kostenfreie Kindertagesstätten</li>
                        <li>Klimageld, um gezahlte CO2-Steuern wieder rückerstattet zu bekommen.</li>
                        <li>und vieles mehr!</li>
                    </ul>

                    <p>
                        <b>
                            Finanziell profitierst du am meisten von der partei {props.output.party} mit {props.output.best_entlastung}€
                        </b>
                    </p>
                </div>
            </>
        );
    }
}
