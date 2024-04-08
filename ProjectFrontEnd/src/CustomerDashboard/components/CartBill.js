import React, { useState } from "react";

const Bill = ({ items, onClose, onConfirm }) => {
  const [showBill, setShowBill] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGST = () => {
    return calculateTotal() * 0.12;
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateGST();
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
            <div className="flex justify-between font-semibold">
              <span>Grand Total:</span>
              <span>${calculateGrandTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
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
    </div>
  );
};

export default Bill;
