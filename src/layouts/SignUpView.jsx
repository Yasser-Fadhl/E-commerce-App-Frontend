import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearErrors } from "../slicers/authSlice";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { isValidEmail, LengthValidator } from "../utils/validators";
const SignUpView = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    file: "",
  });
  const onChange = (e) => {
    e.preventDefault();
    setConfirmedPassword(e.target.value);
  };

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };
  const changeOnClick = async (e) => {
    e.preventDefault();
    setErrors({});
    // console.log(
    //   SignUpValidators(name, email, password, confirmedPassword, fileName)
    // );
    if (!LengthValidator("name", name, 3, 25).status) {
      setErrors((errors) => ({
        ...errors,
        name: LengthValidator("name", name, 3, 25).message,
      }));
    }
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
    }
    if (
      !LengthValidator("Confirmed Password", confirmedPassword, 6, 25).status
    ) {
      setErrors((errors) => ({
        ...errors,
        confirmedPassword: LengthValidator(
          "Confirmed Password",
          confirmedPassword,
          6,
          25
        ).message,
      }));
    }
    if (!confirmedPassword) {
      setErrors((errors) => ({
        ...errors,
        confirmedPassword: "Please confirmed your password ",
      }));
    }
    if (confirmedPassword !== password) {
      setErrors((errors) => ({
        ...errors,
        confirmedPassword: "Password does not match",
        password: "Password does not match",
      }));
    }
    if (!fileName) {
      setErrors((errors) => ({
        ...errors,
        file: "Please upload your photo",
      }));
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", fileName);
      // setName("");
      // setEmail("");
      // setPassword("");
      dispatch(registerUser(formData));
    }
  };

  const { status, isAuthenticated, token, error } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isAuthenticated && token) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, status, isAuthenticated, error]);

  return (
    <div className="w-screen">
      <form
        method="POST"
        onSubmit={changeOnClick}
        encType="multipart/form-data"
        className="flex flex-col gap-2 xs:w-full ms:w-10/12 sm:w-1/2 xl:w-1/3  justify-center items-center mx-auto mt-32 border-2  shadow-2xl rounded-lg py-8"
      >
        <h1 className="flex items-center text-green-900 xs:text-2xl ms:text-4xl font-extrabold">
          <FaUser className="mr-2" />
          Register
        </h1>
        <p className="xs:text-lg sm:text-2xl text-green-900 text-opacity-75 font-extrabold">
          Please Create an account
        </p>

        <div className="w-10/12 flex flex-col border-0 justify-between gap-2 ">
          <div className="flex flex-col">
            <input
              type="text"
              className="text-green-900 p-2 border-green-900 border-2 rounded-lg placeholder:text-gray-700 placeholder:text-opacity-75"
              id="name"
              name="name"
              value={name}
              placeholder="Please enter you name"
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-red-700 text-sm">{errors.name && errors.name}</p>
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              className="text-green-900 p-2 border-green-900 border-2 rounded-lg placeholder:text-gray-700 placeholder:text-opacity-75"
              id="email"
              name="email"
              value={email}
              placeholder="Please enter you email"
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Please enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-red-700 text-sm">
              {errors.password && errors.password}
            </p>
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              className="text-green-900 p-2 border-green-900 border-2 rounded-lg placeholder:text-gray-700 placeholder:text-opacity-75"
              id="confirmedPassword"
              name="confirmedPassword"
              value={confirmedPassword}
              placeholder="Please confirmed your password"
              onChange={onChange}
            />
            <p className="text-red-700 text-sm">
              {errors.confirmedPassword && errors.confirmedPassword}
            </p>
          </div>

          <div className="flex flex-col mt-3 gap-2">
            <label htmlFor="file">Choose your profile picture</label>
            <input
              className=" float-right"
              type="file"
              name="avatar"
              id="file"
              onChange={onChangeFile}
            />
            <p className="text-red-700 text-sm">{errors.file && errors.file}</p>
          </div>
        </div>
        <div className="w-10/12 mt-2">
          <button
            type="submit"
            className="flex w-full justify-center xs:text-sm md:text-lg  items-center text-white  truncate  bg-green-900 hover:bg-white border-green-900 border-2 hover:border-green-900 hover:text-green-900 rounded-md p-2"
          >
            <FaSignInAlt className="text-lg mr-2" /> Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpView;
