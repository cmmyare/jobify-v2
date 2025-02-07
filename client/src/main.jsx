import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import axios from "axios";
// const data = await axios.get("/api/v1/test")
// console.log(data)
// async function fetched() {
//   const response = await fetch("http://localhost:5100/api/v1/test");
//   const data = await response.json();
//   console.log(data);
// }
// fetched();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer position="top-center" autoClose={5000} />
  </StrictMode>
);
