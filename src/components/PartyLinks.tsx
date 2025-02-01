import Card from "./Card.tsx";

export default function PartyLinks() {
    return (
        <>
            <div className="flex flex-row items-center justify-evenly flex-wrap">
                <Card
                    title="#Deshalbdielinke"
                    description="Du willst mehr Gründe haben?"
                    image="/images/Machen.png"
                    action="Besuchen"
                    link="https://www.deshalbdielinke.de"
                />
                <Card
                    title="Die Linke"
                    description="Die Website der Bundespartei Die Linke."
                    image="/images/Logo_Linke.png"
                    action="Besuchen"
                    link="https://www.die-linke.de"
                />
            </div>
        </>
    );
}
