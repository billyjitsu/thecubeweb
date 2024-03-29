import Image from "next/image";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import DAO from "../images/desktop/daocube.webp";
import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi";
//contract location
import contractInterface from "../contracts/contract.json";

/* Not working
const contractConfig = {
  addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  contractInterface: contractInterface.abi,
};
*/

const BreakOpen = () => {
  const [modalOnMerge, setModalOnMerge] = useState(false);
  const [mergeAll, setMergeAll] = useState(false);
  const [status, setStatus] = useState([]);
  const [turnOffStatus, setTurnoffStatus] = useState(false);
  const [turnOffError, setTurnOffError] = useState(false);
  //get Address
  const { address } = useAccount();
  const { isConnected } = useConnect();
  const provider = useProvider();
  // There has to be a better way to do this
  let connectedAddress = [
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
    address,
  ];

  let tokens = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
  ];

  //Merge function
  const {
    data: mergeData,
    write: merge,
    isLoading: mergeLoading,
    isSuccess: mergeStarted,
    error: mergeError,
  } = useContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "createDAOCube",
  });

  // Check TX functions
  const { isSuccess: txMergeSuccess, error: txMergeError } =
    useWaitForTransaction({
      hash: mergeData?.hash,
    });

  //Using useContract only (insteas of useContractRead constant feed)
  const missingBalance = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    signerOrProvider: provider,
  });

  // Function to capture
  //Check Balance
  const nftOwned = async () => {
    try {
      const balance = await missingBalance.balanceOfBatch(
        connectedAddress,
        tokens
      );
      setTurnOffError(false);
      setTurnoffStatus(true);

      let balances = [];

      for (let i = 0; i < 26; i++) {
        if (balance[i] == 0) {
          balances.push((i + 2).toString() + ", ");
         // console.log("Balances:", balances);
        }
        setStatus(balances);
      }
    } catch (error) {
      setTurnOffError(true);
      setTurnoffStatus(false);
      console.log("Error:", error);
    }
  };

  /*
  //Read to See how many tokens
  const { data: totalNFTOwned } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    functionName: "balanceOfBatch",
    args: [connectedAddress, tokens],
  });
  

  //Check Balance
  const claimed = async () => {
    setTurnoffStatus(true);

    console.log("Address:", address);
    console.log("Total NFT Owned:", totalNFTOwned);

    let balances = [];
    for (let i = 0; i < 25; i++) {
      if (isConnected) {
        if (totalNFTOwned[i] == 0) {
          balances.push((i + 2).toString() + ", ");
          console.log("Balances:", balances);
        }
        setStatus(balances);
      }
    }

    if (isConnected) {
      if (balances.length > 0) {
        console.log("Get to checking");
      } else {
        console.log("Good to go!");
      }
    } else {
      console.log("connect wallet");
    }
  };
  */

  // Group Click Function
  const mergeToken = async () => {
    merge();
    setModalOnMerge(true);
    setMergeAll(true);
  };

  {
    /* 
  useEffect(() => {
    console.log("Merge");
    console.log("MergeLoading:", mergeLoading);
    console.log("MergeStarted:", mergeStarted);
    console.log("txMergeSuccess:", txMergeSuccess);
    console.log("modalOnMerge", modalOnMerge);
    console.log("MergeAll:", mergeAll);
    console.log("___________");
  }, [modalOnMerge, txMergeSuccess, mergeLoading, mergeStarted]);
  */
  }

  return (
    <section
      id="merge"
      className="bg-[url('../images/desktop/createIMG.webp')] bg-no-repeat bg-cover bg-fill bg-center pb-12 pt-20 shadow-md"
    >

      {/*   className="bg-gradient-to-b from-gray-900 to-slate-300"  */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 ">
        {/* Hero content */}
        <div className="pt-16 pb-12 md:pt-20 md:pb-10">
          {/* Section header */}

          {/* Text Header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl text-white md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
              Create the DAO{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Cube
              </span>
            </h1>

            {/* image */}
            <div className="container mx-auto max-w-md px-6">
              <div className="flex flex-col text-center items-center mx-auto mb-3 md:flex-row md:space-y-0">
                <div className="items-center justify-center drop-shadow-2xl">
                  <Image alt="DAO" src={DAO} layout="intrinsic" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col mb-12 text-center text-white font-semibold [text-shadow:_0px_0px_9px_rgb(0_0_0_/_100%)]">
                <p className=" flex text-lg items-center mx-auto max-w-md ">
                  Merge ALL 26 different DAO NFTs to create the Genesis DAO cube
                </p>
                <p className=" flex text-lg items-center mx-auto max-w-md">
                  Requires BURNING ONE of each DAO NFT
                </p>
                <p className=" flex text-smn items-center mx-auto max-w-md">
                  Only for the hardcore collectors
                </p>
              </div>

              {/* Button */}
              <div>
                <p className="text-white mx-auto max-w-xs font-semibold text-md [text-shadow:_0px_0px_9px_rgb(0_0_0_/_100%)]">
                  Merging will burn
                </p>
                <p className="text-white mx-auto max-w-xs font-semibold text-md [text-shadow:_0px_0px_9px_rgb(0_0_0_/_100%)]">
                  1 of each of your NFTs
                </p>

                <div className="flex flex-col text-white max-w-xs mx-auto items-center justify-center space-y-4  sm:max-w-none sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                  <button
                    onClick={mergeToken}
                    className="flex bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2"
                  >
                    {mergeLoading && <p> Waiting for Approval </p>}
                    {mergeStarted && !txMergeSuccess && modalOnMerge && (
                      <p className="animate-pulse"> Merging...</p>
                    )}
                    {!mergeLoading && !mergeStarted && <p>Merge NFTs</p>}
                    {txMergeSuccess && !modalOnMerge && <p>Merge NFTs</p>}
                    {txMergeSuccess && modalOnMerge && <p>Merge NFTs</p>}
                  </button>
                  {txMergeSuccess && modalOnMerge && mergeAll && (
                    <Modal
                      setModalOnMerge={setModalOnMerge}
                      setMergeAll={setMergeAll}
                      mergeData={mergeData}
                      address={address}
                    />
                  )}
                </div>

                {mergeError && (
                  <p className="text-white font-bold max-w-xs mx-auto items-center justify-center mt-3">
                    {" "}
                    You need at least one of EACH NFT to merge to the DAO Cube{" "}
                  </p>
                )}

                {/* Check the amount of tokens */}
                <div className="flex flex-col text-white max-w-xs mx-auto items-center justify-center space-y-4  sm:max-w-none  sm:justify-center sm:space-x-4 sm:space-y-0">
                  <button
                    onClick={nftOwned}
                    className="flex mt-8 bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-2"
                  >
                    {"What's Missing"}
                  </button>
                  <div className="flex mt-4 max-w-xs">
                    {turnOffStatus && <p> Token/s missing: {status}</p>}
                    {turnOffError && <p>Connect Your Wallet</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakOpen;
