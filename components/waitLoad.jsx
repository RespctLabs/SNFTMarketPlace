const WaitLoad = () => {
    return (
        <>
            <div className="bg-slate-400/50 min-h-screen absolute top-0 right-0 w-full flex justify-center items-center">
                <div className="bg-black rounded-2xl p-10 drop-shadow-xl w-48 md:w-[499px] space-y-5">
                    <span className="uppercase  text-center stroke pt-12 text-4xl md:text-8xl bg-clip-text poppinsFont text-OurBlack">
                        Wait
                    </span>
                    <p>
                        Processing your request...
                    </p>
                </div>
            </div>
        </>
    )
}

export default WaitLoad;