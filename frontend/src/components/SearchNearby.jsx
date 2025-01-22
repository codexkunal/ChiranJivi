// "use client";

import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchNearby() {
  const [pincode, setPincode] = useState("");
  const router = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pincode.trim()) {
      router(`/hospitals?pincode=${pincode}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto px-4 sm:px-0  border border-black rounded-xl mb-44 mt-28">
      <div className="relative flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter your pincode..."
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full pl-4 sm:pl-5 pr-24 sm:pr-32 h-12 sm:h-14 text-base sm:text-lg bg-background/60 backdrop-blur border-muted-foreground/20 rounded-xl sm:rounded-2xl focus-visible:ring-primary/50 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
          />
          <button
            type="submit"
            size="lg"
            className="absolute right-1 sm:right-1.5 top-1 sm:top-1.5 h-10 sm:h-11 rounded-lg sm:rounded-xl gap-1 sm:gap-2 text-sm sm:text-base font-medium hover:bg-slate-300 px-3 sm:px-4"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}




// import React, { useEffect, useState, Suspense } from "react";
// import { Search, MapPin, Hospital } from "lucide-react";
// import {
//   getPincodeCoordinates,
//   getHospitalsNearby,
//   formatHospitalData,
// } from "./OpenStreetMap";

// function HospitalSkeleton() {``
//   return (
//     <div className="group p-6 rounded-xl border bg-card animate-pulse">
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <div className="h-7 bg-muted-foreground/20 rounded w-48 mb-3" />
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-4 h-4 rounded-full bg-muted-foreground/20" />
//             <div className="h-4 bg-muted-foreground/20 rounded w-64" />
//           </div>
//           <div className="h-4 bg-muted-foreground/20 rounded w-24" />
//         </div>
//         <div className="w-32 h-9 bg-muted-foreground/20 rounded" />
//       </div>
//     </div>
//   );
// }

// export default function SearchNearbyHospitals() {
//   const [pincode, setPincode] = useState("");
//   const [hospitals, setHospitals] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!pincode.trim()) return;

//     setLoading(true);
//     setHospitals([]); // Clear previous results

//     try {
//       const coordinates = await getPincodeCoordinates(pincode);
//       console.log("Coordinates:", coordinates); // Debug log
    
//       if (!coordinates) {
//         alert("Could not find coordinates for the pincode");
//         return;
//       }
    
//       const nearbyHospitals = await getHospitalsNearby(coordinates);
//       console.log("Nearby Hospitals:", nearbyHospitals); // Debug log
    
//       const formattedHospitals = nearbyHospitals.map((hospital) =>
//         formatHospitalData(hospital, coordinates.lat, coordinates.lon)
//       );
//       setHospitals(formattedHospitals);
//     } catch (error) {
//       console.error("Error fetching hospitals:", error); // Log error
//       alert("Failed to fetch hospitals. Please try again.");
//     }    
//   };

//   return (
//     <div className="container max-w-3xl py-8 justify-center items-center mx-auto flex flex-col min-h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-xl mx-auto px-4 sm:px-0 border border-black rounded-xl mb-5"
//       >
//         <div className="relative flex items-center">
//           <div className="relative w-full">
//             <input
//               type="text"
//               placeholder="Enter your pincode..."
//               value={pincode}
//               onChange={(e) => setPincode(e.target.value)}
//               className="w-full pl-4 sm:pl-5 pr-24 sm:pr-32 h-12 sm:h-14 text-base sm:text-lg bg-background/60 backdrop-blur border-muted-foreground/20 rounded-xl sm:rounded-2xl focus-visible:ring-primary/50 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
//             />
//             <button
//               type="submit"
//               size="lg"
//               className="absolute right-1 sm:right-1.5 top-1 sm:top-1.5 h-10 sm:h-11 rounded-lg sm:rounded-xl gap-1 sm:gap-2 text-sm sm:text-base font-medium hover:bg-slate-300 px-3 sm:px-4"
//             >
//               <Search className="w-4 h-4" />
//               <span className="hidden sm:inline">Search</span>
//             </button>
//           </div>
//         </div>
//       </form>

//       <div className="md:flex md:flex-row items-center mb-6 gap-3 flex-col flex">
//         <h1 className="text-3xl md:text-4xl font-bold">Nearby Hospitals</h1>
//         <Hospital className="w-8 h-8 text-red-400 animate-pulse" />
//       </div>

//       {loading ? (
//         <div className="space-y-4">
//           <HospitalSkeleton />
//           <HospitalSkeleton />
//           <HospitalSkeleton />
//         </div>
//       ) : (
//         <div className="space-y-4 md:p-0 p-4 w-full flex-wrap">
//           {hospitals.map((hospital) => (
//             <div
//               key={hospital.id}
//               className="group p-6 rounded-xl border bg-card hover:shadow-md transition-shadow bg-slate-200"
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h3 className="text-lg font-semibold mb-2">{hospital.name}</h3>
//                   <div className="flex items-center gap-2 text-muted-foreground mb-4">
//                     <MapPin className="h-4 w-4" />
//                     <span>{hospital.address}</span>
//                   </div>
//                   <a
//                     href={`https://www.google.com/maps/search/?api=1&query=${hospital.coordinates.lat},${hospital.coordinates.lon}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-primary hover:underline"
//                   >
//                     View on map
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
