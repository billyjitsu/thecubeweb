import { useState } from "react";

const Modal = ({
  setModalOn,
  setBuying,
  setClaiming,
  buyData,
  claimData,
  claimDataContract,
  setModalOnBreak,
  setBreaking,
  setBreakingSome,
  setBreakingAll,
  breakOneData,
  breakSomeData,
  breakAllData,
  setModalOnMerge,
  setMergeAll,
  mergeData,
  address,
}) => {
  //Get token ID to pass into this module

  const handleOKClick = () => {
    setModalOn(false);
    setBuying(false);
    setClaiming(false);
  };

  const handleBreakClick = () => {
    setModalOnBreak(false);
    setBreaking(false);
    setBreakingSome(false);
    setBreakingAll(false);
  };

  const handleMergeClick = () => {
    setModalOnMerge(false);
    setMergeAll(false);
  };

  return (
    <section id="Modal">
      <div className="   bg-black opacity-90 fixed inset-0 z-50   ">
        <div className="flex h-screen justify-center items-center ">
          <div className="flex-col justify-center  bg-black pt-10 pb-8 px-20 border-4 border-white rounded-xl mx-10 ">
            <div className="flex  justify-center text-lg text-white text-decoration-line: underline mb-10 ">
              Transaction Completed
            </div>

            {/* Buy Popup */}
            {buyData && (
              <p className="mb-5">
                View tx on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://gnosisscan.io/tx/${buyData?.hash}`}
                >
                  Gnosis Scan
                </a>
              </p>
            )}
            {/* {buyData && (
              <p className="mb-5">
                View Your NFT on{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://epor.io/${address}/`}
                >
                  Marketplace
                </a>
              </p>
            )} */}
            {buyData && (
              <p className="mb-10">
                See Your NFT{" "}
                <a rel="noreferrer" target="_blank" href="/gallery">
                  Collection
                </a>
              </p>
            )}

            {/* Claim Popup */}
            {claimData && (
              <p className="mb-5">
                View tx on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://gnosisscan.io/tx/${claimData}`}
                >
                  Gnosis Scan
                </a>
              </p>
            )}
            {/* {claimData && (
              <p className="mb-10">
                View your claim on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://epor.io/${address}/`}
                >
                  Marketplace
                </a>
              </p>
            )} */}

            {claimData && (
              <p className="mb-10">
                See Your NFT{" "}
                <a rel="noreferrer" target="_blank" href="/gallery">
                  Collection
                </a>
              </p>
            )}

            {/* Button to Close Modal - Claim-Buy Button */}
            {(claimData || buyData) && (
              <div className="flex flex-col  ">
                <button
                  onClick={handleOKClick}
                  className="bg-gray-700 hover:bg-gray-800 rounded-full px-12 py-2 mt-2 "
                >
                  Close
                </button>
              </div>
            )}

            {/* Break Cube Area*/}

            {/* BreakOne Popup */}
            {breakOneData && (
              <p className="mb-5">
                View tx on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://gnosisscan.io/tx/${breakOneData?.hash}`}
                >
                  Gnosis Scan
                </a>
              </p>
            )}
            {/* {breakOneData && (
              <p className="mb-5">
                View your claim on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://epor.io/${address}/`}
                >
                  Marketplace
                </a>
              </p>
            )} */}
            {breakOneData && (
              <p className="mb-10">
                See Your NFT{" "}
                <a rel="noreferrer" target="_blank" href="/gallery">
                  Collection
                </a>
              </p>
            )}

            {/* Button to Close Modal - Break 1 Button */}
            {breakOneData && (
              <div className="flex flex-col  ">
                <button
                  onClick={handleBreakClick}
                  className="bg-gray-700 hover:bg-gray-800 rounded-full px-12 py-2 mt-2 "
                >
                  Close
                </button>
              </div>
            )}

            {/* BreakSome Popup */}

            {breakSomeData && (
              <p className="mb-5">
                View tx on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://gnosisscan.io/tx/${breakSomeData?.hash}`}
                >
                  Gnosis Scan
                </a>
              </p>
            )}

            {/* {breakSomeData && (
              <p className="mb-5">
                View your claim on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://epor.io/${address}/`}
                >
                  Marketplace
                </a>
              </p>
            )} */}

            {breakSomeData && (
              <p className="mb-10">
                See Your NFT{" "}
                <a rel="noreferrer" target="_blank" href="/gallery">
                  Collection
                </a>
              </p>
            )}

            {breakSomeData && (
              <div className="flex flex-col  ">
                <button
                  onClick={handleBreakClick}
                  className="bg-gray-700 hover:bg-gray-800 rounded-full px-12 py-2 mt-2 "
                >
                  Close
                </button>
              </div>
            )}

            {/* Breall All Data */}

            {breakAllData && (
              <p className="mb-5">
                View tx on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://gnosisscan.io/tx/${breakAllData?.hash}`}
                >
                  Gnosis Scan
                </a>
              </p>
            )}

            {/* {breakAllData && (
              <p className="mb-5">
                View your claim on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://epor.io/${address}/`}
                >
                  Marketplace
                </a>
              </p>
            )} */}

            {breakAllData && (
              <p className="mb-10">
                See Your NFT{" "}
                <a rel="noreferrer" target="_blank" href="/gallery">
                  Collection
                </a>
              </p>
            )}

            {/* Button to Close Modal - Break All Button */}
            {breakAllData && (
              <div className="flex flex-col  ">
                <button
                  onClick={handleBreakClick}
                  className="bg-gray-700 hover:bg-gray-800 rounded-full px-12 py-2 mt-2 "
                >
                  Close
                </button>
              </div>
            )}

            {/* Merge Data - */}

            {mergeData && (
              <p className="mb-5">
                View tx on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://gnosisscan.io/tx/${mergeData?.hash}`}
                >
                  Gnosis Scan
                </a>
              </p>
            )}
            {/* {mergeData && (
              <p className="mb-5">
                View your claim on{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://epor.io/${address}/`}
                >
                  Marketplace
                </a>
              </p>
            )} */}
            {mergeData && (
              <p className="mb-10">
                See Your NFT{" "}
                <a rel="noreferrer" target="_blank" href="/gallery">
                  Collection
                </a>
              </p>
            )}
            {/* Button to Close Modal - Break All Button */}
            {mergeData && (
              <div className="flex flex-col  ">
                <button
                  onClick={handleMergeClick}
                  className="bg-gray-700 hover:bg-gray-800 rounded-full px-12 py-2 mt-2 "
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
