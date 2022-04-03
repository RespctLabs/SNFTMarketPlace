import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <div className="flex flex-col  justify-between bg-OurBlack text-white px-5 md:px-0 min-h-screen">
      <div className="md:mx-24 my-5 md:my-12">
        <Navbar />
      </div>
      <div className="container mx-auto mb-auto sm:px-8 md:px-4 lg:px-16 xl:px-20">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
