import { motion } from "framer-motion";
import React from "react";

const BillingTypeTabs = ({ setSelectedBillingType, selectedBillingType }) => {
  return (
    <div className="flex h-16 w-[90%] flex-row gap-1 rounded-xl bg-slate-300 p-2 dark:bg-slate-700 md:w-2/3">
      <motion.button
        className="no-tap-highlight flex h-full w-1/2 items-center justify-center rounded-xl text-lg font-medium text-darkest focus:outline-none focus:ring-0 dark:text-lightest"
        animate={{
          backgroundColor:
            selectedBillingType === "monthly"
              ? "rgb(124 58 237)"
              : "rgba(124 58 237, 0)",
          color:
            selectedBillingType === "monthly"
              ? "rgb(255 255 255)"
              : "rgb(15 19 26)",
        }}
        whileHover={{ backgroundColor: "rgb(167 139 250)" }}
        transition={{ duration: 0.25, type: "tween" }}
        onClick={() => setSelectedBillingType("monthly")}
      >
        Monthly Billing
      </motion.button>
      <motion.button
        className="no-tap-highlight flex  h-full w-1/2 items-center justify-center rounded-xl text-lg font-medium text-darkest dark:text-lightest"
        animate={{
          backgroundColor:
            selectedBillingType === "annual"
              ? "rgb(124 58 237)"
              : "rgba(124 58 237, 0)",
          color:
            selectedBillingType === "annual"
              ? "rgb(255 255 255)"
              : "rgb(15 19 26)",
        }}
        whileHover={{ backgroundColor: "rgb(167 139 250)" }}
        transition={{ duration: 0.25, type: "tween" }}
        onClick={() => setSelectedBillingType("annual")}
      >
        Annual Billing
      </motion.button>
    </div>
  );
};

export default BillingTypeTabs;
