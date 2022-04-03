import React from "react";

export default function PrimaryButton(props) {
    const color = "bg-" + props.color;
    const shadow = "shadow-" + props.shadow;

    return (
        <div className="flex justify-center">
            <button
                onClick={props.onClick}
                className={color + " rounded-md shadow-md " + shadow}
            >
                <div className="text-white font-bold px-12 py-1">
                    {props.text ? props.text : "Loading Text..."}
                </div>
            </button>
        </div>
    );
}
