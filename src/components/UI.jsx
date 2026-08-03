import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

const pictures = [
    "img-1",
    "img-2",
    "img-3",
    "img-4",
    "img-5",
    "img-6",
    "img-7",
    "img-8",
    "img-9",
    "img-10",
    "img-11",
    "img-12",
    "img-13",
    "img-14",
    "img-15",
    "img-16",
];

export const pageAtom = atom(0);
export const pages = [
    {
        front: "book-cover",
        back: pictures[0],
    },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
    pages.push({
        front: pictures[i % pictures.length],
        back: pictures[(i + 1) % pictures.length],
    });
}

pages.push({
    front: pictures[pictures.length - 1],
    back: "book-back",
});

export const UI = () => {
    const [page, setPage] = useAtom(pageAtom);

    const unlocked = useRef(false);

    const pageFlipAudio = new Audio("/audios/page-flip.mp3");
    pageFlipAudio.preload = "auto";

    useEffect(() => {
        const unlock = () => {
            unlocked.current = true;

            pageFlipAudio
                .play()
                .then(() => {
                    pageFlipAudio.pause();
                    pageFlipAudio.currentTime = 0;
                })
                .catch(() => {});

            window.removeEventListener("pointerdown", unlock);
        };

        window.addEventListener("pointerdown", unlock);

        return () => window.removeEventListener("pointerdown", unlock);
    }, []);

    useEffect(() => {
        if (!unlocked.current) return;

        pageFlipAudio.pause();
        pageFlipAudio.currentTime = 0;

        pageFlipAudio.play().catch(() => {});
    }, [page]);

    return (
        <>
            <main className="pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
                <a className="pointer-events-auto mt-1 ml-10" href="#">
                    <img className="w-32" src="/images/logo.png" />
                </a>

                <div className="w-full mb-10 overflow-auto pointer-events-auto flex justify-center">
                    <div
                        className="
                            relative flex items-center gap-2
                            max-w-full p-2
                            rounded-full
                            border border-white/10
                            bg-black/20
                            backdrop-blur-2xl
                            shadow-[0_20px_80px_rgba(0,0,0,.35)]
                        "
                    >
                        {[...pages].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index)}
                                className={`
                                    group relative
                                    flex items-center gap-2
                                    px-5 py-3
                                    rounded-full
                                    overflow-hidden
                                    border
                                    transition-all duration-500
                                    ${
                                        index === page
                                            ? `
                                                border-white/80
                                                bg-white
                                                text-black
                                                shadow-[0_5px_30px_rgba(255,255,255,.18)]
                                            `
                                            : `
                                                border-transparent
                                                text-white/50
                                                hover:text-white
                                                hover:bg-white/10
                                                hover:border-white/10
                                            `
                                    }
                                `}
                            >
                                {/* Hover glow */}
                                <span
                                    className="
                                        absolute inset-0
                                        bg-gradient-to-r
                                        from-transparent
                                        via-white/10
                                        to-transparent
                                        -translate-x-full
                                        group-hover:translate-x-full
                                        transition-transform duration-700
                                    "
                                />

                                {/* Number */}
                                <span
                                    className={`
                                        relative text-[9px]
                                        font-mono tracking-widest
                                        transition-opacity duration-300
                                        ${
                                            index === page
                                                ? "opacity-40"
                                                : "opacity-30 group-hover:opacity-60"
                                        }
                                    `}
                                >
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                {/* Label */}
                                <span
                                    className="
                                        relative
                                        text-[11px]
                                        uppercase
                                        tracking-[0.18em]
                                        whitespace-nowrap
                                    "
                                >
                                    {index === 0 ? "Cover" : `Page ${index}`}
                                </span>

                                {/* Active dot */}
                                {index === page && (
                                    <span
                                        className="
                                            relative
                                            w-1.5 h-1.5
                                            rounded-full
                                            bg-black
                                            ml-1
                                        "
                                    />
                                )}
                            </button>
                        ))}

                        {/* Back Cover */}
                        <button
                            onClick={() => setPage(pages.length)}
                            className={`
                                group relative
                                flex items-center gap-2
                                px-5 py-3
                                rounded-full
                                border
                                transition-all duration-500
                                ${
                                    page === pages.length
                                        ? `
                                            border-white/80
                                            bg-white
                                            text-black
                                            shadow-[0_5px_30px_rgba(255,255,255,.18)]
                                        `
                                        : `
                                            border-transparent
                                            text-white/40
                                            hover:text-white
                                            hover:bg-white/10
                                            hover:border-white/10
                                        `
                                }
                            `}
                        >
                            <span className="text-[9px] font-mono tracking-widest opacity-30">
                                00
                            </span>

                            <span className="text-[11px] uppercase tracking-[0.18em]">
                                Back
                            </span>

                            {page === pages.length && (
                                <span className="w-1.5 h-1.5 rounded-full bg-black ml-1" />
                            )}
                        </button>
                    </div>
                </div>
            </main>

            <div className="fixed inset-0 flex items-center -rotate-2 select-none">
                <div className="relative">
                    <div className="bg-white/0  animate-horizontal-scroll flex items-center gap-8 w-max px-8">
                        <h1 className="shrink-0 text-white text-10xl font-black ">
                            Photography
                        </h1>
                        <h2 className="shrink-0 text-white text-8xl italic font-light">
                            Instagram
                        </h2>
                        <h2 className="shrink-0 text-white text-12xl font-bold">
                            Fashion
                        </h2>
                        <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
                            Model
                        </h2>
                        <h2 className="shrink-0 text-white text-9xl font-medium">
                            Portfolio
                        </h2>
                        <h2 className="shrink-0 text-white text-9xl font-extralight italic">
                            Youtube
                        </h2>
                        <h2 className="shrink-0 text-white text-13xl font-bold">
                            Famous
                        </h2>
                        <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
                            Brand
                        </h2>
                    </div>

                    <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
                        <h1 className="shrink-0 text-white text-10xl font-black ">
                            Photography
                        </h1>
                        <h2 className="shrink-0 text-white text-8xl italic font-light">
                            Instagram
                        </h2>
                        <h2 className="shrink-0 text-white text-12xl font-bold">
                            Fashion
                        </h2>
                        <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
                            Model
                        </h2>
                        <h2 className="shrink-0 text-white text-9xl font-medium">
                            Portfolio
                        </h2>
                        <h2 className="shrink-0 text-white text-9xl font-extralight italic">
                            Youtube
                        </h2>
                        <h2 className="shrink-0 text-white text-13xl font-bold">
                            Famous
                        </h2>
                        <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
                            Brand
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
};
