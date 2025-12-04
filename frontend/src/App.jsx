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
                <div className="space-y-4 max-w-sm mx-auto min-h-screen flex flex-col justify-center items-center bg-gray-200 min-w-screen">
                    <img src="./images/gamelogo.png" className="scale-120 mb-10"/>
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
                    <div className=" mt-6"> Inspired by the kdrama 
                        <span className="text-[#ff7d93]"> Twinkling</span> 
                        <span className="text-[#22b14c]"> Watermelon</span> 
                    </div>

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
                                        className="relative bg-primary text-primary-foreground px-2 py-5 h-fixed  border-4 border-r-0 border-[rgb(171,122,66)] bg-[#f0c76e] hover:bg-[#e0b65a] hover:cursor-pointer"
                                    >
                                        {open ? <img src="./images/right-arrow.png" /> : <img src="./images/left-arrow.png" />}
                                    </button>

                                    {open && (
                                        <div className="grid grid-cols-1 gap-5 p-5 border-4 border-r-0 border-[rgb(171,122,66)] backdrop-blur-xl">
                                            {SHOP_ITEMS.map(item => {
                                                const itemName = item.name; 
                                                return(
                                                    <button
                                                        onClick={() => purchase(itemName)} 
                                                        className="pixel-art-btn bg-[#f0c76e] text-[rgb(171,122,66)] px-2 py-1 leading-tight hover:bg-[#e0b65a]"
                                                    >
                                                        <div>{item.message}</div>
                                                        <div className="text-white"> {item.price} </div>
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
