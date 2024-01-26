import { countries } from "countries-list";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveShippingInfo } from "../slicers/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const phoneRegEx = /^(\+|00)(\d{1,3})(\d{9})$/;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const validationSchema = yup.object().shape({
    address: yup.string().required("Missing address"),
    city: yup.string().required("Missing City"),
    phone: yup
      .string()
      .matches(phoneRegEx, "Phone number is not valid  (key + 9 digits)"),
  });
  const [selectedPage, setSelectedPage] = useState("Shipping");
  const selectedClass = " border-b-4 rounded-sm border-green-800 ";
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      address: "",
      city: "",
      phone: "",
      postalCode: "0000",
      country: "Sudan",
    },
  });
  console.log({ errors });
  const countriesList = Object.values(countries);
  const onSubmit = (data) => {
    dispatch(saveShippingInfo(data));
    Navigate("/order/confirm");
    console.log("data", data);
    console.log({ errors });
  };
  return (
    <>
      <span className="flex justify-around px-8 gap-2 xs:w-full ms:w-10/12 sm:w-1/2 xl:w-1/3 mx-auto mt-2 text-lg text-gray-500 font-semibold ">
        <div className={selectedClass}>Shipping</div>
        <div>Confirm Order</div>
        <div>Payment</div>
      </span>

      <form
        className="flex flex-col xs:w-full ms:w-10/12 sm:w-1/2 xl:w-1/3 mx-auto mt-10 p-4 shadow-2xl  gap-2 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors &&
          Object.values(errors).map((err, i) => (
            <div
              key={i}
              className="flex justify-between items-center text-white border-0 bg-gradient-to-b from-red-600 to-white px-2 py-2 mb-1"
            >
              <p className="">{err.message}</p>
              <div
                onClick={() => {
                  console.log(i);
                  clearErrors(
                    Object.keys(errors).filter(
                      (err) => Object.keys(errors).indexOf(err) === i
                    )
                  );
                }}
              >
                x
              </div>
            </div>
          ))}
        <h1 className="font-bold text-3xl text-center text-green-900">
          Shipping Info.
        </h1>

        <div className="flex flex-col">
          <label className="font-semibold">Address</label>
          <input
            type="text"
            {...register("address")}
            name="address"
            className=" border border-green-900 rounded-md h-8"
            placeholder=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">City</label>
          <input
            {...register("city")}
            type="text"
            name="city"
            className=" border border-green-900 rounded-md h-8"
            placeholder=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Phone No.</label>
          <input
            type="text"
            {...register("phone")}
            name="phone"
            className=" border border-green-900 rounded-md h-8"
            placeholder=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Postal Code</label>
          <input
            type="text"
            {...register("postalCode")}
            name="postalCode"
            className=" border border-green-900 rounded-md h-8"
            placeholder=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">Country</label>
          <select
            type="text"
            {...register("country")}
            name="Country"
            className=" border border-green-900 rounded-md h-8"
            placeholder=""
          >
            {countriesList.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <button
            type="submit"
            className="bg-green-900 px-4 py-2 text-white  hover:bg-gray-200 border-green-900 border-2 hover:border-green-900 hover:text-green-900 font-semibold rounded-md w-full mt-4"
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
};

export default Shipping;
