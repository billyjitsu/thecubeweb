import Image from "next/image";
import Modal from "./Modal";
import cards from "../images/desktop/cards.jpg";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useSigner,
  useWaitForTransaction,
} from "wagmi";
//contract location
import contractInterface from "../contracts/contract.json";

const BreakOpen = () => {
  const [numToBurn, setNumToBurn] = useState(1);
  const [modalOnBreak, setModalOnBreak] = useState(false);
  const [breaking, setBreaking] = useState(false);
  const [breakingSome, setBreakingSome] = useState(false);
  const [breakingAll, setBreakingAll] = useState(false);
  const [cubesOwned, setCubesOwned] = useState(0);
  const [connectWallet, setConnectWallet] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  // Address
  const { address } = useAccount();
  const { isConnected } = useConnect();
  const { data: signerData } = useSigner();

  const handleChange = (e) => {
    setNumToBurn(e.target.value);
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
    overrides: {
      gasLimit: 1500000,
    }
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
    overrides: {
      gasLimit: 2000000,
    }
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
    overrides: {
      gasLimit: 2000000,
    }
  });

  //Check the Tx for all Break functions
  const { isSuccess: txOneSuccess, error: txOneError } = useWaitForTransaction({
    confirmations: 1,
    hash: breakOneData?.hash,
  });

  const { isSuccess: txSomeSuccess, error: txSomeError } =
    useWaitForTransaction({
      confirmations: 1,
      hash: breakSomeData?.hash,
    });

  const { isSuccess: txAllSuccess, error: txAllError } = useWaitForTransaction({
    confirmations: 1,
    hash: breakAllData?.hash,
  });

  const checkCubes = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    signerOrProvider: signerData,
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

  const getMyCubesBalance = async () => {
    try {
    const cubeCount = await checkCubes.balanceOf(address, 1);
    setCubesOwned(cubeCount.toNumber()) // needs to check when it is called have to refresh page
    setShowBalance(true);
    setConnectWallet(false);
  } catch (error) {
    setConnectWallet(true);
    setShowBalance(false);
    console.log("error:", error)
  }
  };

  // useEffect(() => {
  //   if (cubesInWallet && isConnected) {
  //     setCubesOwned(cubesInWallet.toNumber());
  //   }
  // }, [cubesInWallet]);

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

  return (
    <section
      id="break"
      className="bg-[url('../images/desktop/breakIMG.webp')] bg-no-repeat bg-cover bg-fill bg-center"
    >
      {/* className="bg-gradient-to-b from-gray-900 via-slate-300 to-gray-900" */}

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
              <div className="flex flex-col mb-9 text-center text-white">
                <p className=" flex text-lg items-center mx-auto max-w-md mb-3">
                  Burning your cube will mint you a new NFT that is randomly
                  selected. One cube will mint one new NFT and YOUR CUBE WILL BE
                  DESTROYED
                </p>
                {/*<p className=" flex text-sm items-center mx-auto max-w-sm">
                  Due to the nature of the offchain RNG, it is suggested to
                  break a single cube first and then break a large batch to get
                  a better spread of randomization if not active for 24 hours
                </p>
               */}
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
                    address={address}
                  />
                )}

                {/* Break Many Cubes */}
                <div className="flex flex-col  items-center sm:pb-8 ">
                  <input
                    type="number"
                    name="breakCube"
                    placeholder="Amount"
                    min="1"
                    className="w-4/5 mb-2 text-black shadow-sm rounded-lg text-center pl-2"
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
                      address={address}
                    />
                  )}
                </div>

                {/* Break all Cubes */}
                <button
                  onClick={breakAllToken}
                  className="flex bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2 "
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
                    address={address}
                  />
                )}
              </div>
              {breakOneError && (
                <p className="text-white font-bold max-w-xs mx-auto items-center justify-center mt-3">
                  No Cubes to break
                </p>
              )}
              {breakSomeError && (
                <p className="text-white font-bold max-w-xs mx-auto items-center justify-center mt-3">
                  Not enough Cubes to break
                </p>
              )}
              {breakAllError && (
                <p className="text-white font-bold max-w-xs mx-auto items-center justify-center mt-3">
                  No Cubes to break or way to many
                </p>
              )}
              <div className="flex flex-col  items-center text-white mt-5 sm:mt-0 sm:mr-4">
                <button
                  onClick={getMyCubesBalance}
                  className="flex bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2"
                >
                  Cube Balance
                </button>
                <p className="text-lg text-white">
                  {showBalance && <p>Cubes Owned: {cubesOwned} </p> } 
                  {connectWallet && <p>Connect Wallet</p>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakOpen;
