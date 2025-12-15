import { useEffect, useState } from "react";
import { playBgm, pauseBgm, toggleBgm, nextBgm, prevBgm, isPlaying, getCurrentTrack } from "../audio";

export function MusicBar() {
    const [playing, setPlaying] = useState(false);
    const [track, setTrack] = useState(getCurrentTrack());

    // Sync UI with Howler state
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaying(isPlaying());
            setTrack(getCurrentTrack());
        }, 200);

        return () => clearInterval(interval);
    }, []);

    function handleToggle() {
        toggleBgm();
        setPlaying(isPlaying());
    }

    function handleNext() {
        nextBgm();
        setPlaying(true);
    }

    function handlePrev() {
        prevBgm();
        setPlaying(true);
    }

    return (
        <div
            className=" fixed bottom-3 left-1/2 -translate-x-1/2 z-[500] 
                        flex flex-col items-center gap-2 px-10 py-3 w-[25%]
                        border-[rgb(171,122,66)] bg-[#f0c76e] border-4">
            <div className="text-[rgb(171,122,66)] font-bold">{track.title}</div>
            <div className="flex flex-row gap-5">

                <button
                    onClick={handlePrev}
                    className="pixel-art-btn text-[#8b5a2b] px-3 bg-white border-[rgb(171,122,66)]"
                >
                    ⏮
                </button>
                {/* Play / Pause */}
                <button
                    onClick={handleToggle}
                    className="pixel-art-btn text-[#8b5a2b] px-3 bg-white border-[rgb(171,122,66)]"
                >
                    {playing ? "⏸" : "▶"}
                </button>

                {/* Next */}
                <button
                    onClick={handleNext}
                    className="pixel-art-btn text-[#8b5a2b] px-3 bg-white border-[rgb(171,122,66)]"
                >
                    ⏭
                </button>
            </div>
        </div>
    );
}
