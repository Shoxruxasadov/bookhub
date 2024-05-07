import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import CryptoJS from "crypto-js";
import AOS from "aos";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
AOS.init();

export default function App() {
  const dispatch = useDispatch();
  const Key = JSON.parse(localStorage.getItem("auth") ?? "").key

  useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get(`${process.env.REACT_APP_HOST}/myself`, { headers: { Key, Sign: CryptoJS.MD5(`GET/myself${JSON.parse(localStorage.getItem("auth") ?? "").secret}`).toString() } })
        .then((res) => dispatch({ type: "GET_USER", payload: res.data.data }))
        .catch((err) => console.log(err.response.data)),
  });

  useQuery({
    queryKey: ["books"],
    queryFn: () =>
      axios
        .get(`${process.env.REACT_APP_HOST}/books`, { headers: { Key, Sign: CryptoJS.MD5(`GET/books${JSON.parse(localStorage.getItem("auth") ?? "").secret}`).toString() } })
        .then((res) => dispatch({ type: "GET_BOOKS", payload: res.data.data }))
        .catch((err) => console.log(err.response.data)),
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer stacked />
    </BrowserRouter>
  );
}
