import Image from "next/image";
import LoginSvg from "../public/images/login.svg";
import MetamaskSvg from "../public/images/metamaskFox.svg";

const Login = () => {
    return (
        <>
            <div className="mx-auto flex justify-center">
                <Image src={LoginSvg} alt="Login"/>
            </div>
            <div className="mx-auto flex flex-col justify-center">
                <div className="mx-auto -mt-32">
                    <Image src={MetamaskSvg} alt="Metamask"/>
                </div>
                <div className="flex flex-col justify-center text-xl space-y-5 -mt-24 mb-24">
                    <p className="text-OurBlue text-center">
                        Log in with your{" "}
                        <span className="text-[#f8911e]">Metamask</span>
                    </p>
                    <div className="mx-auto">
                        <button className="connectBtn rounded-lg px-14 py-1 bg-OurBlue">
                            Connect
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-respct h-64 bg-contain bg-no-repeat"></div>
            <style jsx>{`
            .connectBtn {
                box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.1);
            }
            `}</style>
        </>
    );
};

export default Login;
