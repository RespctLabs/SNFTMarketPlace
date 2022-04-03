import Image from "next/image";
import NotFoundImg from "../public/images/notFoundImg.svg";
import FError from "../public/images/ferror.svg";
import FourSvg from "../public/images/fourSvg.svg";
import IFourSvg from "../public/images/ifourSvg.svg";
import Error from "../public/images/error.svg";

const Page404 = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center mx-4 md:mx-0">
          <div className="flex flex-col justify-center ">
            <Image src={Error} width={70} height={400} alt={"imange"} />
          </div>
          <div className="flex flex-col">
            <Image src={FourSvg} width={200} height={70} />
            <div className="shadow-2xl">
              <Image src={NotFoundImg} alt="image" />
            </div>
            <Image src={IFourSvg} width={200} height={70} />
          </div>
          <div className="flex flex-col justify-center ">
            <Image src={FError} width={70} height={400} />
          </div>
        </div>
        <div className="mx-auto flex justify-center my-14 text-xl">
          <button className="pressFBtn rounded-lg px-14 py-1 bg-OurBlue">
            Press F
          </button>
        </div>
      </div>
      <style jsx>{`
        .pressFBtn {
          box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

Page404.layout = "L2";
export default Page404;
