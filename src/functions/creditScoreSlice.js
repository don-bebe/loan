import axios from "axios";

const baseUrl = "https://loan-server-jdbs.onrender.com/score";

export async function MyCreditScore() {
  try {
    const response = await axios.get(`${baseUrl}/my`, { withCredentials: true });
    return response.data.creditScore; 
  } catch (error) {
    console.log(error);
    throw error;
  }
}
