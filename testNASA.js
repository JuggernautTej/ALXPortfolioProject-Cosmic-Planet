import axios from 'axios';

const NASA_API_KEY = 'E4driCJvjvLiVeDWik1HtrqenftyIDq75vhYNEJf';
const NASA_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=10`;

async function testNASAAPI() {
  try {
    const response = await axios.get(NASA_API_URL);
    
    // Log the response payload as JSON
    console.log('NASA API response:', JSON.stringify(response.data, null, 2));
 // Display the X-RateLimit-Remaining header
 console.log('X-RateLimit-Remaining:', response.headers['x-ratelimit-remaining']);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code outside the 2xx range
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No Response Received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
  }
}

// Call the test function
testNASAAPI();