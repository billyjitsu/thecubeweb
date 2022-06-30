import { ConnectButton } from "@rainbow-me/rainbowkit";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="flex bg-transparent  py-3 px-1 justify-between w-full items-center  fixed top-0 z-50 "> {/* absolute or fixed*/}
      <div className="container px-1 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          {/* Logo - Title */}

          <Link href="/">
            <a className="text-xl font-bold text-white inline-block whitespace-nowrap uppercase ">
              NFBeez Cube
            </a>
          </Link>

          {/*  Hamburger Menu  */}
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FontAwesomeIcon
              icon={faBars}
              width="24px"
              className="text-white"
            />
          </button>
        </div>

        <div
          className={
            "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
            (navbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="nav-drop"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">
              <a
                className="py-2 text-sm uppercase px-6 font-bold leading-snug text-gray-800 lg:text-base lg:text-white hover:opacity-75 lg:px-3"
                href="#claim"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className=" leading-lg opacity-75"></i>
                <span>Claim</span>
              </a>
            </li>
            <li className="flex items-center">
              <a
                className="py-2 text-sm uppercase px-6 font-bold leading-snug text-gray-800 lg:text-base lg:text-white hover:opacity-75 lg:px-3"
                href="#break"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className=" leading-lg  opacity-75"></i>
                <span>Break</span>
              </a>
            </li>
            <li className="flex items-center">
              <a
                className="py-2 text-sm uppercase px-6 font-bold leading-snug text-gray-800 lg:text-base lg:text-white hover:opacity-75 lg:px-3"
                href="#merge"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className=" leading-lg  opacity-75"></i>
                <span>Merge</span>
              </a>
            </li>

            <li className="py-2 flex items-center mb-3 px-3 lg:mb-0 lg:px-0 lg:ml-2">
              <ConnectButton showBalance={false} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
