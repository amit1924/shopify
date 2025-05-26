const isLocal = window.location.hostname === "localhost";

const API_URL = isLocal
  ? "http://localhost:3000"
  : "https://shopify-theta-mauve.vercel.app";

export default API_URL;
