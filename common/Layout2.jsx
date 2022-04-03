import React from "react";

const Layout = (props) => {
  return (
    <div className="flex flex-col  justify-between bg-OurBlack text-white ">
      <div className="md:mx-24 my-5 md:my-12"></div>
      <div className="container mx-auto mb-auto sm:px-8 md:px-4 lg:px-16 xl:px-20">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
