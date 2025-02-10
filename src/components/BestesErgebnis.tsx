const colors: { [key: string]: string } = {
    linke: "bg-red-500",
    spd: "#808080",
    gruene: "#808080",
    fdp: "#808080",
    cdu: "#000000",
    afd: "#808080",
    bsw: "#808080",
};

export default function BestesErgebnis(props: { party: string }) {
    const party = props.party;
    const textColor = party === "fdp" || "afd " ? "text-black" : "text-white";

    return (
        <>
            {" "}
            <div>
                {party ? (
                    <div
                        className={`flex flex-wrap justify-start items-center w-full p-10 text-white rounded-sm border-2 border-black drop-shadow-lg shadow-red-300 ${colors[party]}`}
                    >
                        <h1 className={`text-6xl flex flex-row mb-4 sm:mb-0 ${textColor}`}>Bestes Ergebnis:</h1>
                        <img
                            src={`/logos/${party}.svg`}
                            className="h-20 w-auto max-w-full rounded-none mx-auto sm:mx-10 mt-4 sm:mt-0"
                            alt={`Logo ${party}`}
                        />
                    </div>
                ) : (
                    <h1>Bitte gebe einen Wert ein</h1>
                )}
            </div>
        </>
    );
}
