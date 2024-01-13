import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import Icon from "@mdi/react";
import { mdiMagnify, mdiCart } from "@mdi/js";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slicers/authSlice";
import {
  fetchProducts,
  setSearchTerm,
  setPage,
} from "../slicers/productsSlice";
import TsunamiIcon from "@mui/icons-material/Tsunami";
const Navbar = () => {
  const dispatch = useDispatch();
  const [openMenue, SetOpenMenue] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { limit, page, keyword } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProducts({ limit, page, keyword }));
  };
  const onChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    dispatch(setPage(1));
  };
  const logOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <>
      <div className=" flex justify-around sm:items-center xs:flex-col sm:flex-row xs:h-40 sm:h-28 sticky bg-black px-4 py-2">
        <Link to="/">
          <div className="flex items-center">
            <TsunamiIcon className="text-white  mr-2" fontSize="large" />
            <h1 className="text-white truncate font-extrabold text-2xl ">
              Yasso Shop
            </h1>
          </div>
        </Link>

        <div className=" xs:w-1/4 md:w-1/2 justify-center sm:mr-1 md:mr-0  xs:hidden sm:flex h-10">
          <input
            type="text"
            value={keyword}
            placeholder="Find your products"
            className=" xs:text-sm md:text-md ms:basis-1/4 sm:basis-1/2 md:basis-3/4 p-2 rounded-l-md outline-none border-0"
            onChange={onChange}
          />
          <button
            type="button"
            className=" xs:text-sm md:text-lg p-2  text-white font-semibold bg-green-900 hover:bg-white border-green-900 hover:border-l-green-900 hover:border-l-2  hover:text-green-900 rounded-r-md "
            onClick={onSubmit}
          >
            <Icon path={mdiMagnify} size={1} horizontal vertical rotate={180} />
          </button>
        </div>
        {!isAuthenticated && (
          <div className="flex ms:justify-end xs:justify-start items-center gap-4">
            <Link to="/cart" className="text-white relative ">
              <div className="top-0 absolute left-5 z-50">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2  text-xs text-white">
                  {cartItems.length}
                </p>
              </div>
              <Icon
                path={mdiCart}
                size={1.3}
                horizontal
                vertical
                rotate={180}
                // className="z-10"
              />
            </Link>
            <Link to="/signin">
              <button
                type="button"
                className="flex xs:text-sm md:text-lg  items-center text-white  truncate  bg-green-900 hover:bg-white border-green-900  hover:text-green-900 rounded-md p-2"
              >
                <FaSignInAlt className="text-lg mr-2" /> Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button
                type="button"
                className=" flex xs:text-sm md:text-lg  items-center text-white bg-transparent truncate rounded-md hover:underline underline-offset-8 p-2"
              >
                <FaUser className="text-lg mr-1 hover:underline underline-offset-8" />
                Sign up
              </button>
            </Link>
          </div>
        )}
        {isAuthenticated && (
          <div className="flex ms:justify-end items-center xs:gap-2 md:gap-4">
            <h3 className="text-lg text-white">{user && user.name}</h3>
            <div className="relative">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => SetOpenMenue(!openMenue)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      user.avatar
                        ? `http://localhost:4000/users/` + user.avatar.url
                        : ""
                    }
                    alt="profile image"
                  />
                </button>
              </div>

              <div
                className={
                  openMenue
                    ? "absolute  right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    : "absolute hidden right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                }
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                >
                  Settings
                </a>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  onClick={logOut}
                >
                  Sign out
                </Link>
              </div>
            </div>
            {/* <div>
              <button
                type="button"
                className="flex xs:text-sm md:text-lg  items-center text-white  truncate  bg-green-900 hover:bg-white border-green-900  hover:text-green-900 rounded-md p-2"
                onClick={logOut}
              >
                <FaSignInAlt className="text-lg mr-2" /> Logout
              </button>
            </div> */}
          </div>
        )}
        <div className="  xs:flex xs:justify-start ms:justify-center sm:hidden">
          <input
            type="text"
            placeholder="Find your products"
            className=" xs:basis-full ms:basis-3/4 xs:text-xs xs:placeholder:p-0 pl-1 rounded-l-md outline-none border-0"
            onChange={onChange}
          />
          <button
            type="button"
            className="  sm:text-sm xs:p-1 ms:p-2 text-white font-semibold bg-green-900 hover:bg-white border-green-900 hover:border-l-green-900 hover:border-l-2  hover:text-green-900 rounded-r-md "
            onClick={onSubmit}
          >
            <Icon path={mdiMagnify} size={1} horizontal vertical rotate={180} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
