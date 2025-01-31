export default function Introduction() {
    let imgList = ["https://www.flaggenmeer.de/media/08/9f/40/1622821604/flagge-deutschland-adler-querformat.jpg?ts=1644663943"];
    return (
        <section  className="border-y-2 border-black">
            {/*<!--<img
                src={imgList[Math.floor(Math.random() * imgList.length)]}
                alt="Your image"
                className="filter h-full  md:w-full object-cover md:fit blur sm:blur-sm "
                /> */}
            <div className="inset-0 bg-blue-500 bg-opacity-50 h-full flex items-center flex-col justify-evenly">
                <h1 className="text-white h-[60%] text-center text-[4rem] sm:text-7xl md:text-[8rem] xl:text-[13rem] font-black md:leading-tight p-10">
                    Mehr vom Lohn!
                </h1>
                <p className="text-white text-center text-2xl px-10">
                    Die Politik greift den Bürgerinnen und Bürgern immer tiefer in die Tasche? Miete, niedrige Löhne und die Inflation bei
                    Energie, Wärme, Lebensmitteln und in anderen Lebensbereichen tragen zur immer schlimmeren Situation bei. Wir sagen:
                    Schluss damit! Auf MehrVomLohn.de könnt ihr ermitteln, welche Partei für euch die beste Wahl für die Bundestagswahl am
                    23.02. sein kann!
                </p>
                <p className="font-bold">
                    <a href="#MAIN">Mach jetzt den Check!</a>
                </p>
                {/*<a href="#MAIN">
                    <img
                        src="/images/icons/double-arrow-down.svg"
                        className="w-20 h-20 sm:w-20 sm:h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 animate-jitter"
                    />
                    </a>*/}
            </div>
        </section>
    );
}
