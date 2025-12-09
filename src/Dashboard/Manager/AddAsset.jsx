import React from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../hook/UseAxiosSecure";
import UseAuth from "../../hook/UseAuth";
import axios from "axios";

const AddAsset = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = UseAxiosSecure();
 const {user} = UseAuth();
 console.log(user);
  function addAsset(data) {
    console.log(data);
    const {
      availableQuantity,
      companyName,
      comppanyName,
      email,
      productImage,
      productName,

      productQuantity,

      productType,
    } = data;
    console.log( productType);
    const assetInfo = {
      availableQuantity,
      companyName,
      comppanyName,
      email,
      productImage,
      productName,

      productQuantity,

      productType,
    };
    axiosSecure.post("/add-asset", assetInfo).then((res) => {
      console.log(res.data);
      if (res.data) {
        console.log("user created successfully in database");
        alert("database");
      }
     

    });
  }
  return (
    <div className="bg-white p-10 md:w-1/2 mx-auto rounded-lg shadow-lg">
      <div className="flex flex-wrap gap-5 items-center w-full max-md:max-w-full mb-10">
        <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex relative flex-col justify-center self-stretch bg-gray-100 h-[70px] min-h-[70px] rounded-[16px] overflow-hidden w-[70px]">
            <div className="w-[100px] h-[100px] aspect-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 100 100"
                height={100}
                width={100}
              >
                <g clipPath="url(#clip0_2721_15386)">
                  <rect fill="#EAEFF4" height={100} width={100} />
                  <path
                    fill="#DCE8F3"
                    d="M-50 4.28715L20.8808 86L86 18.8693L-41.0227 -97L-50 4.28715Z"
                  />
                  <path
                    fill="#50FFD2"
                    d="M82.3191 48.7522C82.3191 66.7029 65.9852 81.2548 45.8364 81.2548C25.6876 81.2548 9.35376 66.7029 9.35376 48.7522C9.35376 30.8014 25.6876 16.2495 45.8364 16.2495C65.9852 16.2495 82.3191 30.8014 82.3191 48.7522Z"
                  />
                  <path
                    fill="#A9BFD0"
                    d="M45.7071 30.4947C47.9995 41.4191 41.9487 51.847 32.1922 53.7861C22.4358 55.7252 12.6682 48.4412 10.3757 37.5169C8.08326 26.5925 14.134 16.1646 23.8905 14.2255C33.647 12.2864 43.4146 19.5704 45.7071 30.4947Z"
                  />
                  <path
                    fill="#3A546A"
                    d="M31.6555 51.2282C39.6264 49.644 45.1479 40.8774 43.0788 31.0171C41.0096 21.1568 32.3982 15.1991 24.4273 16.7834C16.4563 18.3676 10.9349 27.1342 13.004 36.9945C15.0732 46.8547 23.6845 52.8125 31.6555 51.2282ZM32.1922 53.7861C41.9487 51.847 47.9995 41.4191 45.7071 30.4947C43.4146 19.5704 33.647 12.2864 23.8905 14.2255C14.134 16.1646 8.08326 26.5925 10.3757 37.5169C12.6682 48.4412 22.4358 55.7252 32.1922 53.7861Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                  <path
                    fill="#3A546A"
                    d="M40.8267 35.0677C42.2059 41.6399 38.741 47.8786 33.0877 49.0022C27.4345 50.1258 21.7335 45.7088 20.3544 39.1366C18.9752 32.5644 22.4401 26.3257 28.0933 25.2021C33.7466 24.0785 39.4475 28.4955 40.8267 35.0677Z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2721_15386">
                    <rect fill="white" height={100} width={100} />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex flex-col self-stretch my-auto min-w-[240px]">
            <div className="text-base text-gray-800">Antony P.Johnson</div>
            <div className="mt-2 text-sm text-gray-500">
              UX/UI designer, in Company Name Ltd.
            </div>
          </div>
        </div>
      </div>

      {/* Full form */}
      <form onSubmit={handleSubmit(addAsset)}>
        <fieldset className="fieldset">
          <div className="grid grid-cols-2 gap-6 mb-10">
            {/* Product Name */}
            <div id="input" className="relative">
              <input
                {...register("productName")}
                type="text"
                id="floating_outlined"
                className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                placeholder="Product Name"
              />
              <label
                htmlFor="floating_outlined"
                className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Product Name
              </label>
            </div>

            {/* Product Image */}
            <div id="input" className="relative">
              <input
                {...register("productImage")}
                type="url"
                id="floating_outlined"
                className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                placeholder="Product Image"
              />
              <label
                htmlFor="floating_outlined"
                className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Product Image
              </label>
            </div>

            {/* Product Quantity */}
            <div id="input" className="relative">
              <input
                {...register("productQuantity")}
                type="number"
                id="floating_outlined"
                className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                placeholder="Product Quantity"
              />
              <label
                htmlFor="floating_outlined"
                className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Product Quantity
              </label>
            </div>

            {/* Available Quantity */}
            <div id="input" className="relative">
              <input
                {...register("availableQuantity")}
                type="text"
                id="floating_outlined"
                className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                placeholder="Available Quantity"
              />
              <label
                htmlFor="floating_outlined"
                className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Available Quantity
              </label>
            </div>

            {/* HR Email */}
   <div id="input" className="relative">
  <input
    {...register("email")} // Register the email field correctly
    type="email"
    id="floating_outlined"
    className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
    placeholder="HR E-mail"
    defaultValue={user?.email} // Set default value as user.email
  />
  <label
    htmlFor="floating_outlined"
    className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
  >
    HR E-mail
  </label>
</div>
            {/* Company Name */}
            <div id="input" className="relative">
              <input
                {...register("companyName")}
                type="text"
                id="floating_outlined"
                className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-violet-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary- peer invalid:border-error-500 invalid:focus:border-error-500 overflow-ellipsis overflow-hidden text-nowrap pr-[48px]"
                placeholder="Company Name"
              />
              <label
                htmlFor="floating_outlined"
                className="peer-placeholder-shown:-z-10 peer-focus:z-10 absolute text-[14px] leading-[150%] text-primary peer-focus:text-primary peer-invalid:text-error-500 focus:invalid:text-error-500 duration-300 transform -translate-y-[1.2rem] scale-75 top-2 z-10 origin-[0] bg-white disabled:bg-gray-50-background- px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.2rem] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Company Name
              </label>
            </div>
          </div>
        </fieldset>

        {/* New Radio Buttons for Returnable / Non-Returnable */}
      <div className="flex items-center mb-4">
  <label htmlFor="productType" className="mr-4 text-sm text-gray-800">
    Product Type
  </label>
  <select
    {...register("productType")} // Registering with react-hook-form
    id="productType"
    className="border border-violet-200 bg-white rounded-lg px-4 py-2 text-sm"
  >
    <option value="returnable">Returnable</option>
    <option value="non-returnable">Non-Returnable</option>
  </select>
</div>


        {/* Buttons */}
        <div className="sm:flex sm:flex-row-reverse flex gap-4">
          <button
            type="submit"
            className="w-fit rounded-lg text-sm px-5 py-2 focus:outline-none h-[50px] border bg-teal-500 hover:bg-teal-600  focus:bg-teal-700 border-violet-500-violet- text-white focus:ring-4 focus:ring-violet-200 hover:ring-4 hover:ring-violet-100 transition-all duration-300"
          >
            <div className="flex gap-2 items-center">Add Asset</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
