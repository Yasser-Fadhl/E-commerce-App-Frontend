import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../slicers/authSlice";
import {
  fetchProducts,
  setSearchTerm,
  setPage,
} from "../../slicers/productsSlice";
import TsunamiIcon from "@mui/icons-material/Tsunami";
const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { limit, page, keyword } = useSelector((state) => state.products);
  // useEffect(() => {
  //   dispatch(fetchProducts({ limit, page, keyword }));
  // }, [keyword, limit, page]);
  const onSubmit = (e) => {
    e.preventDefault();
    // dispatch(setSearchTerm(e.target.value));
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
      <div className=" flex justify-around sm:items-center xs:flex-col sm:flex-row xs:h-40 sm:h-24 sticky bg-black px-4 py-2">
        <Link to="/">
          <div className="flex items-center  ">
            <TsunamiIcon className="text-white  mr-2" fontSize="large" />
            <h1 className="text-white truncate font-extrabold text-2xl ">
              Yasso Shop
            </h1>
          </div>
        </Link>

        <div className=" xs:w-1/4 md:w-1/2 justify-center sm:mr-1 md:mr-0  xs:hidden sm:flex ">
          <input
            type="text"
            value={keyword}
            placeholder="Find your products"
            className=" xs:text-sm md:text-base ms:basis-1/4 sm:basis-1/2 md:basis-3/4 p-2 rounded-l-md outline-none border-0"
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
          <div className="flex ms:justify-end xs:justify-start">
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
                className=" flex xs:text-sm md:text-lg  items-center text-white bg-transparent truncate rounded-md hover:underline underline-offset-8 ml-3 p-2"
              >
                <FaUser className="text-lg mr-1 hover:underline underline-offset-8" />
                Sign up
              </button>
            </Link>
          </div>
        )}
        {isAuthenticated && (
          <div className="flex ms:justify-end mr-2">
            <button
              type="button"
              className="flex xs:text-sm md:text-lg  items-center text-white  truncate  bg-green-900 hover:bg-white border-green-900  hover:text-green-900 rounded-md p-2"
              onClick={logOut}
            >
              <FaSignInAlt className="text-lg mr-2" /> Logout
            </button>
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
