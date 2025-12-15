import { useState, useEffect } from "react";
import { api } from "./api";
import { CoinCount } from "./components/CoinCount";
import { MusicBar } from "./components/MusicBar";

const SHOP_ITEMS = [
    {
        name: "poster",
        x: 950,
        y: 185,
        z: 20,
        price: "50 watermelons",
        image: "/images/poster.png",
        message: "Poster",
    },
    {
        name: "logo",
        x: 410,
        y: 40,
        z: 20,
        price: "50 watermelons",
        image: "/images/foamlogo.png",
        message: "Band's Foam Sign",
    },
    {
        name: "microphone",
        x: 650,
        y: 370,
        z: 100,
        price: "100 watermelons",
        image: "/images/microphone.png",
        message: "I-chan's mic",
    },
    {
        name: "fairylight",
        x: 170,
        y: 15,
        z: 100,
        price: "150 watermelons",
        image: "/images/fairylight.png",
        message: "Fairy lights",
    },
    {
        name: "drumset",
        x: 180,
        y: 340,
        z: 30,
        price: "300 watermelons",
        image: "/images/drumset.png",
        message: "Si-guk's drumset",
    },
];

function App() {
    const [player, setPlayer] = useState(null);
    const [nameInput, setNameInput] = useState("");
    const [open, setOpen] = useState(false);
    const [showWatermelon, setShowWatermelon] = useState(false);
    const [melonPos, setMelonPos] = useState({ x: 50, y: 50 });
    const [error, setError] = useState(null);
    const [bonus, setBonus] = useState(0);
    const [clickEffect, setClickEffect] = useState(false);

    async function createPlayer() {
        const res = await api.post(`/init?name=${nameInput}`);
        setPlayer(res.data);
    }

    async function tickPlayer() {
        if (!player) return;
        const res = await api.post(`/${player.id}/tick`);
        setPlayer(res.data);
    }

    async function purchase(itemName) {
        try {
            const res = await api.post(
                `/${player.id}/purchase`,
                null,
                { params: { item: itemName } }
            );
            setPlayer(res.data);
        } catch (err) {
            const msg = err.response?.data?.message || "Error purchasing item";
            setError(msg);
            setTimeout(() => setError(null), 2000);
        }
    }

    // Randomize bonus coins 
    useEffect(() => {
        if (!showWatermelon) return;

        const value = (Math.round(Math.random() * 5 + 1) * 5);
        setBonus(value);
    }, [showWatermelon]);

    async function clickTick() {
        try {
            const res = await api.post(
                `/${player.id}/clicktick`,
                null,
                { params: { value: bonus } }
            );
            setPlayer(res.data);

        } catch (err) {
            const msg = err.response?.data?.message || "Error";
            setError(msg);
            setTimeout(() => setError(null), 2000);
        }
        setClickEffect(true);
        setShowWatermelon(false);
    }

    // Tick player to add coins
    useEffect(() => {
        if (!player) return;
        const interval = setInterval(tickPlayer, 1000);
        return () => clearInterval(interval);
    }, [player]);

    // Add effect after collecting/clicking coin
    useEffect(() => {
        if (!clickEffect) return;

        const timeout = setTimeout(() => {
            setClickEffect(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [clickEffect]);

    const purchasableItems = player
        ? SHOP_ITEMS.filter(
            (item) => !player.inventory.includes(item.name)
        )
        : [];

    const ownedItems = player
        ? SHOP_ITEMS.filter((item) =>
            player.inventory.includes(item.name)
        )
        : [];


    useEffect(() => {
        const interval = setInterval(() => {
            setShowWatermelon(true);

            // hide after 2 seconds
            setTimeout(() => {
                setShowWatermelon(false);
            }, 4000);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!showWatermelon) return;

        setMelonPos({
            x: Math.random() * 80 + 10, // percent
            y: Math.random() * 60 + 10,
        });
    }, [showWatermelon]);

    return (
        <div>
            {!player && (
                <div className="space-y-4 max-w-sm mx-auto min-h-screen flex flex-col justify-center items-center bg-gray-200 min-w-screen">
                    <img
                        src="./images/gamelogo.png"
                        className="scale-120 mb-10"
                    />
                    <input
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="text-cursor border border-[#8b5a2b] p-2 w-100 lg:w-130 focus:outline-none focus:border-2 focus:placeholder-transparent"
                        placeholder="Enter your name..."
                    />
                    <button
                        onClick={createPlayer}
                        className="start-btn w-100 lg:w-130"
                    >
                        Start Game
                    </button>
                </div>
            )}

            {player && (
                <div className="relative">
                    <img
                        src="/images/background.png"
                        className="absolute inset-0 w-screen h-screen object-cover"
                        alt=""
                    />
                    <div className="relative z-10 text-white">
                        <CoinCount coin={player.coins} />

                        {/* SHOP */}
                        <div className="absolute right-0 z-100 top-30 bottom-30 h-[calc(80dvh)] overflow-y-auto">
                            <div className="flex flex-row items-start">
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="relative pointer px-2 py-5 border-4 border-r-0 border-[rgb(171,122,66)] bg-[#f0c76e] hover:bg-[#e0b65a]"
                                >
                                    {open ? (
                                        <img src="./images/right-arrow.png" />
                                    ) : (
                                        <img src="./images/left-arrow.png" />
                                    )}
                                </button>

                                {open && (
                                    <div className="grid grid-cols-1 gap-5 p-5 border-4 border-r-0 border-[rgb(171,122,66)] backdrop-blur-xl">
                                        <div>Items and Upgrades:</div>
                                        {purchasableItems.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => purchase(item.name)}
                                                className="pixel-art-btn bg-[#f0c76e] text-[rgb(171,122,66)] px-2 py-1 leading-tight hover:bg-[#e0b65a]"
                                            >
                                                <div>{item.message}</div>
                                                <div className="text-white">
                                                    {item.price}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ROOM ITEMS */}
                        {ownedItems.map((item) => (
                            <img
                                key={item.name}
                                src={item.image}
                                className={`absolute ${item.name === "fairylight"
                                    ? "drop-shadow-[0_3px_3px_rgba(255,194,110,1)] scale-120"
                                    : ""
                                    }`}
                                style={{
                                    left: item.x,
                                    top: item.y,
                                    zIndex: item.z,
                                }}
                            />
                        ))}

                        {error && (
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-500 px-4 py-2 z-200">
                                {error}
                            </div>
                        )}
                    </div>
                    {showWatermelon && (
                        <div
                            className="fixed z-[200]"
                            style={{
                                left: `${melonPos.x}%`,
                                top: `${melonPos.y}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                            onClick={clickTick}
                        >
                            <div className="relative">
                                <img
                                    src="/images/sparkle-frame-1.png"
                                    className="w-35 h-35 pointer animate-[sparkle-1-pop_0.35s_steps(1,end)] absolute z-210 [animation-fill-mode:forwards] drop-shadow-[0_0_8px_rgba(255,194,110,1)]"
                                />
                                <img
                                    src="/images/sparkle-frame-2.png"
                                    className="w-35 h-35 pointer animate-[sparkle-2-pop_0.35s_steps(1,end)] absolute z-210 [animation-fill-mode:forwards] drop-shadow-[0_0_8px_rgba(255,194,110,1)]"
                                />
                                <img
                                    src="/images/sparkle-frame-3.png"
                                    className="w-35 h-35 pointer animate-[sparkle-3-pop_0.35s_steps(1,end)] absolute z-210 [animation-fill-mode:forwards] drop-shadow-[0_0_8px_rgba(255,194,110,1)]"
                                />
                                <img
                                    src="/images/watermelonCount.png"
                                    className="w-35 h-35 pointer animate-[melon-pop_0.25s_cubic-bezier(0.2,1.4,0.4,1)] [animation-fill-mode:forwards]"
                                />
                            </div>

                        </div>
                    )}

                    {clickEffect && (
                        <div
                            className="fixed z-[200]"
                            style={{
                                left: `${melonPos.x}%`,
                                top: `${melonPos.y - 6}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="bonus-display text-white text-4xl text-outline">
                                +{bonus}
                            </div>
                        </div>
                    )}
                    <MusicBar />
                    
                </div>
            )}
        </div>
    );
}

export default App;
