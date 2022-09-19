import Image from "next/image";
import heroImage from "../images/desktop/image-hero.jpg";

//OG 2nd div
//<div className="relative flex w-full h-screen content-center items-center justify-center md:h-screen -z-10 bg-gradient-to-b from-plantGreen via-huePurple to-mainGreen">
const Intro = () => {
  return (
    <section className="hero">
      <div className="">
        <div className="relative flex w-full h-screen content-center items-center justify-center md:h-screen z-10 bg-gradient-to-b from-black  to-slate-300">
          <div>
            {/*<Image src={heroImage} alt="heroBanner" layout="fill" objectFit="cover" priority /> */}
            {/* objectFit='cover' or 'contain' */}
          </div>

          <div className="container relative mx-auto p-16 md:p-0">
            <div className="flex flex-wrap items-center ">
              <div className="w-full md:max-w-lg px-4 ml-auto mr-auto text-center">
                <div className="">
                  <h1 className="text-white font-extrabold text-5xl leading-tighter tracking-tighter md:text-6xl">
                    The Cube
                  </h1>
                  <p className="mt-4 mb-16 text-md font-bold  text-gray-200 md:text-lg">
                    A journey through the Gnosis Chain ecosystem.  Collect all the cards to create the DAO cube
                  </p>
                </div>

                <a
                  href="/Flowchart"
                  target="_blank"
                  rel="noreferrer"
                  className="text-md font-bold text-decoration-line: underline text-gray-200 hover:opacity-75  md:text-lg"
                >
                  HOW IT WORKS
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<div className="container max-w-6xl mx-auto px6 py12 md:px-0">

      </div>*/}
    </section>
  );
};

export default Intro;
