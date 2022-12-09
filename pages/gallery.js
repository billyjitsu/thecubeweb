import Image from "next/image";
import { useEffect, useState } from "react";
import DAO from "../images/desktop/daocube.jpg";
import {
  useAccount,
  useConnect,
  useContract,
  useContractRead,
  useContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi";
import Card from "../components/Card.js";
//contract location
import contractInterface from "../contracts/contract.json";

const Gallery = () => {
  const [nft, setNFT] = useState([]);
  const [show, setShow] = useState(false);
  const [tknBalance, setTknBalance] = useState([]);

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
      let tokensArray = [];
      let balancesArray = [];
      for (let i = 1; i < 32; i++) {
        const userBalance = await nftMeta.balanceOf(address,i);
        if (userBalance > 0) {

        const token = await nftMeta.uri(i);

        

        console.log("UserBalance of :", i, userBalance.toString());

        const tokens = await (await fetch(token)).json();
        balancesArray.push(userBalance.toString());
        tokensArray.push(tokens);
        setShow(true);

      //   console.log("Tokens:", tokens);
      //  console.log("Name:", tokens.name);
      //  console.log("Description:", tokens.description);
      //  console.log("Attributes:", tokens.attributes[0]);
      //  console.log("Attributes:", tokens.attributes[0].trait_type);
      //  console.log("Attributes:", tokens.attributes[0].value);
        }
        
      }
      setNFT(tokensArray);
      setTknBalance(balancesArray);
     // console.log("tokensArray:", tokensArray);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Nice little and if
  // <Image src={uri.image ? uri.image : noimage '/images'}

  return (
    <section
      id="Gallery"
      className="pt-20 pb-12 px-2 bg-gradient-to-b from-mainGreen via-huePurple to-plantGreen"
    >
      <div>
        {/* card should go here */}
        <button onClick={nftOwned} className="text-black">
          click me
        </button>
      </div>

      {show && <Card nft={nft} tknBalance={tknBalance} />}
    </section>
  );
};

export default Gallery;