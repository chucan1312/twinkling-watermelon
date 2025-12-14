import { useState, useEffect } from "react";
import { api } from "./api";
import { CoinCount } from "./components/CoinCount";

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
    const [error, setError] = useState(null);

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

    async function clickTick() {
        try {
            const res = await api.post(
                `/${player.id}/clicktick`,
                null,
                { params: { value: 1 } }
            );
            setPlayer(res.data);
        } catch (err) {
            const msg = err.response?.data?.message || "Error";
            setError(msg);
            setTimeout(() => setError(null), 2000);
        }
        setShowWatermelon(false);
    }

    useEffect(() => {
        if (!player) return;
        const interval = setInterval(tickPlayer, 1000);
        return () => clearInterval(interval);
    }, [player]);

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
            }, 2000);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
                        className="border border-[#8b5a2b] p-2 w-100 lg:w-130 focus:outline-none focus:border-2 focus:placeholder-transparent"
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
                                    className="relative px-2 py-5 border-4 border-r-0 border-[rgb(171,122,66)] bg-[#f0c76e] hover:bg-[#e0b65a]"
                                >
                                    {open ? (
                                        <img src="./images/right-arrow.png" />
                                    ) : (
                                        <img src="./images/left-arrow.png" />
                                    )}
                                </button>

                                {open && (
                                    <div className="grid grid-cols-1 gap-5 p-5 border-4 border-r-0 border-[rgb(171,122,66)] backdrop-blur-xl">
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
                            className="fixed top-1/3 left-1/2 -translate-x-1/2 z-[9999]"
                            onClick={clickTick}
                        >
                            <img
                                src="/images/watermelonCount.png"
                                className="w-16 h-16 cursor-pointer"
                                alt="watermelon"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
