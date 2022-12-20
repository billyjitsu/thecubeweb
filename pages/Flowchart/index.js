import Image from "next/image";
import flowImage from "../../images/desktop/thecubeflow.png";
import mobileclaim from "../../images/mobile/claimyourcube.png";
import mobilebreak from "../../images/mobile/breakthecube.png";
import mobilecreate from "../../images/mobile/createthedaomobile.png";

const index = () => {

  function closeMe()
{
    window.opener = self;
    window.close();
}

  return (
    <section id="FlowChart">
      <div className=" bg-black h-full ">
        <div className="flex flex-col text-center items-center justify-center min-h-screen">
          <div className="hidden flex flex-col mt-16 mx-8 justify-center items-center lg:block lg:flex-row ">
            <Image alt="Front of Cube" src={flowImage} layout="intrinsic" />
          </div>
          <div className="bg-black flex flex-col mt-10 mb-5 space-y-3  lg:hidden">
            <Image alt="Front of Cube" src={mobileclaim} layout="intrinsic" />
            <p className="text-white">--------------</p>
            <Image alt="Front of Cube" src={mobilebreak} layout="intrinsic" />
            <p className="text-white">--------------</p>
            <Image alt="Front of Cube" src={mobilecreate} layout="intrinsic" />
          </div>
          <a
                  href="https://www.youtube.com/watch?v=qx4FR04rs7M"
                  target="_blank"
                  rel="noreferrer"
                  className="text-md font-bold text-decoration-line: underline text-gray-200 hover:opacity-75  md:text-lg"
                >
                  Still Confused? <br></br> Watch the Video
                </a>
          <button onClick={closeMe} className="bg-gray-700 hover:bg-gray-800 rounded-full px-12 py-2 mt-2 ">
            Close
          </button>
        </div>
      </div>
    </section>
  );
};

export default index;
