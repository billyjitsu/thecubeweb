import Image from "next/image";
import Modal from "./Modal";
import cards from "../images/desktop/cards.jpg";
import { useEffect, useState } from "react";
import {
  useConnect,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
//contract location
import contractInterface from "../contracts/contract.json";

//FIX PUTTING IN ADDRESS to pass for MODAL popup
//pass the address to each function

/* doesn't work for some reason
const contractConfig = {
  addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  contractInterface: contractInterface.abi,
};
*/

const BreakOpen = () => {
  const [numToBurn, setNumToBurn] = useState(1);
  const [modalOnBreak, setModalOnBreak] = useState(false);
  const [breaking, setBreaking] = useState(false);
  const [breakingSome, setBreakingSome] = useState(false);
  const [breakingAll, setBreakingAll] = useState(false);

  const handleChange = (e) => {
    setNumToBurn(e.target.value);
    // console.log("Number:", numToBurn);
  };

  //break 1 function
  const {
    data: breakOneData,
    write: breakOne,
    isLoading: isBreakOneLoading,
    isSuccess: isBreakOneStarted,
    error: breakOneError,
  } = useContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "breakOpen",
  });

  //break all function
  const {
    data: breakAllData,
    write: breakAll,
    isLoading: isBreakAllLoading,
    isSuccess: isBreakAllStarted,
    error: breakAllError,
  } = useContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "bulkBreakOpenAll",
  });

  //break open some
  const {
    data: breakSomeData,
    write: breakSome,
    isLoading: isBreakSomeLoading,
    isSuccess: isBreakSomeStarted,
    error: breakSomeError,
  } = useContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "bulkBreakOpen",
    args: [numToBurn],
  });

  //Check the Tx for all Break functions
  const { isSuccess: txOneSuccess, error: txOneError } = useWaitForTransaction({
    hash: breakOneData?.hash,
  });

  const { isSuccess: txSomeSuccess, error: txSomeError } =
    useWaitForTransaction({
      hash: breakSomeData?.hash,
    });

  const { isSuccess: txAllSuccess, error: txAllError } = useWaitForTransaction({
    hash: breakAllData?.hash,
  });

  //Button MultiFunction Call
  const breakOneToken = async () => {
    breakOne();
    setModalOnBreak(true);
    setBreaking(true);
  };

  const breakSomeToken = async () => {
    breakSome();
    setModalOnBreak(true);
    setBreakingSome(true);
  };

  const breakAllToken = async () => {
    breakAll();
    setModalOnBreak(true);
    setBreakingAll(true);
  };

  {
    /* 
  //text to console out
  useEffect(() => {
    console.log("Break ONE");
    console.log("isBreakOneLoading:", isBreakOneLoading);
    console.log("isBreakOneStarted:", isBreakOneStarted);
    console.log("txOneSuccess:", txOneSuccess);
    console.log("modalOnBreak", modalOnBreak);
    console.log("breaking:", breaking);
    console.log("___________");
  }, [modalOnBreak, txOneSuccess, isBreakOneLoading, isBreakOneStarted]);

  useEffect(() => {
    console.log("Break SOME");
    console.log("isBreakSomeLoading:", isBreakSomeLoading);
    console.log("isBreakSomeStarted:", isBreakSomeStarted);
    console.log("txSomeSuccess:", txSomeSuccess);
    console.log("modalOnBreak", modalOnBreak);
    console.log("breaking:", breakingSome);
    console.log("___________");
  }, [modalOnBreak, txSomeSuccess, isBreakSomeLoading, isBreakSomeStarted]);
  */
  }

  return (
    <section
      id="break"
      className="bg-gradient-to-b from-plantGreen via-mainGreen to-huePurple"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
        {/* Hero content */}
        <div className="pt-16 pb-12 md:pt-20 md:pb-20">
          {/* Section header */}

          {/* Text Header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
              Break Open Your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Cube
              </span>
            </h1>

            {/* image */}
            <div className="container mx-auto max-w-xl px-6">
              <div className="flex flex-col text-center items-center mx-auto mb-3 md:flex-row md:space-y-0">
                <div className="items-center justify-center drop-shadow-2xl">
                  <Image alt="cards" src={cards} layout="intrinsic" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col mb-12 text-center text-white">
                <p className=" flex text-lg items-center mx-auto max-w-md">
                  Burning your cube will mint you a new NFT that is randomly
                  selected. One cube will mint one NFT and your cube will be
                  destroyed
                </p>
              </div>

              {/* Buttons */}
              {/* Break 1 Cube */}
              <div className="flex flex-col text-white max-w-xs mx-auto items-center justify-center space-y-4  sm:max-w-none sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <button
                  onClick={breakOneToken}
                  disabled={isBreakOneLoading}
                  className="flex bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2"
                >
                  {isBreakOneLoading && <p> Waiting for Approval </p>}
                  {isBreakOneStarted && !txOneSuccess && modalOnBreak && (
                    <p className="animate-pulse"> Breaking...</p>
                  )}
                  {!isBreakOneLoading && !isBreakOneStarted && (
                    <p>Break 1 Cube</p>
                  )}
                  {txOneSuccess && !modalOnBreak && <p>Break 1 Cube</p>}
                  {txOneSuccess && modalOnBreak && <p>Break 1 Cube</p>}
                </button>
                {txOneSuccess && modalOnBreak && breaking && (
                  <Modal
                    setModalOnBreak={setModalOnBreak}
                    setBreaking={setBreaking}
                    setBreakingSome={setBreakingSome}
                    setBreakingAll={setBreakingAll}
                    breakOneData={breakOneData}
                  />
                )}

                {/* Break Many Cubes */}
                <div className="flex flex-col  items-center sm:pb-8 ">
                  <input
                    type="number"
                    name="breakCube"
                    placeholder="Amount"
                    min="1"
                    className="w-4/5 mb-2 text-black shadow-sm rounded-lg text-center"
                    onChange={handleChange}
                    value={numToBurn}
                  />
                  <button
                    onClick={breakSomeToken}
                    className="flex bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2"
                  >
                    {isBreakSomeLoading && <p> Waiting for Approval </p>}
                    {isBreakSomeStarted && !txSomeSuccess && modalOnBreak && (
                      <p className="animate-pulse"> Breaking...</p>
                    )}
                    {!isBreakSomeLoading && !isBreakSomeStarted && (
                      <p>Break Cubes</p>
                    )}
                    {txSomeSuccess && !modalOnBreak && <p>Break Cubes</p>}
                    {txSomeSuccess && modalOnBreak && <p>Break Cubes</p>}
                  </button>
                  {txSomeSuccess && modalOnBreak && breakingSome && (
                    <Modal
                      setModalOnBreak={setModalOnBreak}
                      setBreaking={setBreaking}
                      setBreakingSome={setBreakingSome}
                      setBreakingAll={setBreakingAll}
                      breakSomeData={breakSomeData}
                    />
                  )}
                </div>

                {/* Break all Cubes */}
                <button
                  onClick={breakAllToken}
                  className="flex bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2"
                >
                  {isBreakAllLoading && <p> Waiting for Approval </p>}
                  {isBreakAllStarted && !txAllSuccess && modalOnBreak && (
                    <p className="animate-pulse"> Breaking...</p>
                  )}
                  {!isBreakAllLoading && !isBreakAllStarted && (
                    <p>Break all Cubes</p>
                  )}
                  {txAllSuccess && !modalOnBreak && <p>Break all Cubes</p>}
                  {txAllSuccess && modalOnBreak && <p>Break all Cubes</p>}
                </button>

                {txAllSuccess && modalOnBreak && breakingAll && (
                  <Modal
                    setModalOnBreak={setModalOnBreak}
                    setBreaking={setBreaking}
                    setBreakingSome={setBreakingSome}
                    setBreakingAll={setBreakingAll}
                    breakAllData={breakAllData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakOpen;
