// api.js
import axios from 'axios';

export const fetchFlights = async ({
  origin,
  destination,
  dateFrom,
  dateTo,
  adults = 1,
  children = 0,
  infants = 0,
  cabinClass = 'M',
  currency = 'EUR',
  limit = 10,
  sort = 'price',
  maxStopovers = 2,
  maxDuration = 24,
  flightType = 'oneway'
}) => {
  try {
    const response = await axios.post('https://flight-data28.p.rapidapi.com/flights/search', {
      fly_from: origin,
      fly_to: destination,
      date_from: dateFrom,
      date_to: dateTo,
      adults,
      children,
      infants,
      selected_cabins: cabinClass,
      curr: currency,
      limit,
      sort,
      max_stopovers: maxStopovers,
      max_fly_duration: maxDuration,
      flight_type: flightType,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'flight-data28.p.rapidapi.com',
        'x-rapidapi-key': '138fa183bdmsha7fe6fbb92eb404p1351a3jsn41dd6bcf2982'
      }
    });

    return response.data.data || [];
  } catch (error) {
    console.error('API Error:', error.message);
    return [];
  }
};
