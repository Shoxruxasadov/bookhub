import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import * as yup from "yup";
import CryptoJS from "crypto-js";

import { PiFolderSimpleLock, PiKey } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";

type FormValues = {
  key: string;
  secret: string;
};

const schema = yup.object().shape({
  key: yup.string().required("Key is a required"),
  secret: yup.string().required("Secret is a required"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormValues) =>
    axios
      .get(`${process.env.REACT_APP_HOST}/myself`, { headers: { Key: data.key, Sign: CryptoJS.MD5(`GET/myself${data.secret}`).toString() } })
      .then(({ data }) => {
        dispatch({ type: "GET_USER", payload: data.data })
        localStorage.setItem("auth", JSON.stringify({ key: data.data.key, secret: data.data.secret }));
        navigate("/");
        toast.success("Login Successfully", {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => toast.error(err.response.data.message, {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );

  return (
    <main id="auth">
      <section>
        <div className="title">
          <Link to={"/"}>
            <IoIosArrowBack />
            <span>Back</span>
          </Link>
          <h1>Welcome to back!</h1>
        </div>
        <p className="paragraph">
          Login an account to enjoy all the services without any ads for free!
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="key">
            <PiKey />
            <input
              {...register("key")}
              placeholder="Key"
              type="text"
              id="key"
            />
            <p>{errors?.key && errors.key.message}</p>
          </label>
          <label htmlFor="secret">
            <PiFolderSimpleLock />
            <input
              {...register("secret")}
              placeholder="Secret"
              type="text"
              id="secret"
            />
            <p>{errors?.secret && errors.secret.message}</p>
          </label>
          <button>Log In</button>
        </form>
        <p className="already">
          <span>Don't have an account? </span>
          <Link to={"/signup"}>Sign Up</Link>
        </p>
      </section>
      <div className="shadow" />
      <div className="shadow" />
    </main>
  );
}
