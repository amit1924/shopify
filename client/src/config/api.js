const isLocal = window.location.hostname === "localhost";

const API_URL = isLocal
  ? "http://localhost:3000"
  : "https://your-deployed-domain.vercel.app"; // Replace with your real domain

export default API_URL;
