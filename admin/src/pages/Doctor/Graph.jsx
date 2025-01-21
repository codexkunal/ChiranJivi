// import React, { useEffect, useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Graph = () => {
//   const [symptomCounts, setSymptomCounts] = useState({});
//   const [dailyTrend, setDailyTrend] = useState([]);

//   useEffect(() => {
//     // Fetch Bar Chart Data
//     const fetchBarChartData = async () => {
//       try {
//         const response = await fetch('/graph.json'); // Replace with actual path
//         if (!response.ok) {
//           throw new Error('Failed to fetch graph.json');
//         }
//         const data = await response.json();

//         const counts = {};
//         data.forEach((entry) => {
//           counts[entry.symptoms] = (counts[entry.symptoms] || 0) + 1;
//         });
//         setSymptomCounts(counts);
//       } catch (error) {
//         console.error('Error fetching bar chart data:', error);
//       }
//     };

//     // Fetch Line Chart Data
//     const fetchLineChartData = async () => {
//       try {
//         const response = await fetch('/fever.json'); // Replace with actual path
//         if (!response.ok) {
//           throw new Error('Failed to fetch fever.json');
//         }
//         const data = await response.json();

//         // Generate daily trend (random count for each day)
//         const trend = data.map((entry, index) => ({
//           date: `Day ${index + 1}`,
//           count: Math.floor(Math.random() * 10) + 1, // Random count between 1 and 10
//         }));
//         setDailyTrend(trend);
//       } catch (error) {
//         console.error('Error fetching line chart data:', error);
//       }
//     };

//     fetchBarChartData();
//     fetchLineChartData();
//   }, []);

//   // Bar Chart Data
//   const barLabels = Object.keys(symptomCounts);
//   const barData = {
//     labels: barLabels,
//     datasets: [
//       {
//         label: 'Symptom Occurrences (Last 30 Days)',
//         data: Object.values(symptomCounts),
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//           'rgba(153, 102, 255, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 2,
//         hoverBackgroundColor: [
//           'rgba(75, 192, 192, 0.8)',
//           'rgba(54, 162, 235, 0.8)',
//           'rgba(255, 206, 86, 0.8)',
//           'rgba(153, 102, 255, 0.8)',
//           'rgba(255, 159, 64, 0.8)',
//         ],
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Arial, sans-serif',
//           },
//           color: '#333',
//         },
//       },
//       title: {
//         display: true,
//         text: 'Symptom Analysis (Last 30 Days)',
//         font: {
//           size: 20,
//           family: 'Arial, sans-serif',
//         },
//         color: '#444',
//         padding: {
//           top: 10,
//           bottom: 30,
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//           stepSize: 1,
//         },
//         grid: {
//           color: 'rgba(200, 200, 200, 0.2)',
//         },
//       },
//     },
//   };

//   // Line Chart Data
//   const lineLabels = dailyTrend.map((entry) => entry.date);
//   const lineData = {
//     labels: lineLabels,
//     datasets: [
//       {
//         label: 'Fever Trend (Last 30 Days)',
//         data: dailyTrend.map((entry) => entry.count),
//         borderColor: 'rgba(255, 99, 132, 1)',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderWidth: 2,
//         tension: 0.3,
//         pointBackgroundColor: 'rgba(255, 99, 132, 1)',
//         pointBorderColor: '#fff',
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
//       },
//     ],
//   };

//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Arial, sans-serif',
//           },
//           color: '#333',
//         },
//       },
//       title: {
//         display: true,
//         text: 'Fever Trend Analysis (Last 30 Days)',
//         font: {
//           size: 20,
//           family: 'Arial, sans-serif',
//         },
//         color: '#444',
//         padding: {
//           top: 10,
//           bottom: 30,
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//         grid: {
//           color: 'rgba(200, 200, 200, 0.2)',
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <div
//         style={{
//           padding: '20px',
//           background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
//           borderRadius: '15px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//           maxWidth: '800px',
//           margin: '20px auto',
//           height: '500px',
//         }}
//       >
//         <Bar data={barData} options={barOptions} />
//       </div>
//       <div
//         style={{
//           padding: '20px',
//           background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
//           borderRadius: '15px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//           maxWidth: '800px',
//           margin: '20px auto',
//           height: '500px',
//         }}
//       >
//         <Line data={lineData} options={lineOptions} />
//       </div>
//     </div>
//   );
// };

// export default Graph;




// import React, { useEffect, useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Graph = () => {
//   const [symptomCounts, setSymptomCounts] = useState({});
//   const [dailyTrend, setDailyTrend] = useState([]);
//   const [additionalTrends, setAdditionalTrends] = useState([[], [], [], []]);

//   useEffect(() => {
//     // Fetch Bar Chart Data
//     const fetchBarChartData = async () => {
//       try {
//         const response = await fetch('/graph.json'); // Replace with actual path
//         if (!response.ok) {
//           throw new Error('Failed to fetch graph.json');
//         }
//         const data = await response.json();

//         const counts = {};
//         data.forEach((entry) => {
//           counts[entry.symptoms] = (counts[entry.symptoms] || 0) + 1;
//         });
//         setSymptomCounts(counts);
//       } catch (error) {
//         console.error('Error fetching bar chart data:', error);
//       }
//     };

//     // Fetch Line Chart Data
//     const fetchLineChartData = async () => {
//       try {
//         const response = await fetch('/fever.json'); // Replace with actual path
//         if (!response.ok) {
//           throw new Error('Failed to fetch fever.json');
//         }
//         const data = await response.json();

//         // Generate daily trend (random count for each day)
//         const trend = data.map((entry, index) => ({
//           date: `Day ${index + 1}`,
//           count: Math.floor(Math.random() * 10) + 1, // Random count between 1 and 10
//         }));
//         setDailyTrend(trend);

//         // Generate additional trends for the other symptoms
//         const newTrends = [];
//         for (let i = 0; i < 4; i++) {
//           newTrends.push(
//             data.map(() => Math.floor(Math.random() * 10) + 1) // Random count for each trend
//           );
//         }
//         setAdditionalTrends(newTrends);
//       } catch (error) {
//         console.error('Error fetching line chart data:', error);
//       }
//     };

//     fetchBarChartData();
//     fetchLineChartData();
//   }, []);

//   // Bar Chart Data
//   const barLabels = Object.keys(symptomCounts);
//   const barData = {
//     labels: barLabels,
//     datasets: [
//       {
//         label: 'Symptom Occurrences (Last 30 Days)',
//         data: Object.values(symptomCounts),
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//           'rgba(153, 102, 255, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 2,
//         hoverBackgroundColor: [
//           'rgba(75, 192, 192, 0.8)',
//           'rgba(54, 162, 235, 0.8)',
//           'rgba(255, 206, 86, 0.8)',
//           'rgba(153, 102, 255, 0.8)',
//           'rgba(255, 159, 64, 0.8)',
//         ],
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Arial, sans-serif',
//           },
//           color: '#333',
//         },
//       },
//       title: {
//         display: true,
//         text: 'Symptom Analysis (Last 30 Days)',
//         font: {
//           size: 20,
//           family: 'Arial, sans-serif',
//         },
//         color: '#444',
//         padding: {
//           top: 10,
//           bottom: 30,
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//           stepSize: 1,
//         },
//         grid: {
//           color: 'rgba(200, 200, 200, 0.2)',
//         },
//       },
//     },
//   };

//   // Line Chart Data
//   const lineLabels = dailyTrend.map((entry) => entry.date);
//   const lineData = {
//     labels: lineLabels,
//     datasets: [
//       {
//         label: 'Fever Trend (Last 30 Days)',
//         data: dailyTrend.map((entry) => entry.count),
//         borderColor: 'rgba(255, 99, 132, 1)',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderWidth: 2,
//         tension: 0.3,
//         pointBackgroundColor: 'rgba(255, 99, 132, 1)',
//         pointBorderColor: '#fff',
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
//       },
//     ],
//   };

//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Arial, sans-serif',
//           },
//           color: '#333',
//         },
//       },
//       title: {
//         display: true,
//         text: 'Fever Trend Analysis (Last 30 Days)',
//         font: {
//           size: 20,
//           family: 'Arial, sans-serif',
//         },
//         color: '#444',
//         padding: {
//           top: 10,
//           bottom: 30,
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//         grid: {
//           color: 'rgba(200, 200, 200, 0.2)',
//         },
//       },
//     },
//   };

//   const symptomNames = ['Cough', 'Stomach Pain', 'Sore Throat', 'BP'];

//   const additionalLineCharts = additionalTrends.map((trend, index) => {
//     return (
//       <div
//         key={index}
//         style={{
//           padding: '20px',
//           background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
//           borderRadius: '15px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//           maxWidth: '800px',
//           margin: '20px auto',
//           height: '500px',
//         }}
//       >
//         <Line
//           data={{
//             labels: lineLabels,
//             datasets: [
//               {
//                 label: `${symptomNames[index]} Trend (Last 30 Days)`,
//                 data: trend,
//                 borderColor: `rgba(${(index + 2) * 50}, 99, 132, 1)`,
//                 backgroundColor: `rgba(${(index + 2) * 50}, 99, 132, 0.2)`,
//                 borderWidth: 2,
//                 tension: 0.3,
//                 pointBackgroundColor: `rgba(${(index + 2) * 50}, 99, 132, 1)`,
//                 pointBorderColor: '#fff',
//                 pointHoverBackgroundColor: '#fff',
//                 pointHoverBorderColor: `rgba(${(index + 2) * 50}, 99, 132, 1)`,
//               },
//             ],
//           }}
//           options={lineOptions}
//         />
//       </div>
//     );
//   });

//   return (
//     <div>
//       <div
//         style={{
//           padding: '20px',
//           background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
//           borderRadius: '15px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//           maxWidth: '800px',
//           margin: '20px auto',
//           height: '500px',
//         }}
//       >
//         <Bar data={barData} options={barOptions} />
//       </div>
//       <div
//         style={{
//           padding: '20px',
//           background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
//           borderRadius: '15px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//           maxWidth: '800px',
//           margin: '20px auto',
//           height: '500px',
//         }}
//       >
//         <Line data={lineData} options={lineOptions} />
//       </div>
//       {additionalLineCharts}
//     </div>
//   );
// };

// export default Graph;





// import React, { useEffect, useState } from 'react';
// import { Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Graph = () => {
//   const [symptomCounts, setSymptomCounts] = useState({});
//   const [dailyTrend, setDailyTrend] = useState([]);
//   const [additionalTrends, setAdditionalTrends] = useState([[], [], [], []]);

//   useEffect(() => {
//     // Fetch Bar Chart Data
//     const fetchBarChartData = async () => {
//       try {
//         const response = await fetch('/graph.json'); // Replace with actual path
//         if (!response.ok) {
//           throw new Error('Failed to fetch graph.json');
//         }
//         const data = await response.json();

//         const counts = {};
//         data.forEach((entry) => {
//           counts[entry.symptoms] = (counts[entry.symptoms] || 0) + 1;
//         });
//         setSymptomCounts(counts);
//       } catch (error) {
//         console.error('Error fetching bar chart data:', error);
//       }
//     };

//     // Fetch Line Chart Data for Fever, Cough, Stomach Pain, Sore Throat, and BP
//     const fetchLineChartData = async () => {
//       try {
//         // Replace with your actual file paths
//         const feverResponse = await fetch('/fever.json');
//         const coughResponse = await fetch('/cough.json');
//         const stomachPainResponse = await fetch('/stomachPain.json');
//         const soreThroatResponse = await fetch('/soreThroat.json');
//         const bpResponse = await fetch('/BP.json');
        
//         if (!feverResponse.ok || !coughResponse.ok || !stomachPainResponse.ok || !soreThroatResponse.ok || !bpResponse.ok) {
//           throw new Error('Failed to fetch one or more JSON files');
//         }

//         const feverData = await feverResponse.json();
//         const coughData = await coughResponse.json();
//         const stomachPainData = await stomachPainResponse.json();
//         const soreThroatData = await soreThroatResponse.json();
//         const bpData = await bpResponse.json();

//         // Prepare the daily trends from the data
//         const formatTrendData = (data) => {
//           return data.map(entry => ({
//             date: entry.date, 
//             count: entry.count
//           }));
//         };

//         setDailyTrend(formatTrendData(feverData));

//         // Prepare additional trends
//         setAdditionalTrends([
//           formatTrendData(coughData),
//           formatTrendData(stomachPainData),
//           formatTrendData(soreThroatData),
//           formatTrendData(bpData),
//         ]);
        
//       } catch (error) {
//         console.error('Error fetching line chart data:', error);
//       }
//     };

//     fetchBarChartData();
//     fetchLineChartData();
//   }, []);

//   // Bar Chart Data
//   const barLabels = Object.keys(symptomCounts);
//   const barData = {
//     labels: barLabels,
//     datasets: [
//       {
//         label: 'Symptom Occurrences (Last 30 Days)',
//         data: Object.values(symptomCounts),
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//           'rgba(153, 102, 255, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 2,
//         hoverBackgroundColor: [
//           'rgba(75, 192, 192, 0.8)',
//           'rgba(54, 162, 235, 0.8)',
//           'rgba(255, 206, 86, 0.8)',
//           'rgba(153, 102, 255, 0.8)',
//           'rgba(255, 159, 64, 0.8)',
//         ],
//       },
//     ],
//   };

//   const barOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Arial, sans-serif',
//           },
//           color: '#333',
//         },
//       },
//       title: {
//         display: true,
//         text: 'Symptom Analysis (Last 30 Days)',
//         font: {
//           size: 20,
//           family: 'Arial, sans-serif',
//         },
//         color: '#444',
//         padding: {
//           top: 10,
//           bottom: 30,
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//           stepSize: 1,
//         },
//         grid: {
//           color: 'rgba(200, 200, 200, 0.2)',
//         },
//       },
//     },
//   };

//   // Line Chart Data
//   const lineLabels = dailyTrend.map((entry) => entry.date);
//   const lineData = {
//     labels: lineLabels,
//     datasets: [
//       {
//         label: 'Fever Trend (Last 30 Days)',
//         data: dailyTrend.map((entry) => entry.count),
//         borderColor: 'rgba(255, 99, 132, 1)',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderWidth: 2,
//         tension: 0.3,
//         pointBackgroundColor: 'rgba(255, 99, 132, 1)',
//         pointBorderColor: '#fff',
//         pointHoverBackgroundColor: '#fff',
//         pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
//       },
//     ],
//   };

//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Arial, sans-serif',
//           },
//           color: '#333',
//         },
//       },
//       title: {
//         display: true,
//         text: 'Fever Trend Analysis (Last 30 Days)',
//         font: {
//           size: 20,
//           family: 'Arial, sans-serif',
//         },
//         color: '#444',
//         padding: {
//           top: 10,
//           bottom: 30,
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         ticks: {
//           color: '#333',
//           font: {
//             size: 14,
//           },
//         },
//         grid: {
//           color: 'rgba(200, 200, 200, 0.2)',
//         },
//       },
//     },
//   };

//   const additionalLineCharts = additionalTrends.map((trend, index) => {
//     const trendNames = ['Cough Trend', 'Stomach Pain Trend', 'Sore Throat Trend', 'BP Trend'];
//     return (
//       <div
//         key={index}
//         style={{
//           padding: '20px',
//           background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
//           borderRadius: '15px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//           width: '1200px', // Set the width to 1200px
//           margin: '20px auto',
//           height: '500px',
//         }}
//       >
//         <Line
//           data={{
//             labels: lineLabels,
//             datasets: [
//               {
//                 label: `${trendNames[index]} (Last 30 Days)`,
//                 data: trend.map((entry) => entry.count),
//                 borderColor: `rgba(${(index + 2) * 50}, 99, 132, 1)`,
//                 backgroundColor: `rgba(${(index + 2) * 50}, 99, 132, 0.2)`,
//                 borderWidth: 2,
//                 tension: 0.3,
//                 pointBackgroundColor: `rgba(${(index + 2) * 50}, 99, 132, 1)`,
//                 pointBorderColor: '#fff',
//                 pointHoverBackgroundColor: '#fff',
//                 pointHoverBorderColor: `rgba(${(index + 2) * 50}, 99, 132, 1)`,
//               },
//             ],
//           }}
//           options={lineOptions}
//         />
//       </div>
//     );
//   });

//   return (
//     <div>
//       <div
//         style={{
//           padding: '20px',
//           background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
//           borderRadius: '15px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//           width: '1200px', // Set the width to 1200px
//           margin: '20px auto',
//           height: '500px',
//         }}
//       >
//         <Bar data={barData} options={barOptions} />
//       </div>
//       <div
//         style={{
//           padding: '20px',
//           background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
//           borderRadius: '15px',
//           boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//           width: '1200px', // Set the width to 1200px
//           margin: '20px auto',
//           height: '500px',
//         }}
//       >
//         <Line data={lineData} options={lineOptions} />
//       </div>
//       {additionalLineCharts}
//     </div>
//   );
// };

// export default Graph;




import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import BP from '../../data/BP.json'
import cough from '../../data/cough.json'
import graph from '../../data/graph.json'
import soreThroat from '../../data/soreThroat.json'
import stomachPain from '../../data/stomachPain.json'

import fever from '../../data/fever.json'



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const [symptomCounts, setSymptomCounts] = useState({});
  const [dailyTrend, setDailyTrend] = useState([]);
  const [additionalTrends, setAdditionalTrends] = useState([[], [], [], []]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await fetch('/graph.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch graph.json');
        }
        const data =graph

        const counts = {};
        data.forEach((entry) => {
          counts[entry.symptoms] = (counts[entry.symptoms] || 0) + 1;
        });
        setSymptomCounts(counts);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    const fetchLineChartData = async () => {
      try {
        // const feverResponse = await fetch('/fever.json');
        // const coughResponse = await fetch('/cough.json');
        // const stomachPainResponse = await fetch('/stomachPain.json');
        // const soreThroatResponse = await fetch('/soreThroat.json');
        // const bpResponse = await fetch('/BP.json');
        // console.log("fffff",BP);
        
        // if (!feverResponse.ok || !coughResponse.ok || !stomachPainResponse.ok || !soreThroatResponse.ok || !bpResponse.ok) {
          // throw new Error('Failed to fetch one or more JSON files');
        // }

        // const feverData = await feverResponse.json();
        // const coughData = await coughResponse.json();
        // const stomachPainData = await stomachPainResponse.json();
        // const soreThroatData = await soreThroatResponse.json();
        // const bpData = await bpResponse.json();

        const formatTrendData = (data) => {
          return data.map(entry => ({
            date: entry.date, 
            count: entry.count
          }));
        };

        setDailyTrend(formatTrendData(fever));
        setAdditionalTrends([ 
          formatTrendData(cough),
          formatTrendData(stomachPain),
          formatTrendData(soreThroat),
          formatTrendData(BP),
        ]);
        
      } catch (error) {
        console.error('Error fetching line chart data:', error);
      }
    };

    fetchBarChartData();
    fetchLineChartData();
  }, []);

  const barLabels = Object.keys(symptomCounts);
  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Symptom Occurrences (Last 30 Days)',
        data: Object.values(symptomCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Color changed
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
          color: '#fff',  // Changed font color to white
        },
      },
      title: {
        display: true,
        text: 'Symptom Analysis (Last 30 Days)',
        font: {
          size: 20,
          family: 'Arial, sans-serif',
        },
        color: '#fff',  // Changed font color to white
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',  // Changed font color to white
        },
      },
      y: {
        ticks: {
          color: '#fff',  // Changed font color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',  // Lighter grid color
        },
      },
    },
  };

  const lineLabels = dailyTrend.map((entry) => entry.date);
  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: 'Fever Trend (Last 30 Days)',
        data: dailyTrend.map((entry) => entry.count),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        borderWidth: 2,
        tension: 0.3,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
          color: '#fff',  // Changed font color to white
        },
      },
      title: {
        display: true,
        text: 'Trend Analysis (Last 30 Days)',
        font: {
          size: 20,
          family: 'Arial, sans-serif',
        },
        color: '#fff',  // Changed font color to white
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff',  // Changed font color to white
        },
      },
      y: {
        ticks: {
          color: '#fff',  // Changed font color to white
        },
      },
    },
  };

  const additionalLineCharts = additionalTrends.map((trend, index) => {
    const trendNames = ['Cough Trend', 'Stomach Pain Trend', 'Sore Throat Trend', 'Eye Itchiness Trend'];
    const colors = [
      'rgba(54, 162, 235, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(153, 102, 255, 1)',
    ];

    return (
      <div
        key={index}
        style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #212121, #2c2c2c)',  // Dark background
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          maxWidth: '1200px',
          margin: '20px auto',
          height: '500px',
        }}
      >
        <Line
          data={{
            labels: lineLabels,
            datasets: [
              {
                label: `${trendNames[index]} (Last 30 Days)`,
                data: trend.map((entry) => entry.count),
                borderColor: colors[index],
                backgroundColor: `${colors[index]}80`,  // Transparent color for fill
                borderWidth: 2,
                tension: 0.3,
                pointBackgroundColor: colors[index],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: colors[index],
              },
            ],
          }}
          options={lineOptions}
        />
      </div>
    );
  });

  return (
    <div className=' w-full'>
      <div
        style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #212121, #2c2c2c)',  // Dark background
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          maxWidth: '1200px',
          margin: '20px auto',
          height: '500px',
        }}
      >
        <Bar data={barData} options={barOptions} />
      </div>
      <div
        style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #212121, #2c2c2c)',  // Dark background
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          maxWidth: '1200px',
          margin: '20px auto',
          height: '500px',
        }}
      >
        <Line data={lineData} options={lineOptions} />
      </div>
      {additionalLineCharts}
    </div>
  );
};

export default Graph;
