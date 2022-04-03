import PoolModal from "../components/poolModal";
import { useState } from "react";

const ModalPage = () => {
    const [show,
        setShow] = useState(false);

    const data = {
        amt1: "34",
        amt2: "56",
        curr1: "ANI",
        curr2: "ETH",
        maxSold: "0.00",
        priceImp: "1.00",
        liqFee: "0.01",
    };
    const showModal = () => {
        if (show) {
            return (
                <PoolModal data={data} />
            )
        } else if (!show) {
            return null;
        }
    }

    return (
        <>
            <button
                className="bg-OurBlue py-1 px-7 font-bold"
                onClick={() => {
                    setShow(true);
                }}
            >
                Show Pool Modal
            </button>
            {showModal()}
        </>
    );
};

export default ModalPage;
