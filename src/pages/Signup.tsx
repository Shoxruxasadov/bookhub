import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";

import {
  PiUserCircle,
  PiMailbox,
  PiFolderSimpleLock,
  PiKey,
} from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";

type FormValues = {
  name: string;
  email: string;
  key: string;
  secret: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is a required"),
  email: yup.string().required("Email is a required"),
  key: yup.string().required("Key is a required"),
  secret: yup.string().required("Secret is a required"),
});

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormValues) =>
    axios
      .post(`${process.env.REACT_APP_HOST}/signup`, data)
      .then(({ data }) => {
        dispatch({ type: "GET_USER", payload: data.data })
        localStorage.setItem("auth", JSON.stringify({ key: data.data.key, secret: data.data.secret }));
        navigate("/");
        toast.success("Created Successfully", {
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
          <h1>Create an account</h1>
        </div>
        <p className="paragraph">
          Create an account to enjoy all the services without any ads for free!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="signup">
          <label htmlFor="name">
            <PiUserCircle />
            <input
              {...register("name", { required: true })}
              placeholder="Name"
              type="text"
              id="name"
            />
            <p>{errors?.name && errors.name.message}</p>
          </label>
          <label htmlFor="email">
            <PiMailbox />
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              type="email"
              id="email"
            />
            <p>{errors?.email && errors.email.message}</p>
          </label>
          <label htmlFor="key">
            <PiKey />
            <input
              {...register("key", { required: true })}
              placeholder="Key"
              type="text"
              id="key"
            />
            <p>{errors?.key && errors.key.message}</p>
          </label>
          <label htmlFor="secret">
            <PiFolderSimpleLock />
            <input
              {...register("secret", { required: true })}
              placeholder="Secret"
              type="text"
              id="secret"
            />
            <p>{errors?.secret && errors.secret.message}</p>
          </label>
          <button>Sign Up</button>
        </form>
        <p className="already">
          <span>Already have an account? </span>
          <Link to={"/login"}>Log In</Link>
        </p>
      </section>
      <div className="shadow" />
      <div className="shadow" />
    </main>
  );
}
