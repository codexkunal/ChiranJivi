import React, { useState, useEffect } from 'react';
import { fetchAQIData } from './AqiService';
import AQICard from './AqiCard';
import { getAQILevel } from './AqiService';

const AQIButton = ({ pincode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const loadAQI = async () => {
      try {
        const data = await fetchAQIData(pincode);
        setAqiData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load AQI');
      } finally {
        setLoading(false);
      }
    };
    loadAQI();
  }, [pincode]);

  if (loading) {
    return (
      <button className="border p-2 bg-slate-200 rounded-md animate-pulse">
        Loading AQI...
      </button>
    );
  }

  if (error) {
    return (
      <button className="border p-2 bg-red-100 text-red-700 rounded-md">
        Error loading AQI
      </button>
    );
  }

  if (!aqiData) return null;

  const level = getAQILevel(aqiData.aqi);

  return (
    <>
      <button
        onClick={() => setShowCard((prev) => !prev)}  // Toggle showCard
        className={`border p-2 ${level.color} text-white rounded-md transition-all duration-300 hover:opacity-90`}
      >
        AQI: {level.text}
      </button>

      {showCard && aqiData && (
        <AQICard data={aqiData} onClose={() => setShowCard(false)} />
      )}
    </>
  );
};

export default AQIButton;
