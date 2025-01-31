export default function Footer() {
    return (
        <>
            <div className="bg-grey-background">
                <div className="text-center bg-grey-background pt-4 px-2">
                    Ein Projekt der ehrenamtlichen Kampagne <a href="https://www.deshalbdielinke.de">#deshalbdielinke</a>
                </div>
                <div className="relative text-center bg-grey-background p-6 bottom-0 w-full h-[4rem]  ">
                    <div className="links flex justify-around flex-wrap">
                        <a href="https://deshalbdielinke.de/Impressum/" className="hover:text-primary text-black">
                            Impressum
                        </a>
                        <a href="https://deshalbdielinke.de/Datenschutz/" className="hover:text-primary text-black">
                            Datenschutz
                        </a>
                        <a href="https://deshalbdielinke.de/about/" className="hover:text-primary text-black">
                            Unser Team
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
