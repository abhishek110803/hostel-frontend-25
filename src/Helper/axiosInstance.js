import axios from "axios";

const BASE_URL = "https://aviralsangal.in/first_year";
const BASE_URL2 = "https://v1.nitj.ac.in/hostelsNITJ/first";

const BASE_URL3 = "http://localhost/hostel-backend/";
const BASE_URL4 = "https://backend.nitj.in/";



const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL3;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
