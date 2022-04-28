const UpgradeModal = ({ NFTlevel }) => {
    return (
        <>
            <div className="bg-slate-400/50 min-h-screen absolute top-0 right-0 w-full flex justify-center items-center">
                <div className="bg-black rounded-2xl p-10 drop-shadow-xl w-48 md:w-[499px] space-y-5 relative">
                    <div className="absolute">
                        <span className="uppercase  text-center stroke pt-12 text-4xl md:text-8xl bg-clip-text poppinsFont text-OurBlack">
                            {NFTlevel}
                        </span>
                    </div>
                    <div>
                        <div className="flex flex-row justify-between">
                            <div>
                                Player Level {NFTlevel - 1}
                            </div>
                            <div>
                                RP 100
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                Upgrade
                            </div>
                            <div>
                                -RP 40
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                <hr />
                            </div>
                            <div>
                                <hr />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                Player Level {NFTlevel}
                            </div>
                            <div>
                                RP 60
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <div>
                                Cancel
                            </div>
                            <div>
                                <button
                                    onClick={onCli}
                                    className="bg-[#7834BF] rounded-md shadow-md px-12 py-1 flex justify-around items-center"
                                >
                                    <div className="text-white font-bold">
                                        Upgrade
                                    </div>
                                    <span className="mt-2 -mr-8">
                                        <svg
                                            width="34"
                                            height="34"
                                            viewBox="0 0 34 34"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g filter="url(#filter0_bd_260_6169)">
                                                <circle
                                                    cx="17"
                                                    cy="13"
                                                    r="7"
                                                    fill="#D7D7D7"
                                                    fillOpacity="0.75"
                                                    shapeRendering="crispEdges"
                                                />
                                            </g>
                                            <path
                                                d="M16.9496 9.78C17.6429 9.78 18.1996 9.97 18.6196 10.35C19.0462 10.7233 19.2596 11.24 19.2596 11.9C19.2596 12.5533 19.0496 13.0533 18.6296 13.4C18.2096 13.74 17.6529 13.91 16.9596 13.91L16.9196 14.68H15.6896L15.6396 12.98H16.0896C16.6696 12.98 17.1162 12.9033 17.4296 12.75C17.7429 12.5967 17.8996 12.3167 17.8996 11.91C17.8996 11.6167 17.8129 11.3833 17.6396 11.21C17.4729 11.0367 17.2429 10.95 16.9496 10.95C16.6429 10.95 16.4029 11.0333 16.2296 11.2C16.0629 11.3667 15.9796 11.5967 15.9796 11.89H14.6596C14.6529 11.4833 14.7396 11.12 14.9196 10.8C15.0996 10.48 15.3629 10.23 15.7096 10.05C16.0629 9.87 16.4762 9.78 16.9496 9.78ZM16.2996 17.07C16.0462 17.07 15.8362 16.9933 15.6696 16.84C15.5096 16.68 15.4296 16.4833 15.4296 16.25C15.4296 16.0167 15.5096 15.8233 15.6696 15.67C15.8362 15.51 16.0462 15.43 16.2996 15.43C16.5462 15.43 16.7496 15.51 16.9096 15.67C17.0696 15.8233 17.1496 16.0167 17.1496 16.25C17.1496 16.4833 17.0696 16.68 16.9096 16.84C16.7496 16.9933 16.5462 17.07 16.2996 17.07Z"
                                                fill="white"
                                            />
                                            <defs>
                                                <filter
                                                    id="filter0_bd_260_6169"
                                                    x="-125"
                                                    y="-129"
                                                    width="284"
                                                    height="284"
                                                    filterUnits="userSpaceOnUse"
                                                    colorInterpolationFilters="sRGB"
                                                >
                                                    <feFlood
                                                        floodOpacity="0"
                                                        result="BackgroundImageFix"
                                                    />
                                                    <feGaussianBlur
                                                        in="BackgroundImage"
                                                        stdDeviation="67.5"
                                                    />
                                                    <feComposite
                                                        in2="SourceAlpha"
                                                        operator="in"
                                                        result="effect1_backgroundBlur_260_6169"
                                                    />
                                                    <feColorMatrix
                                                        in="SourceAlpha"
                                                        type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                        result="hardAlpha"
                                                    />
                                                    <feOffset dy="4" />
                                                    <feGaussianBlur stdDeviation="5" />
                                                    <feComposite
                                                        in2="hardAlpha"
                                                        operator="out"
                                                    />
                                                    <feColorMatrix
                                                        type="matrix"
                                                        values="0 0 0 0 0.312384 0 0 0 0 0.312384 0 0 0 0 0.312384 0 0 0 0.25 0"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in2="effect1_backgroundBlur_260_6169"
                                                        result="effect2_dropShadow_260_6169"
                                                    />
                                                    <feBlend
                                                        mode="normal"
                                                        in="SourceGraphic"
                                                        in2="effect2_dropShadow_260_6169"
                                                        result="shape"
                                                    />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpgradeModal;