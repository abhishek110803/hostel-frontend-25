import axios from "axios";
const BASE_URL = "https://nitjal.in/";
// const BASE_URL = "https://aviralsangal.in/first_year";
// const BASE_URL2 = "https://v1.nitj.ac.in/hostelsNITJ/first";

// const BASE_URL3 = "http://localhost:3213/proj/halwa/Updated_Backend_Hostels_Allotment";
// const BASE_URL4 = "https://backend.nitj.in/";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
