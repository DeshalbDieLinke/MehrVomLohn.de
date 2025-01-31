import ListeDieLinke from "./ListeDieLinke";

const colors: { [key: string]: string } = {
    "linke": "bg-red-500",
    "spd": "#eb001f",
    "gruene": "#64a12d",
    "fdp": "bg-yellow-400",
    "cdu": "#000000",
    "afd": "#009ee0",
    "bsw": "#ff8200",
}


export default function Reasoning(props: {party: string}) {
    const party = props.party;

    const textColor = party === "fdp" ? "text-black" : "text-white";


    return (
        <>  <div  >

                <ListeDieLinke />
            </div>
        </>
    )
} 