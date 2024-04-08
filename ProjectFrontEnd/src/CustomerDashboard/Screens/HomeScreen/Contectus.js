import React from "react";
import insta from "../../images/instagram.png";
import fb from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import Email from "../../components/email";

export default function ContactUs() {
  return (
    <div className="flex flex-col justify-between items-center p-6 md:p-12 bg-[#F6EFEA] w-full">
      <div className="flex flex-col md:flex-row justify-between items-start w-full mb-6">
        <div className="mb-6 md:mb-0">
          <div className="text-[1.3rem] font-bold text-[#504238] mb-4">IDECORE</div>
          <div className="text-l font-light text-[#504238] space-y-4 md:w-80">
            <p>
              Thank you for your interest in iDecore! We're thrilled to assist you on your journey to creating a home that reflects your unique style and preferences.
            </p>
            <p>
              Whether you have questions about our products, need help with styling advice, or require assistance with an order, we're here to help.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-[1.3rem] font-bold text-[#504238]">CUSTOMER CARE</div>
          <ul className="text-l font-light text-[#504238] list-disc ml-5">
            <li>FAQs</li>
            <li>Accessibility Statement</li>
            <li>Terms of service</li>
            <li>Privacy policy</li>
            <li>Contact us</li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="text-[1.3rem] font-bold text-[#504238]">HELP & SUPPORT</div>
          <ul className="text-l font-light text-[#504238] list-disc ml-5">
            <li>Help center</li>
            <li>Shipping info</li>
            <li>Returns</li>
            <li>How to order</li>
          </ul>
        </div>

        <div className="space-y-4">
          <div className="text-[1.3rem] font-bold text-[#504238]">CONTACT US</div>
          <p className="text-l font-light text-[#504238]">
            <a href="tel:+999-999-9999" className="no-underline text-[#504238]">Phone: 999-999-9999</a>
          </p>

          <div className="text-[1.3rem] font-bold text-[#504238]">FOLLOW US</div>
          <div className="flex gap-2">
            <img src={insta} alt="Instagram" className="w-8 h-8 rounded-full" />
            <img src={fb} alt="Facebook" className="w-8 h-8 rounded-full" />
            <img src={twitter} alt="Twitter" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="text-[1.5rem] lg:text-[2.1rem]  font-bold text-[#504238]">SIGN UP FOR ALL UPDATES</div>
        <p className="text-xl font-light text-[#504238]">
          Get 15% off your first purchase! Plus, be the first to know about sales, new product launches, and exclusive offers!
        </p>
      </div>

      <div className="flex justify-center w-full mt-4">
        <div className="w-full max-w-4xl">
          <Email />
        </div>
      </div>
    </div>
  );
}
