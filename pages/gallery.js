import Nav from "../components/Nav";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContract,
  useProvider,
} from "wagmi";
import Card from "../components/Card.js";
//contract location
import contractInterface from "../contracts/contract.json";


const Gallery = () => {
  const [nft, setNFT] = useState([]);
  const [show, setShow] = useState(false);
  const [tknBalance, setTknBalance] = useState([]);
  const [loading, setLoading] = useState(false);

  //get Address
  const { address } = useAccount();

  const provider = useProvider();
  //Using useContract only (insteas of useContractRead constant feed)
  const nftMeta = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    signerOrProvider: provider,
  });

  // Function to capture
  //Check Balance
  const nftOwned = async () => {
    try {
      //go through the array of tokens
      console.log("clicked");
      setLoading(true);
      let tokensArray = [];
      let balancesArray = [];
      for (let i = 1; i < 32; i++) {
        const userBalance = await nftMeta.balanceOf(address, i);
        if (userBalance > 0) {
        //  console.log("i", i);
          const token = await nftMeta.uri(i);

          console.log("UserBalance of :", i, userBalance.toString());

          const tokens = await (await fetch(token)).json();
          // const tokens = await fetch(token);
          // console.log({ tokens});
          // const json = await tokens.json();
          // console.log({ json })
          balancesArray.push(userBalance.toString());
          tokensArray.push(tokens);
          setShow(true);
        }
      }
      setLoading(false);
      setNFT(tokensArray);
      setTknBalance(balancesArray);
      // console.log("tokensArray:", tokensArray);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (address) {
      nftOwned();
    }
  }, [address]);

  // Nice little and if
  // <Image src={uri.image ? uri.image : noimage '/images'}

  return (
    <section
      id="Gallery"
      className="flex flex-col items-center pt-20 pb-12 min-h-screen bg-gradient-to-b from-mainGreen  to-huePurple"
    >
      <Nav />
      
      {loading && <div className="text-white text-center text-4xl animate-pulse">Loading...<br></br>We {"can't"} afford the graph so just chill</div>}


      {/* {address && (
      <div>
        <button onClick={nftOwned} className="text-black">
          click me
        </button>
      </div>
      )} */}
      {show && <Card nft={nft} tknBalance={tknBalance} />}

      
    </section>
  );
};

export default Gallery;
