# Axios Instance Configuration

This project includes a pre-configured `axiosInstance.js` file for making HTTP requests. Below are the steps to set up and use it.

## Prerequisites

1. Ensure you have a `.env` file in the root of your project.
2. Add the following environment variable to the `.env` file:

   ```env
   VITE_BASE_URL=http://localhost/hostel-backend/
   ```

   The `VITE_BASE_URL` should point to the backend server's base URL.

## axiosInstance.js

The `axiosInstance.js` file is configured to use the `VITE_BASE_URL` environment variable as its base URL. Here's the relevant code snippet:

```javascript
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default axiosInstance;
```

## Usage

You can import and use the `axiosInstance` in your project to make API requests:

```javascript
import axiosInstance from "./axiosInstance";

axiosInstance
  .get("/api/example")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Notes

- Ensure that the `.env` file is properly loaded by your build tool (e.g., Vite).
- Do not commit the `.env` file to version control to avoid exposing sensitive information.
- All `.env` variable must start from `VITE_`.
