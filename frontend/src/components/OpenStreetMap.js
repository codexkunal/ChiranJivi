// // Convert pincode to coordinates using Nominatim
// export async function getPincodeCoordinates(pincode) {
//     const response = await fetch(
//       `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=india&format=json`,
//       {
//         headers: {
//           "User-Agent": "MediConnect/1.0",
//         },
//       }
//     );
  
//     if (!response.ok) {
//       throw new Error("Failed to geocode pincode");
//     }
  
//     const data = await response.json();
//     if (!data.length) {
//       throw new Error("Pincode not found");
//     }
  
//     return {
//       lat: parseFloat(data[0].lat),
//       lon: parseFloat(data[0].lon),
//     };
//   }
  
//   // Get hospitals near coordinates using Overpass API
//   export async function getHospitalsNearby(coords, radius = 5000) {
//     const query = `
//       [out:json][timeout:25];
//       (
//         node["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
//         way["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
//         relation["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
//         node["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
//         way["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
//         relation["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
//       );
//       out body;
//       >;
//       out skel qt;
//     `;
  
//     const response = await fetch("https://overpass-api.de/api/interpreter", {
//       method: "POST",
//       body: query,
//     });
  
//     if (!response.ok) {
//       throw new Error("Failed to fetch hospitals");
//     }
  
//     const data = await response.json();
//     return data.elements.filter((el) => el.tags?.name);
//   }
  
//   // Calculate distance between two coordinates in kilometers
//   function calculateDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Earth's radius in km
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   }
  
//   // Format OSM hospital data into our Hospital interface
//   export function formatHospitalData(osmHospital, userLat, userLon) {
//     const distance = calculateDistance(userLat, userLon, osmHospital.lat, osmHospital.lon);
//     const address = [
//       osmHospital.tags["addr:street"],
//       osmHospital.tags["addr:city"],
//       osmHospital.tags["addr:postcode"],
//     ]
//       .filter(Boolean)
//       .join(", ");
  
//     return {
//       id: osmHospital.id.toString(),
//       name: osmHospital.tags.name || "Unnamed Hospital",
//       distance: parseFloat(distance.toFixed(1)),
//       address: address || "Address not available",
//       coordinates: {
//         lat: osmHospital.lat,
//         lon: osmHospital.lon,
//       },
//     };
//   }
  
// ============

// osmHelpers.js

// Function to convert pincode to coordinates
export async function getPincodeCoordinates(pincode) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=india&format=json`,
      {
        headers: {
          "User-Agent": "MediConnect/1.0",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to geocode pincode");
    }
  
    const data = await response.json();
    if (!data.length) {
      throw new Error("Pincode not found");
    }
  
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  }
  
  // Function to get hospitals nearby
  export async function getHospitalsNearby(coords, radius = 5000) {
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
        way["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
        relation["amenity"="hospital"](around:${radius},${coords.lat},${coords.lon});
        node["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
        way["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
        relation["healthcare"="hospital"](around:${radius},${coords.lat},${coords.lon});
      );
      out body;
      >;
      out skel qt;
    `;
  
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch hospitals");
    }
  
    const data = await response.json();
    return data.elements.filter((el) => el.tags?.name);
  }
  
  // Function to calculate distance
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  // Function to format hospital data
  export function formatHospitalData(osmHospital, userLat, userLon) {
    const distance = calculateDistance(userLat, userLon, osmHospital.lat, osmHospital.lon);
    const address = [
      osmHospital.tags["addr:street"],
      osmHospital.tags["addr:city"],
      osmHospital.tags["addr:postcode"],
    ]
      .filter(Boolean)
      .join(", ");
  
    return {
      id: osmHospital.id.toString(),
      name: osmHospital.tags.name || "Unnamed Hospital",
      distance: parseFloat(distance.toFixed(1)),
      address: address || "Address not available",
      coordinates: {
        lat: osmHospital.lat,
        lon: osmHospital.lon,
      },
    };
  }