import Image from "next/image";
import heroImage from "../images/desktop/image-hero.jpg";

const Intro = () => {
  return (
    
    <section className="hero">
      <div className="">
        <div className="relative flex w-full h-screen content-center items-center justify-center md:h-screen -z-10">
          <div>
            <Image src={heroImage} alt="heroBanner" layout="fill" objectFit="cover" priority />
            {/* objectFit='cover' or 'contain' */}
          </div>

          <div className="container relative mx-auto p-16 md:p-0 ">
            <div className="flex flex-wrap items-center ">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="">
                  <h1 className="text-white font-extrabold text-5xl leading-tighter tracking-tighter md:text-6xl">
                    The Cube
                  </h1>
                  <p className="mt-4 text-lg font-bold  text-gray-200">
                    The second iteration of the NFBeez project.  Claim your cube if you hold an NFBee or purchase a cube directly.
                  </p>
                </div>
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
