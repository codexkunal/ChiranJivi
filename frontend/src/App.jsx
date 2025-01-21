import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MedicineScanner from "./components/MedicineScanner";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Appointment from "./pages/Appointment";
import MyProfile from "./pages/MyProfile";
import VideoSection from "./components/VideoSection";
import GameSection from "./components/wellness_games";
import BookSection from "./components/wellness_book";
// import    BreathGame     from "./components/BreathGame"
import VideoChat from "./pages/VideoChat";
import RoomPage from "./pages/room";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import MyAppointments from "./pages/MyAppointments";

import BreathJourney from "./components/BreathGame";
import MemoryGarden from "./components/MemoryGarden";
import ZenPatterns from "./components/ZenPattern";
import FocusFlow from "./components/FocusFlow";

import ChatBot from "./components/ChatBot";
import LangflowChat from "./pages/LangflowChat"; 
import SearchNearby from "./components/SearchNearby"
import  Hospitals  from "./components/Hospitals";





export default function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicinescanner" element={<MedicineScanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/my-profile" element={<MyProfile />} />

        <Route path="/videos" element={<VideoSection />} />
        <Route path="/wellness_books" element={<BookSection />} />
        <Route path="/wellness_games" element={<GameSection />} />
        <Route path="/breath_game" element={< BreathJourney/>} />
        <Route path="/memorygarden_game" element={< MemoryGarden/>} />
        <Route path="/zen_patterns" element={< ZenPatterns/>} />
        <Route path="/focus_flow" element={< FocusFlow/>} />
        <Route path="/video-chat" element={<VideoChat />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/serchNearby" element={<SearchNearby/>} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/chatbot" element={<LangflowChat/>} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/hospitals" element={<Hospitals/>}/>
        
       </Routes> 
       {/* <Footer />  */}
      <Footer />

    </div>
  )
}



