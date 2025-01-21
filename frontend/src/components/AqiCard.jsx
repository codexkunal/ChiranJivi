import React, { useState } from 'react';
import { getAQILevel } from './AqiService';

const AQICard = ({ data, onClose }) => {
  const level = getAQILevel(data.aqi);
  const [aqiButtonActive, setAqiButtonActive] = useState(false);


  return (
    <div className="fixed inset-0  flex items-center justify-center p-4 z-50" style={{position : "absolute", top:150, right:-500}} onClick={onClose}>
      <div 
        className={`max-w-md w-full rounded-lg p-6 bg-gradient-to-br ${level.gradient} shadow-xl`}
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-6">
          <div>
            <div className="text-sm text-gray-600 mb-1">Location</div>
            <div className="text-gray-900 font-medium">{data.location}</div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">Air Quality Index</div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${level.color} text-white shadow-sm`}>
                {level.text}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">Health Implications</div>
              <p className={`text-sm ${level.textColor}`}>
                {level.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AQICard;