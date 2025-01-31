
const colors: { [key: string]: string } = {
    "linke": "bg-red-500",
    "spd": "#eb001f",
    "gruene": "#64a12d",
    "fdp": "bg-yellow-400",
    "cdu": "#000000",
    "afd": "bg-blue-200",
    "bsw": "#ff8200",
}


export default function BestesErgebnis(props: {party: string}) {
    const party = props.party;

    const textColor = party === "fdp" || "afd "? "text-black" : "text-white";


    return (
        <>  <div >
                {party ? <div className={"flex flex-row justify-start items-center w-full p-10 text-white rounded-sm border-y-2  border-black drop-shadow-lg shadow-red-300 " + colors[party]}>
                    <h1 className={"text-6xl flex flex-row " + textColor}>
                        Bestes Ergebnis:
                    </h1>
                    <img src={"/logos/" + party + ".svg"} className="h-20 w-25 rounded-none mx-10 " alt={"Logo " + party}/>
                </div> :
                <h1>Bitte gebe einen Wert ein</h1>}   
            </div>
        </>
    )
} 