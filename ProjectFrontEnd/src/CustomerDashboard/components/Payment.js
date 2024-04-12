import { React, useState } from "react";
import back from "../images/back.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Buffer } from "buffer";

// import Razorpay from "react-razorpay";

// const Summary = () => {
//   const location = useLocation();
//   const { price, quantity } = location.state;

//   const subTotal = price * quantity;
//   const gst = subTotal * 0.12;
//   const total = subTotal + gst;

//   return (
//     <div className="bg-white  w-fit md:w-fit border border-gray-300 p-8 px-12 rounded-lg h-fit shadow-lg mb-4 md:mb-0">
//       <h2 className="text-xl font-bold mb-4">Summary</h2>
//       <div className="mb-4">
//         <p>
//           <span className="font-bold">Price:</span> ${price}
//         </p>
//         <p>
//           <span className="font-bold">Quantity:</span> {quantity}
//         </p>
//         <p>
//           <span className="font-bold">Subtotal:</span> ${subTotal}
//         </p>
//         <p>
//           <span className="font-bold">GST (12%):</span> ${gst}
//         </p>
//       </div>
//       <div className="mb-4 border-t pt-4">
//         <p className="font-bold">TOTAL:</p>
//         <p>${total}</p>
//       </div>
//     </div>
//   );
// };

function PaymentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mappedItems, total } = location.state;

  console.log("total : ", total);
  console.log("mappedItems : ", mappedItems);
  // console.log("quantity : ", quantity);

  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("+91 999 999 9991");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  const userToken = Cookies.get("user");

  const onPay = async () => {
    const res1 = await axios.post(
      "http://localhost:4001/checkout",
      { total },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log("res.data.amount : ", res1.data.data);

    var options = {
      key: "rzp_test_SAgvhvFFYMzPAp", // Enter the Key ID generated from the Dashboard
      amount: res1.data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: res1.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        console.log("respense bgtr: ", response);

        const body = { response };
        const data = {
          address: address,
          number: number,
          mappedItems: mappedItems,
          user: userToken,
          calculateGrandTotal: total,
        };

        const res = await axios.post(
          "http://localhost:4001/paymentVerification/",
          { body, data }
        );

        console.log("res : ", res);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
      console.log("respense : ", response);
    });

    razor.open();
    // e.preventDefault();

    // data = {razorpay_payment_id : }
    // const options = {
    //   key: "rzp_test_N48WyCaTPmLoyw", // Enter the Key ID generated from the Dashboard
    //   amount: res1.data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //   currency: "INR",
    //   name: "Acme Corp",
    //   description: "Test Transaction",
    //   image: "https://example.com/your_logo",
    //   order_id: res1.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //   callback_url: "http://localhost:4001/paymentVerification/",
    //   redirect: true,
    //   prefill: {
    //     name: "Gaurav Kumar",
    //     email: "gaurav.kumar@example.com",
    //     contact: "9000090000",
    //   },
    //   notes: {
    //     address: "Razorpay Corporate Office",
    //   },
    //   theme: {
    //     color: "#3399cc",
    //   },
    // };
    // const razor = new window.Razorpay(options);
    // razor.open();
  };
  return (
    <div className="p-8 md:justify-between ">
      <div className="flex  left-3">
        <img
          src={back}
          alt="Back"
          className="cursor-pointer w-5 left-5 h-5 mx-8 my-8 flex"
          onClick={handleBackClick}
        />
      </div>
      <div className="flex flex-col-reverse justify-center md:justify-between w-full md:flex-row">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-8 rounded shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your phone number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                onClick={onPay}
                className="bg-custom-brown hover:bg-opacity-50 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
        {/* <div className="w-full md:auto justify-self-end"> */}
        {/* <Summary price={price} quantity={quantity} /> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default PaymentForm;
