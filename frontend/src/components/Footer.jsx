import React from "react";
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className="md:mx-10 bg-slate-100">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm pt-5 pl-12">

                {/* ---------- Left Section ---------- */}
                <div>
                    <div className="flex items-center rounded-full overflow-hidden">
                        <img className="mb-5 w-20 rounded-full overflow-hidden" src={assets.mainLogo} alt="Company Logo" style={{borderRadius: "50%", width: "5rem"}}/>
                        <p className="ml-2 text-lg font-semibold">ChiranJivi</p>
                    </div>


                    <p className="w-full md:w-2/3 text-gray-600 leading-6">
                        Our healthcare website connects you with qualified doctors for virtual consultations. You can easily schedule appointments, get personalized health advice, and access medical resources from the comfort of your home, all through a secure and user-friendly platform.
                    </p>
                </div>

                {/* ---------- Center Section ---------- */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/about" className="hover:underline">About us</a></li>
                        <li><a href="/contact" className="hover:underline">Contact us</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy policy</a></li>
                    </ul>
                </div>

                {/* ---------- Right Section ---------- */}
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Phone number</li>
                        <li>Email</li>
                    </ul>
                </div>

            </div>

            {/* ---------- Copyright Text ---------- */}
            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright © 2024 - All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;