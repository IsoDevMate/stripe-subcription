import axios from 'axios';

const createSubscription = async (data) => {
  try {
    const response = await axios.post("http://localhost:8090/subscription-portal", data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    // You can handle the error here, for example, log it or return a custom error message.
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export default createSubscription;
