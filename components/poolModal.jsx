const PoolModal = (props) => {
    // console.log(props.data.amt1);
    return (
        <>
            <div className="bg-slate-400/50 min-h-screen absolute top-0 right-0 w-full flex justify-center items-center">
                <div className="bg-black rounded-2xl p-10 drop-shadow-xl w-48 md:w-[499px] space-y-5">
                    <h1 className="text-2xl font-semibold text-OurBlue text-center">
                        Confirmation Pool Creation
                    </h1>
                    <div className="text-lg font-semibold flex flex-row justify-between">
                        <p>{props.data.amt1}</p>
                        <p>{props.data.curr1}</p>
                    </div>
                    <div className="text-lg font-semibold flex flex-row justify-between">
                        <p>{props.data.amt2}</p>
                        <p>{props.data.curr2}</p>
                    </div>
                    <p className="text-OurPurple text-center text-bold w-2/3 mx-auto">
                        You will receive at least {props.data.amt1} {props.data.curr1} and at most {props.data.amt2} {props.data.curr2}
                    </p>
                    <div className="text-lg text-OurBlue flex flex-row justify-between">
                        <p>
                            Maximum Sold
                        </p>
                        <p>
                            {props.data.maxSold}
                        </p>
                    </div>
                    <div className="text-lg text-OurBlue flex flex-row justify-between">
                        <p>
                            Price Impact
                        </p>
                        <p>
                            {props.data.priceImp}
                        </p>
                    </div>
                    <div className="text-lg text-OurBlue flex flex-row justify-between">
                        <p>
                            Liquidity Provider Fee
                        </p>
                        <p>
                            {props.data.liqFee}
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-OurBlue font-bold py-1 px-10 rounded-lg">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PoolModal;