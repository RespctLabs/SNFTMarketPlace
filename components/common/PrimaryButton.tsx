import React from "react";

export default function PrimaryButton({ flag, onCli }) {
    if (flag === "checkEngagement") {
        return (
            <div className="flex justify-center">
                <button
                    onClick={onCli}
                    className="bg-[#7834BF] rounded-md shadow-md"
                >
                    <div className="text-white font-bold px-12 py-1">
                        Check Engagement
                    </div>
                </button>
            </div>
        );
    } else if (flag === "buy") {
        return (
            <div className="flex justify-center">
                <button
                    onClick={onCli}
                    className="bg-OurBlue rounded-md shadow-md"
                >
                    <div className="text-white font-bold px-12 py-1">
                        Buy
                    </div>
                </button>
            </div>
        );
    } else if (flag === "upgrade") {
        return (
            <div className="flex justify-center">
                <button
                    onClick={onCli}
                    className="bg-[#7834BF] rounded-md shadow-md"
                >
                    <div className="text-white font-bold px-12 py-1">
                        Upgrade
                    </div>
                </button>
            </div>
        );
    }
}
