export function CoinCount({ coin }) {
    return (
        <div className="absolute w-20 right-30 top-6">
            <div className="flex items-center gap-5">
                <img src="/images/watermelonCount.png" className="scale-90 drop-shadow-[0_0_8px_rgba(255,194,110,1)]"/>
                <p className="text-4xl text-[#f0c76e] text-outline"> {coin} </p>
            </div>
        </div>
        
    )
}