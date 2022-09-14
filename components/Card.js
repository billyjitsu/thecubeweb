import React from 'react'

const Card = ({nft}) => {
  return (
    <div className="p-10">
          <div className="max-w-xs rounded overflow-hidden shadow-lg bg-slate-400">
            <img className="w-full" src={nft.image} alt="Mountain" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{nft.name}</div>
              <p className="text-gray-700 text-base">Description: {nft.description}</p>
              <div className="border-2 my-3">
              <p className="text-gray-700 text-sm">
                Trait: {nft.attributes[0].trait_type}
              </p>
              <p className="text-gray-700 text-sm">
               Attributes: {nft.attributes[0].value}
              </p>
              </div>
              <p className="text-gray-700 text-base">{nft.external_url}</p>
            </div>
          </div>
        </div>
  )
}

export default Card