const OPENCAGE_API_KEY = '57a59c0aa04743db8887eadc439b3a93';
const OPENWEATHER_API_KEY = '74287d4cffbf35f3ca7e63acdcab9fdd';

export const getAQILevel = (aqi) => {
  switch (aqi) {
    case 1:
      return {
        text: 'Good',
        color: 'bg-green-500',
        textColor: 'text-green-900',
        gradient: 'from-green-50 to-green-100',
        description: 'Air quality is satisfactory, and air pollution poses little or no risk.'
      };
    case 2:
      return {
        text: 'Fair',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-900',
        gradient: 'from-yellow-50 to-yellow-100',
        description: 'Air quality is acceptable. However, there may be a risk for some people.'
      };
    case 3:
      return {
        text: 'Moderate',
        color: 'bg-orange-500',
        textColor: 'text-orange-900',
        gradient: 'from-orange-50 to-orange-100',
        description: 'Members of sensitive groups may experience health effects.'
      };
    case 4:
      return {
        text: 'Poor',
        color: 'bg-red-500',
        textColor: 'text-red-900',
        gradient: 'from-red-50 to-red-100',
        description: 'Everyone may begin to experience health effects.'
      };
    case 5:
      return {
        text: 'Very Poor',
        color: 'bg-purple-500',
        textColor: 'text-purple-900',
        gradient: 'from-purple-50 to-purple-100',
        description: 'Health warnings of emergency conditions. Everyone is more likely to be affected.'
      };
    default:
      return {
        text: 'Unknown',
        color: 'bg-gray-500',
        textColor: 'text-gray-900',
        gradient: 'from-gray-50 to-gray-100',
        description: 'Unable to determine air quality level.'
      };
  }
};

const formatLocation = (components) => {
  const city = components.city || components.town || components.village || components.suburb;
  const state = components.state;
  const country = components.country;

  if (city && country) {
    return `${city}, ${country}`;
  } else if (state && country) {
    return `${state}, ${country}`;
  }
  return country || 'Unknown location';
};

export const fetchAQIData = async (pincode) => {
  try {
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${OPENCAGE_API_KEY}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (!geocodeData.results?.length) {
      throw new Error('Invalid pincode or location not found');
    }

    const { lat, lng } = geocodeData.results[0].geometry;
    const location = formatLocation(geocodeData.results[0].components);

    const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}`;
    const aqiResponse = await fetch(aqiUrl);
    const aqiData = await aqiResponse.json();

    if (!aqiData.list?.length) {
      throw new Error('No AQI data available for this location');
    }

    return {
      aqi: aqiData.list[0].main.aqi,
      location
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to fetch AQI data');
  }
};