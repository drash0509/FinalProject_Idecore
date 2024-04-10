import React, { useEffect, useState } from "react";
import DiscountDropdown from "./DiscountDropdown";
import fakeDiscounts from "./fakeDiscount";
import axios from "axios";

const Bill = ({ items, onClose, onConfirm }) => {
  const [showBill, setShowBill] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [discount, setDiscount] = useState([]); // State for selected discount
  const [discountValue, setDiscountValue] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  console.log("items : ", items);

  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        const res = await axios.get("http://localhost:4001/discount");
        console.log("res.data : ", res.data);

        setDiscount(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDiscountData();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      return items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };

    const calculateGST = () => {
      return calculateTotal() * 0.12;
    };

    let discountValue = 0;
    if (selectedDiscount && calculateTotal() >= selectedDiscount.price_limit) {
      discountValue =
        (calculateTotal() * selectedDiscount.discount_limit) / 100;
    }
    if (selectedDiscount && calculateTotal() < selectedDiscount.price_limit) {
      alert("Enter a valid Coupon code");
      setCoupon(false);
    }

    setTotal(calculateTotal());
    setDiscountValue(discountValue);
  }, [items, selectedDiscount]);
  const handleDiscountSelect = async (discount) => {
    setSelectedDiscount(discount);
    setShowDropdown(false);
    setShowBill(false);

    setCoupon(true);
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  const removeCoupon = () => {
    setSelectedDiscount(null);
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
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <div className="flex justify-between">
              <span>Bag Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {selectedDiscount && coupon && (
              <div className="flex justify-between">
                <span>Coupon Savings:</span>
                <span>{`-₹${discountValue}`}</span>
              </div>
            )}
            {selectedDiscount && coupon && (
              <div className="flex justify-between">
                <div className="flex-grow"></div>
                <div className="flex justify-end">
                  <button style={{ color: "blue" }} onClick={removeCoupon}>
                    Remove
                  </button>
                </div>
              </div>
            )}

            {
              <div className="flex justify-between">
                <span>GST (12%):</span>
                <span>₹{(total * 0.12).toFixed(2)}</span>
              </div>
            }

            {total >= 500 ? (
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span>₹{0}</span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span>₹{50}</span>
              </div>
            )}

            {total >= 500 ? (
              <div className="flex justify-between font-semibold">
                <span>Grand Total:</span>
                <span>
                  ₹{(total + total * 0.12 - discountValue).toFixed(2)}
                </span>
              </div>
            ) : (
              <div className="flex justify-between font-semibold">
                <span>Grand Total:</span>
                <span>
                  ₹{(total + total * 0.12 + 50 - discountValue).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="my-4 flex justify-end">
          <button
            className="px-2 py-1  border-0  border-green-00 text-green-700 rounded-md mr-0"
            onClick={() => {
              setShowBill(true);
              setShowDropdown(true);
            }}
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
      {showDropdown && (
        <DiscountDropdown
          discounts={discount}
          onSelect={handleDiscountSelect}
          onClose={handleCloseDropdown}
        />
      )}
    </div>
  );
};

export default Bill;
