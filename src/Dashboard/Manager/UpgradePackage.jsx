import React from "react";

import { Check, Zap, Loader2 } from "lucide-react"; // Added Loader2 for loading state
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hook/UseAxiosSecure"; // Assuming this hook provides the axios instance
import UseAuth from "../../hook/UseAuth";

// --- Checkmark Feature Component ---
// NOTE: This component is currently unused but kept for completeness based on your original file.
const FeatureListItem = ({ children, isIncluded = true }) => {
  return (
    <li
      className={`flex items-start mb-3 ${
        isIncluded ? "text-gray-700" : "text-gray-400"
      }`}
    >
      <Check
        className={`w-5 h-5 mr-2 flex-shrink-0 ${
          isIncluded ? "text-green-500" : "text-gray-400"
        }`}
      />
      <span className="text-sm">{children}</span>
    </li>
  );
};

// --- Pricing Card Component ---
const PricingCard = ({
  plan,
  description,
  price,
  employeeLimit,
  features,
  isPopular = false,
  buttonText = "Choose Plan", // Changed default text for clarity
}) => {
  // --- Styling Classes ---
  const cardClasses = isPopular
    ? "bg-blue-600 text-white shadow-2xl scale-105 transition-transform duration-300"
    : "bg-white text-gray-900 shadow-xl border border-gray-200";

  const titleClasses = isPopular ? "text-white" : "text-gray-900";
  const priceClasses = isPopular ? "text-white" : "text-gray-900";
  const buttonClasses = isPopular
    ? "bg-teal-400 hover:bg-teal-300 text-blue-900 font-bold"
    : "bg-blue-600 hover:bg-blue-700 text-white font-bold";

  const axiosSecure = UseAxiosSecure();
  const { packagePrice, setPackagePrice, user } = UseAuth();
  console.log(packagePrice, user?.email);
  async function handlePayment(plan, employeeLimit, price) {
    const paymentInfo = {
      price: price,
      packageName: plan,
      employeeLimit: employeeLimit,
      email:user?.email,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res?.data?.url;
  }
  return (
    <div className={`relative p-8 rounded-2xl flex flex-col ${cardClasses}`}>
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-400 text-blue-900 text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          Most Popular
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold ${titleClasses}`}>
          {plan || "Loading..."}
        </h3>
        <p
          className={`text-sm mb-4 ${
            isPopular ? "text-blue-200" : "text-gray-500"
          }`}
        >
          {description || "A comprehensive package for your growing needs."}
        </p>
        <div className="flex items-end justify-center">
          <span className={`text-4xl font-extrabold ${priceClasses}`}>
            ${price ?? "N/A"}
          </span>
          <span
            className={`text-xl font-medium ml-2 ${
              isPopular ? "text-blue-200" : "text-gray-500"
            }`}
          >
            /employee/month
          </span>
        </div>
        <p
          className={`mt-1 text-sm ${
            isPopular ? "text-blue-200" : "text-gray-500"
          }`}
        >
          Up to {employeeLimit ?? "..."} employees
        </p>
      </div>

      {/* Features List */}
      <ul
        className={`flex-grow space-y-3 ${
          isPopular ? "text-blue-100" : "text-gray-700"
        }`}
      >
        {/* Safely map features, defaulting to an empty array if undefined */}
        {(features || []).map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check
              className={`w-5 h-5 mr-3 flex-shrink-0 ${
                isPopular ? "text-teal-400" : "text-green-500"
              }`}
            />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Action Button */}
      <div className="mt-8">
        <button
          onClick={() => handlePayment(plan, employeeLimit, price)}
          className={`w-full py-3 px-6 rounded-lg text-lg transition-colors duration-200 ${buttonClasses}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// --- Main Component: UpgradePackage ---
const UpgradePackage = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: packages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-packages"],
    queryFn: async () => {
      const result = await axiosSecure.get("/packages");
      // Assuming the result.data is an array of package objects
      return result.data;
    },
  });

  const [packagOne, packagTwo, packagThree] = packages;

  if (isLoading) {
    return (
      <section className="py-20 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">Loading pricing plans...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 text-center text-red-600">
        <p>Error loading packages: {error.message}</p>
      </section>
    );
  }

  // --- Main Content ---
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-3">
          Choose the **Perfect Plan** for Your Team
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-16">
          Start free and scale as you grow. All plans include core features with
          no hidden fees.
        </p>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
          {/* Card 1: Basic Plan */}
          <PricingCard
            plan={packagOne?.packageName}
            description={packagOne?.description}
            price={packagOne?.price}
            employeeLimit={packagOne?.employeeLimit}
            features={packagOne?.features}
            buttonText="Get Started"
          />

          {/* Card 2: Standard Plan (Most Popular) */}
          <PricingCard
            plan={packagTwo?.packageName}
            // Using packagTwo description and price instead of packagOne as in your original logic
            description={packagTwo?.description}
            price={packagTwo?.price}
            employeeLimit={10}
            features={packagTwo?.features}
            isPopular={true}
            buttonText="Go Premium"
          />

          {/* Card 3: Premium Plan */}
          <PricingCard
            plan={packagThree?.packageName}
            description={packagThree?.description}
            price={packagThree?.price}
            employeeLimit={20} // Use the correct limit from the package data
            features={packagThree?.features}
            buttonText="Contact Sales"
          />
        </div>

        {/* Fallback for no data */}
        {packages.length === 0 && !isLoading && (
          <p className="mt-8 text-xl text-red-500">
            No packages found. Please check the backend API.
          </p>
        )}
      </div>
    </section>
  );
};

export default UpgradePackage;
