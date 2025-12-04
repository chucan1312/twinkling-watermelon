import { useState, useEffect } from 'react'
import { api } from './api';
import { CoinCount } from './components/CoinCount';

const SHOP_ITEMS = [
    {
        name: "microphone",
        x: 650,
        y: 340,
        z: 100,
        price: "100 watermelons",
        image: "/images/microphone.png",
        message: "I-chan's mic"
    },
    {
        name: "fairylight",
        x: 170,
        y: 15,
        z: 100,
        price: "150 watermelons",
        image: "/images/fairylight.png",
        message: "Fairy lights"
    },
    {
        name: "poster",
        x: 950,
        y: 185,
        z: 20,
        price: "50 watermelons",
        image: "/images/postere.png",
        message: "Poster"
    }
];


function App() {
    const [player, setPlayer] = useState(null);
    const [nameInput, setNameInput] = useState("");
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);

    async function createPlayer() {
        // call api.post("/init?name=" + nameInput)
        const res = await api.post(`/init?name=${nameInput}`);

        // store response in setPlayer
        setPlayer(res.data);
    }

    async function tickPlayer() {
        if (!player) return;
        const res = await api.post(`/${player.id}/tick`);
        setPlayer(res.data);
    }

    async function purchase(item) {
        try {
            const res = await api.post(`/${player.id}/purchase/${item}`);
            setPlayer(res.data);
        } catch (err) {
            const msg = err.response?.data?.message || "Error purchasing item";
            setError(msg);
            setTimeout(() => setError(null), 2000);
        }
    }

    useEffect(() => {
        if (!player) return;
        const intervalCount = setInterval(() => tickPlayer(), 1000);
        return () => clearInterval(intervalCount);
    }, [player])

    return (
        <div>

            {!player && (
                <div className="space-y-4 max-w-sm mx-auto">

                    <input
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder="Enter your name..."
                    />

                    <button
                        onClick={createPlayer}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded w-full"
                    >
                        Start Game
                    </button>

                </div>
            )}
            {player && (
                <div className="relative">
                    <div className="relative">

                        {/* Background image */}
                        <img
                            src="/images/background.png"
                            className="absolute inset-0 w-screen h-screen object-cover"
                            alt=""
                        />

                        {/* Content */}
                        <div className="relative z-10 text-white">
                            <CoinCount coin={player.coins} />
                            
                            <div className="absolute right-0 z-100 top-30 bottom-30 h-[calc(80dvh)] overflow-y-auto">
                                <div className="flex flex-row items-start gap-0 align-left">

                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="relative bg-primary text-primary-foreground px-2 py-5 h-fixed border-[2px] border-r-0 border-[rgb(171,122,66)] bg-[#f0c76e]"
                                    >
                                        {open ? <img src="./images/right-arrow.png" /> : <img src="./images/left-arrow.png" />}
                                    </button>

                                    {open && (
                                        <div className="grid grid-cols-1 gap-3 p-3 border-2 border-[rgb(171,122,66)] backdrop-blur-xl">
                                            {SHOP_ITEMS.map(item => {
                                                const itemName = item.name; 
                                                return(
                                                    <button
                                                        onClick={() => purchase(itemName)} 
                                                        className="bg-[#f0c76e] text-[rgb(171,122,66)] px-2 py-1"
                                                    >
                                                        {item.message}
                                                        <br />
                                                        <span className="text-white"> {item.price} </span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Rendering items */}
                            {player.inventory.map(itemName => {
                                const item = SHOP_ITEMS.find(i => i.name === itemName);
                                return (
                                    <img
                                        key={itemName}
                                        src={item.image}
                                        className={
                                            `absolute ${(itemName == "fairylight") ? "drop-shadow-[0_3px_4px_rgba(255,194,110,1)] scale-120" : ""}`
                                        }
                                        style={{ left: item.x, top: item.y, zIndex: item.z }}
                                    />
                                )
                            })}
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default App
