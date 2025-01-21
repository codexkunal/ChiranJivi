import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const RoomPage = () => {
    const { roomId } = useParams()
    const { backendUrl, token, getDoctorsData } = useContext(AppContext)
    const navigate = useNavigate()
    const myMEeting = async (element) => {
        const appID = 379706015;
        const serverSecret = "119cca4c741ba1b9793d16b1a933ca52";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,  Date.now().toString(),"jugraj");
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            // sharedLinks: [
            //   {
            //     name: 'Personal link',
            //     url:
            //      window.location.protocol + '//' + 
            //      window.location.host + window.location.pathname +
            //       '?roomID=' +
            //       roomId,
            //   },
            // ],
            scenario: {
             mode: ZegoUIKitPrebuilt.VideoConference,
            },
       });

    }

    // const cancelAppointment = async () => {
    //   try {
    //     const {data} = await axios.post(backendUrl+'/api/user/cancel-appointment', {roomId}, {headers: {token}})
    //     if (data.success) {
    //       toast.success(data.message)
    //       getUserAppointments()
    //       getDoctorsData()
    //       navigate('/')
          
    //     } else {
    //       toast.error(data.message)
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     toast.error(error.message)
    //   }
    // }

    return (
        <div>
           <div ref={myMEeting}/>
           {/* <div className="mt-5 flex items-center justify-center space-x-10">

          
           <div onClick={cancelAppointment} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                  className="relative overflow-hidden rounded-xl bg-red-500 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2" 
              
              >
                  Cancel Appointment
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
           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
              // onClick={}
                href="#speciality"
                className="relative overflow-hidden rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Complete Appointment
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
           </div> */}

        </div>
    )
}

export default RoomPage