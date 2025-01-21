import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const [dailyTrends, setDailyTrends] = useState({}); // Stores trends for all symptoms

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/graph?pincode=110001");

        if (response.status === 200) {
          const graphData = response.data;

          // Structure the trends for each symptom
          const formattedData = {};
          Object.keys(graphData).forEach((symptom) => {
            formattedData[symptom] = graphData[symptom].map((entry) => ({
              date: entry.date,
              count: entry.count,
            }));
          });

          setDailyTrends(formattedData);
        } else {
          console.error("Failed to fetch graph data");
        }
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchData();
  }, []);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, family: "Arial, sans-serif" },
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Trend Analysis (Last 30 Days)",
        font: { size: 20, family: "Arial, sans-serif" },
        color: "#fff",
      },
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } },
    },
  };

  const colors = {
    Fever: "rgba(255, 99, 132, 1)",
    Cough: "rgba(54, 162, 235, 1)",
    "Sore Throat": "rgba(255, 159, 64, 1)",
    "Stomach Pain": "rgba(75, 192, 192, 1)",
  };

  const renderLineCharts = () =>
    Object.keys(dailyTrends).map((symptom, index) => {
      const trendData = dailyTrends[symptom];
      return (
        <div
          key={index}
          style={{
            padding: "20px",
            background: "linear-gradient(135deg, #212121, #2c2c2c)",
            borderRadius: "15px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            maxWidth: "1200px",
            margin: "20px auto",
            height: "500px",
          }}
        >
          <Line
            data={{
              labels: trendData.map((entry) => entry.date),
              datasets: [
                {
                  label: `${symptom} Trend (Last 30 Days)`,
                  data: trendData.map((entry) => entry.count),
                  borderColor: colors[symptom] || "rgba(153, 102, 255, 1)",
                  backgroundColor: `${colors[symptom] || "rgba(153, 102, 255, 1)"}80`,
                  borderWidth: 2,
                  tension: 0.3,
                  pointBackgroundColor: colors[symptom],
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: colors[symptom],
                },
              ],
            }}
            options={lineOptions}
          />
        </div>
      );
    });

  return <div className="w-full">{renderLineCharts()}</div>;
};

export default Graph;
