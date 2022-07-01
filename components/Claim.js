import Image from "next/image";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import faceImage from "../images/desktop/cubeface1.jpg";
import backImage from "../images/desktop/cubeface2.jpg";
import {
  useAccount,
  useConnect,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
//contract location
import contractInterface from "../contracts/contract.json";

//Payment amount -   Line 132

/* Not working
const contractConfig = {
  addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  contractInterface: contractInterface.abi,
};
*/

const alchemyapi = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const Claim = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  const [totalBought, setTotalBought] = useState(0);
  const [numToMint, setNumToMint] = useState(1);
  const [numToCheck, setNumToCheck] = useState(1);
  const [status, setStatus] = useState("Null");
  const [turnOffStatus, setTurnoffStatus] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [buying, setBuying] = useState(false);

  const { isConnected } = useConnect();
  //get Address
  const { address } = useAccount();
  //get network
  const { chain, chains } = useNetwork();

  //claim function
  const {
    data: claimData,
    write: claim,
    isLoading: isClaimLoading,
    isSuccess: isClaimStarted,
    error: claimError,
  } = useContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "claim",
  });

  //Total claim Cubes
  const { data: totalSupplyData } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "cubesClaimed",
    watch: true,
  });

  const handleChange = (e) => {
    setNumToMint(e.target.value);
  };

  //Buy Function
  const {
    data: buyData,
    write: buy,
    isLoading: isBuyLoading,
    isSuccess: isBuyStarted,
    error: buyError,
  } = useContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "mint",
  });

  // Total Cubes Bought
  const { data: totalBuyData } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "cubesPurchased",
    watch: true,
  });

  const handleChangeCheck = (x) => {
    setNumToCheck(x.target.value);
    setTurnoffStatus(false);
  };

  //Claim Checker
  const { data: beezClaimed } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "nfbeezClaimed",
    args: [numToCheck],
  });

  // Check TX for both Write functions
  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
    confirmations: 1,
    hash: claimData?.hash,
  });

  const { isSuccess: txBuySuccess, error: txBuyError } = useWaitForTransaction({
    confirmations: 1,
    hash: buyData?.hash,
  });

  // Token Claimed Fucntion
  const claimed = async () => {
    // console.log("NFBeez claimed:", beezClaimed)
    setTurnoffStatus(true);

    if (beezClaimed == true) {
      // console.log(beezClaimed, "used")
      setStatus("been used!");
    } else {
      //  console.log(beezClaimed, "not used")
      setStatus("not been used");
    }
  };

  // Group Click Function
  const buyToken = async () => {
    let payment = String(numToMint * 0.0001);
    console.log("payment:", payment);
    const tx = await buy({
      args: [numToMint],
      overrides: {
        value: ethers.utils.parseEther(payment),
      },
    });
    setModalOn(true);
    setBuying(true);
  };

  const claimToken = async () => {
    claim();
    setModalOn(true);
    setClaiming(true);
  };

  useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

  useEffect(() => {
    if (totalBuyData) {
      setTotalBought(totalBuyData.toNumber());
    }
  }, [totalBuyData]);

  {
    /* 
  //test effect:
  useEffect(() => {
    console.log("claimData:", claimData);
    console.log("claimDataHash:", claimData?.hash);  // hash of tx
    console.log("claimData - To:", claimData?.to);  // contract address
    console.log("buyData:",buyData?.hash);
    console.log("buyData -to:",buyData?.to);
    console.log("address:", address);
    console.log("USE NETWORK");
    console.log("chains:", chains); // array of supported chains
    console.log("chainId:", chainId);
    console.log("activeChain:", activeChain);
    console.log("chainStuff:", chainStuff);
    console.log("___________");
  }, [chains, chainId, activeChain]);
  */
  }

  return (
    <section
      id="claim"
      className="pt-20 pb-12 bg-gradient-to-b from-mainGreen via-huePurple to-plantGreen"
    >
      {/* Text Header */}
      <div className="flex flex-col mb-12 text-center text-white">
        <h3 className="text-5xl font-extrabold mb-2 mx-6 leading-tighter tracking-tighter md:text-6xl">
          Claim your Cube
        </h3>
        <p className=" flex text-lg items-center mx-auto max-w-sm">
          Owners of the NFBeez NFT can claim their cube for each NFT they own.
          Do not have one? You can also buy a cube
        </p>
      </div>

      {/* container */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col space-y-4 text-center items-center justify-center  lg:flex-row lg:space-y-0 ">
          {/*      Box 1      */}
          <div className="lg:mr-10">
            <div className="items-center justify-center max-w-xs ">
              {" "}
              {/*testing max-w and intrinsic */}
              <Image alt="Front of Cube" src={faceImage} layout="intrinsic" />
            </div>

            {/* container to hold text and buttons next/under image */}
            <div className="flex flex-col text-center items-center  space-y-4 text-white">
              <div className="space-y-3 lg:space-y-7 ">
                <div>
                  <h3 className="text-xl mb-1">Claim your Cube</h3>
                  <h3 className="text-sm">
                    <a
                      href="https://www.nfbeez.xyz/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:opacity-75"
                    >
                      1 NFBee
                    </a>{" "}
                    = 1 Cube
                  </h3>
                </div>
                <button
                  onClick={claimToken}
                  className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto"
                  disabled={isClaimLoading}
                >
                  {isClaimLoading && <p>Waiting for Approval</p>}
                  {isClaimStarted && !txSuccess && modalOn && (
                    <p className="animate-pulse">Claiming...</p>
                  )}
                  {!isClaimStarted && !isClaimLoading && <p>Claim</p>}
                  {txSuccess && !modalOn && <p>Claim</p>}
                  {txSuccess && modalOn && <p>Claim</p>}
                </button>
                {txSuccess && modalOn && claiming && (
                  <Modal
                    setModalOn={setModalOn}
                    setClaiming={setClaiming}
                    setBuying={setBuying}
                    claimData={claimData.hash}
                    claimDataContract={claimData.to}
                    address={address}
                  />
                )}
              </div>
              {claimError && (
                <p className="text-white font-bold max-w-xs mx-auto items-center justify-center mt-3">
                  {" "}
                  No Claimable NFBeez{" "}
                </p>
              )}
              <div>
                <h3 className="text-lg ">Total claimed</h3>

                <h3 className="text-lg">{totalMinted}/2525</h3>
              </div>
            </div>
          </div>

          {/*     Box 2      */}
          <div className="lg:ml-10">
            {/* image  */}
            <div className="items-center justify-center max-w-xs">
              <Image alt="Back of Cube" src={backImage} layout="intrinsic" />
            </div>

            {/* container to hold text and buttons next/under image */}
            <div className="flex flex-col items-center text-white space-y-2 mb-14 lg:-mb-0">
              <div>
                <h3 className="text-xl">Buy a Cube</h3>
                <h3 className="text-sm">20 xDai</h3>
              </div>
              <input
                type="number"
                name="tokenID"
                placeholder=" Amount"
                min="1"
                max="10"
                className="w-1/2 mb-2 text-black shadow-sm rounded-lg text-center"
                onChange={handleChange}
                value={numToMint}
              />
              <button
                onClick={buyToken}
                className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto "
              >
                {isBuyLoading && <p>Waiting for Approval</p>}
                {isBuyStarted && !txBuySuccess && modalOn && (
                  <p className="animate-pulse">Buying...</p>
                )}
                {!isBuyStarted && !isBuyLoading && <p>Buy</p>}
                {txBuySuccess && !modalOn && <p>Buy</p>}
                {txBuySuccess && modalOn && <p>Buy</p>}
              </button>
              {txBuySuccess && modalOn && buying && (
                <Modal
                  setModalOn={setModalOn}
                  setBuying={setBuying}
                  setClaiming={setClaiming}
                  buyData={buyData}
                  address={address}
                />
              )}

              {claimError && (
                <p className="text-white font-bold max-w-xs mx-auto items-center justify-center mt-3">
                  {" "}
                  Not enough xDai?{" "}
                </p>
              )}
              <div>
                <h3 className="text-lg ">Total bought</h3>

                <h3 className="text-lg">{totalBought}/2475</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Check token claimed or not */}
        <div className="flex flex-col text-white items-center mx-auto max-w-lg lg:mt-14 lg:mb-10">
          <h3 className="text-lg ">NFBee claimed?</h3>
          <input
            type="number"
            name="tokenID"
            min="1"
            placeholder=" Token ID"
            className="w-1/4 mb-2 text-black shadow-sm rounded-lg  text-center"
            onChange={handleChangeCheck}
            value={numToCheck}
          />
          <button
            onClick={() => claimed()}
            className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2 sm:w-auto "
          >
            Check
          </button>
          {turnOffStatus && (
            <p>
              {" "}
              Token {numToCheck} has {status}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Claim;
