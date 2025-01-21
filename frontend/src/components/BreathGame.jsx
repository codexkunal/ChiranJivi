// import React, { useEffect, useState } from 'react';
// import { Wind } from 'lucide-react';

// const BreathJourney = () => {
//   const [breathState, setBreathState] = useState('Inhale');
//   const [scale, setScale] = useState(1);
//   const [duration, setDuration] = useState(4); // Adjustable duration for breathing in and out

//   // Function to handle the breathing animation
//   useEffect(() => {
//     let isInhale = true;
//     const interval = setInterval(() => {
//       setBreathState(isInhale ? 'Exhale' : 'Inhale');
//       setScale(isInhale ? 1 : 1.5);
//       isInhale = !isInhale;
//     }, duration * 1000);

//     return () => clearInterval(interval);
//   }, [duration]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50">
//       <div className="text-center mb-24">
//         {/* <Wind className="w-12 h-12 text-indigo-600 mb-4" /> */}
//         <h1 className="text-3xl font-bold text-gray-900">Breath Journey</h1>
//         <p className="text-gray-600">Regulate your breathing for relaxation and focus.</p>
//       </div>

//       {/* Expanding and Contracting Circle */}
//       <div className="relative flex items-center justify-center h-64 w-64">
//         <div
//           className={`absolute bg-indigo-300 rounded-full transition-transform duration-1000`}
//           style={{
//             width: '100%',
//             height: '100%',
//             transform: `scale(${scale})`,
//           }}
//         >
//           <div className="flex items-center justify-center h-full">
//             <h2 className="text-xl font-semibold text-white">{breathState}</h2>
//           </div>
//         </div>
//       </div>

//       {/* Instructions and Settings */}
//       <div className="mt-8 text-center mt-24">
//         <p className="text-gray-700 mb-4">Follow the expanding circle to regulate your breath.</p>
//         <div className="flex items-center justify-center gap-4">
//           <label className="text-gray-600 font-medium">Breath Duration:</label>
//           <input
//             type="range"
//             min="3"
//             max="8"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             className="w-40"
//           />
//           <span className="text-gray-900">{duration} seconds</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BreathJourney;





import React, { useEffect, useState } from 'react';

const BreathJourney = () => {
  const [breathState, setBreathState] = useState('Inhale');
  const [scale, setScale] = useState(1);
  const [duration, setDuration] = useState(3); // Adjustable duration for breathing in and out

  // Function to handle the breathing animation
  useEffect(() => {
    let isInhale = true;
    const interval = setInterval(() => {
      setBreathState(isInhale ? 'Exhale' : 'Inhale');
      setScale(isInhale ? 1 : 1.5);
      isInhale = !isInhale;
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50">
      <div className="text-center mb-24">
        <h1 className="text-3xl font-bold text-gray-900">Breath Journey</h1>
        <p className="text-gray-600">Regulate your breathing for relaxation and focus.</p>
      </div>

      {/* Expanding and Contracting Circle */}
      <div className="relative flex items-center justify-center h-64 w-64">
        <div
          className="absolute rounded-full transition-transform duration-1000  mb-16"
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${scale})`,
            backgroundColor: breathState === 'Inhale' ? '#75cde7' : '#eb7c7c', // Change color based on breathState
          }}
        >
          <div className="flex items-center justify-center h-full">
            <h2 className="text-xl font-semibold text-white">{breathState}</h2>
          </div>
        </div>
      </div>

      {/* Instructions and Settings */}
      <div className="mt-8 text-center mt-24">
        <p className="text-gray-700 mb-4">Follow the expanding circle to regulate your breath.</p>
        <div className="flex items-center justify-center gap-4">
          <label className="text-gray-600 font-medium">Breath Duration:</label>
          <input
            type="range"
            min="3"
            max="8"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-40"
          />
          <span className="text-gray-900">{duration} seconds</span>
        </div>
      </div>
    </div>
  );
};

export default BreathJourney;
