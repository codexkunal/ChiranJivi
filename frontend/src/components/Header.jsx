import React from "react";
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion"

// import {chatbot} from '../assets/assets'

const Header = () => {

  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "24/7 support",
      "expert care",
      "quick response",
      "AI assistance",
      "personalized",
    ],
    []
  );


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);


  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-700">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0.1)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center min-h-[calc(100vh-6rem)] py-8">
          <div className="md:w-1/2 flex flex-col items-start justify-center space-y-8 md:pr-12">
            <div className="bg-white/10 backdrop-blur-md rounded-full py-2 px-4 border border-white/20">
              {/* <span className="text-purple-400 font-medium"> Trusted by 10,000+ Patients</span> */}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Health<br /> Your Way —
                <span className="text-rose-600 relative flex  overflow-hidden text-center md:pb-20 md:pt-2">

                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                            y: 0,
                            opacity: 1,
                          }
                          : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>
              <p className="text-lg text-purple-100 leading-relaxed max-w-xl">
                Connect with top-rated doctors for personalized care.
                Schedule appointments seamlessly and take control of your health journey.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">👨‍⚕️</div>
                <div className="text-white font-semibold">500+ Doctors</div>
                <div className="text-purple-200 text-sm">Verified Specialists</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">🏥</div>
                <div className="text-white font-semibold">Check your medicine</div>
                <div className="text-purple-200 text-sm">Get medicine info</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">⭐️</div>
                <div className="text-white font-semibold">Virtual Doctor</div>
                <div className="text-purple-200 text-sm">One on One Patient Reviews</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">🕒</div>
                <div className="text-white font-semibold">24/7 Support</div>
                <div className="text-purple-200 text-sm">Always Available</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#speciality"
                className="relative overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-bold text-purple-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Appointment
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="absolute -inset-4">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-2xl blur-2xl" />
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-800/90 to-indigo-800/90 p-1">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                    src={assets.header_img}
                    alt="Professional doctor consultation"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent" />
                </div>
              </div>

              <div className="absolute -bottom-4 left-4 bg-white rounded-lg shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-gray-800 font-medium">Live Consultations Available</p>
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  Connect with doctors in real-time
                </p>
              </div>






              <div className="w-16 rounded-full overflow-hidden" style={{ position: "fixed", top: "42rem", left: "83%" }}>
                <Link to="/chatbot">
                  <img className="rounded-full" src={assets.chatbot} alt="chatbot" />
                </Link>
              </div>








            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
