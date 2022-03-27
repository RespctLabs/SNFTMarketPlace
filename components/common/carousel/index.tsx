/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Image from "next/image";
import NftCard from "../NftCard";

const handleDragStart = (e) => e.preventDefault();

export default function Carousel(props) {
  const [Values, setValues] = React.useState([]);

  useEffect(() => {
    let updates: any;

    updates = props.nfts.map(function (number: any[]) {
      // you redefine `number` here to be the value within the inner array
      return <NftCard element={number} />;
    });
    setValues(updates);
  }, [props]);
  return (
    console.log(Values),
    (
      <div>
        <AliceCarousel
          mouseTracking
          items={Values}
          responsive={{
            0: {
              items: 1,
            },
            1024: {
              items: 4,
            },
          }}
        />
      </div>
    )
  );
}
