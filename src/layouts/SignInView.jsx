import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loadUser, clearErrors } from "../slicers/authSlice";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { isValidEmail, LengthValidator } from "../utils/validators";
const SignInView = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    inValidUser: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
  const { status, isAuthenticated, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
      navigate("/");
    }
    if (error) {
      setErrors((errors) => {
        return { ...errors, inValidUser: error };
      });
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, status, isAuthenticated, error]);
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (!isValidEmail(email)) {
      setErrors((errors) => ({
        ...errors,
        email: "Please Enter a valid email address",
      }));
    }
    if (!LengthValidator("password", password, 6, 25).status) {
      setErrors((errors) => ({
        ...errors,
        password: LengthValidator("password", password, 6, 25).message,
      }));
    } else {
      dispatch(loginUser(formData));
      // if (error) {
      //   alert(error);}
    }
  };
  return (
    <div className="w-screen">
      <div className="flex flex-col gap-2 xs:w-full ms:w-10/12 sm:w-1/2 xl:w-1/3  justify-center items-center mx-auto mt-32 border-2  shadow-2xl rounded-lg py-8">
        <p className="text-red-700 text-lg">
          {errors.inValidUser && errors.inValidUser}
        </p>
        <h1 className="flex items-center text-green-900 xs:text-2xl ms:text-4xl font-extrabold">
          <FaUser className="mr-2" />
          Login
        </h1>
        <p className="xs:text-lg sm:text-2xl text-green-900 text-opacity-75 font-extrabold">
          Please Login to your account
        </p>

        <div className="xs:w-10/12 lg:w-8/12 flex flex-col border-0 justify-between gap-2 ">
          <div className="flex flex-col">
            <input
              type="email"
              className="text-green-900 p-2 border-green-900 border-2 rounded-lg placeholder:text-gray-700 placeholder:text-opacity-75"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
            <p className="text-red-700 text-sm">
              {errors.email && errors.email}
            </p>
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              className="text-green-900 p-2 border-green-900 border-2 rounded-lg placeholder:text-gray-700 placeholder:text-opacity-75"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
            <p className="text-red-700 text-sm">
              {errors.password && errors.password}
            </p>
          </div>
        </div>
        <div className="xs:w-10/12 lg:w-8/12 mt-2">
          <button
            type="button"
            className="flex w-full justify-center xs:text-sm md:text-lg  items-center text-white  truncate  bg-green-900 hover:bg-white border-green-900 border-2 hover:border-green-900 hover:text-green-900 rounded-md p-2"
            onClick={onSubmit}
          >
            <FaSignInAlt className="text-lg mr-2" /> Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInView;
