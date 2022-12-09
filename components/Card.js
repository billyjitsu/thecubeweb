import React from "react";

const Card = ({ nft, tknBalance }) => {
  // console.log("NFT:", nft);
  // console.log("Balance:", tknBalance);
  return (
    <div className="flex flex-wrap p-10 space-x-5 space-y-3">
      {nft &&
        nft.map((data, key) => (
          <div
            className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-400"
            key={key}
          >
            <img className="w-full" src={data.image} alt="Image" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 justify-between">
                {data.name}
              </div>
              <div className="text-md text-black">Owned: {tknBalance[key]}</div>

              <a
                href={data.external_url}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-75 text-ellipsis text-md"
              >
                {data.external_url}
              </a>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Card;
