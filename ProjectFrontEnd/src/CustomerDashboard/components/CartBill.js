import React, { useState } from "react";
import DiscountDropdown from "./DiscountDropdown";
import fakeDiscounts from "./fakeDiscount";

const Bill = ({ items, onClose, onConfirm }) => {
  const [showBill, setShowBill] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null); // State for selected discount

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGST = () => {
    return calculateTotal() * 0.12;
  };

  const calculateGrandTotal = () => {
    let total = calculateTotal();
    if (selectedDiscount) {
      total *= 1 - selectedDiscount.discount;
    }
    return total + calculateGST();
  };

  const handleDiscountSelect = (discount) => {
    setSelectedDiscount(discount);
    setShowBill(false); 
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
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Product</th>
                <th className="text-left">Price</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <div className="flex justify-between">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (12%):</span>
              <span>${calculateGST().toFixed(2)}</span>
            </div>
            {selectedDiscount && (
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>{selectedDiscount.discount}</span>
              </div>
            )}
           
            <div className="flex justify-between font-semibold">
              <span>Grand Total:</span>
              <span>${calculateGrandTotal().toFixed(2)}</span>
            </div>
           
          </div>
        </div>
        <div className="my-4 flex justify-end">
              <button
                className="px-2 py-1  border-0  border-green-00 text-green-700 rounded-md mr-0"
                onClick={() => setShowBill(true)}
              >
                Avail Discount
              </button>
            </div>
        <div className=" flex justify-end">
        
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={onConfirm}
          >
            Confirm Payment
          </button>
        </div>
      </div>
      {showBill && (
        <DiscountDropdown
          discounts={fakeDiscounts}
          onSelect={handleDiscountSelect}
        />
      )}
    </div>
  );
};

export default Bill;
