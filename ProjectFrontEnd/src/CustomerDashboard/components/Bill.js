import React, { useState } from "react";

const Bill = ({
  items,
  onClose,
  onConfirm,
  calculateTotal,
  calculateGST,
  calculateGrandTotal,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    // Logic to apply coupon and calculate discount
    // This is just a placeholder, you need to implement the actual logic
    if (couponCode === "FIRSTPURCHASE") {
      setDiscount(10); // Applying a 10% discount for demonstration
    } else {
      setDiscount(0); // No discount applied
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between border-b-2 pb-4">
          <h2 className="text-lg font-semibold">Bill Details</h2>
          <button className="text-red-500" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-4">
          {/* Dropdown for selecting coupons */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
            >
              Apply Coupon
            </button>
          </div>
          <table className="w-full">
            {/* Table body remains the same */}
          </table>
          <div className="mt-4">
            {/* Total calculation remains the same */}
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            onClick={onClose}
          >
            Cancelcsc
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={onConfirm}
          >
            Confirm Paymentff
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
