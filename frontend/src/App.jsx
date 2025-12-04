import { useState, useEffect } from 'react'
import { api } from './api';
import { CoinCount } from './components/CoinCount';

function App() {
    const [player, setPlayer] = useState(null);
    const [nameInput, setNameInput] = useState("");

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
                            <div className="absolute z-20 top-70 left-150">
                                <img src="images/microphone.png" className=""/>
                            </div>

                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default App
