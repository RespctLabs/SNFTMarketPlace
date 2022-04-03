/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
import React from "react";
import CreateNft from "../../public/images/CreateNft.svg";
import Image from "next/image";
import Instagram from "../../public/socialSvg/Instagram.svg";
import Twitter from "../../public/socialSvg/Twitter.svg";
import Twitch from "../../public/socialSvg/Twitch.svg";
import Youtube from "../../public/socialSvg/Youtube.svg";
import PrimaryButton from "../../components/common/PrimaryButton";

export default function ProfileSettings() {
    return (
        <>
            <div className="container mx-auto  bg-[#131312]">
                <div>
                    <div className="flex justify-center ">
                        <p className=" text-center uppercase text-3xl md:text-5xl mb-8 text-OurBlue">
                            Profile &nbsp;
                        </p>
                        <p className=" text-center uppercase text-3xl md:text-5xl mb-8 text-white">
                            Settings
                        </p>
                    </div>
                    <div className="flex justify-center bg-covers bg-no-repeat bg-contain bg-center h-28 md:h-56  "></div>
                    <div className="flex justify-center">
                        <button className=" rounded-lg bg-[#212127] mx-auto w-72 md:w-full h-20 md:h-40 shadow shadow-inner"></button>
                    </div>

                    <div className="flex justify-center">
                        <button className=" rounded-full bg-[#212127] mt-5 md:mt-0 w-40 h-40 shadow shadow-inner "></button>
                    </div>

                    <form className="text-center">
                        <div className="my-4 ">
                            <label
                                className="block text-gray-700 text-xl mb-2  text-[#6F6F6F]"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                className="shadow shadow-inner  appearance-none  rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127]"
                                id="name"
                                type="text"
                                placeholder="name"
                            />
                        </div>
                        <div className="my-4 ">
                            <label
                                className="block text-gray-700 text-xl  mb-2  text-[#6F6F6F]"
                                htmlFor="Description"
                            >
                                Description
                            </label>
                            <textarea
                                className="shadow shadow-inner  appearance-none  rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127]"
                                id="description"
                                placeholder="Description"
                            />
                        </div>
                        <div className="my-4 ">
                            <label
                                className="block text-gray-700 text-xl  mb-2  text-[#6F6F6F]"
                                htmlFor="Instagram"
                            >
                                Instagram
                            </label>
                            <input
                                className="shadow shadow-inner  appearance-none  rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127]"
                                id="Instagram"
                                type="text"
                                placeholder="Instagram"
                            />
                        </div>
                        <div className="my-4 ">
                            <label
                                className="block text-gray-700 text-xl  mb-2  text-[#6F6F6F]"
                                htmlFor="Youtube"
                            >
                                Youtube
                            </label>
                            <input
                                className="shadow shadow-inner  appearance-none  rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127]"
                                id="Youtube"
                                type="text"
                                placeholder="Youtube"
                            />
                        </div>
                        <div className="my-4 ">
                            <label
                                className="block text-gray-700 text-xl  mb-2  text-[#6F6F6F]"
                                htmlFor="Twitch"
                            >
                                Twitch
                            </label>
                            <input
                                className="shadow shadow-inner  appearance-none  rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127]"
                                id="Twitch"
                                type="text"
                                placeholder="Twitch"
                            />
                        </div>
                        <div className="my-4 ">
                            <label
                                className="block text-gray-700 text-xl  mb-2  text-[#6F6F6F]"
                                htmlFor="Twitter"
                            >
                                Twitter
                            </label>
                            <input
                                className="shadow shadow-inner  appearance-none  rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127]"
                                id="Twitter"
                                type="text"
                                placeholder="Twitter"
                            />
                        </div>
                    </form>
                    <div className="flex justify-center bg-respct bg-no-repeat bg-center bg-contain h-32 md:h-64 ">
                        <div className="flex flex-col justify-center">
                            <button className="bg-OurBlue rounded-md shadow-md shadow-OurBlue">
                                <div className="text-white font-bold px-12 py-1">
                                    Create
                                </div>
                            </button>
                        </div>
                    </div>

                    <br />
                </div>
            </div>
        </>
    );
}
