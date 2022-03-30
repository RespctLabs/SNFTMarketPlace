/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import NftCard from "../NftCard";

const handleDragStart = (e) => e.preventDefault();

export default function Carousels(props) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 8,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const [Values, setValues] = React.useState([]);

    useEffect(() => {
        let updates: any;

        updates = props.nfts.map(function (number: any[]) {
            // you redefine `number` here to be the value within the inner array
            return <NftCard element={number} />;
        });
        setValues(updates);
    }, [props]);
    // console.log(Values);
    return (
        // <div>Hi</div>
        <div className="">
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                showDots={false}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                //   autoPlay={true}
                //   autoPlaySpeed={1000}
                keyBoardControl={true}
                //   customTransition="all .5"
                //   transitionDuration={500}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {Values}
            </Carousel>
        </div>
    );
}
