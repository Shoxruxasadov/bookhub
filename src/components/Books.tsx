import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Rodal from "rodal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

type FormValues = {
  isbn: string;
};

export default function Books() {
  const books = useSelector((state: RootState) => state.root.books);
  const [visibleRodal, setVisibleRodal] = useState(true);
  const { register, handleSubmit } = useForm<FormValues>();
  const Key = JSON.parse(localStorage.getItem("auth") ?? "").key;

  const onSubmit = (data: FormValues) => {
    const secret = JSON.parse(localStorage.getItem("auth") ?? "").secret;
    const Sign = CryptoJS.MD5(`POST/books${data}${secret}`).toString();

    axios
      .post(`${process.env.REACT_APP_HOST}/books`, data, {
        headers: { Key, Sign },
      })
      .then(({ data }) => {
        console.log(data);
        toast.success("Book success added", {
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
      .catch((err) =>
        toast.error(err.response.data.message, {
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
  };

  console.log(books);

  return (
    <section id="books">
      <div className="container">
        <div className="title">
          <h2>Your books</h2>
        </div>
        <div className="books">
          {books && books.length > 0 ? (
            <>
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </>
          ) : (
            <div
              className="card empty"
              onClick={() => setVisibleRodal(true)}
            ></div>
          )}
        </div>
        <Rodal visible={visibleRodal} onClose={() => setVisibleRodal(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Enter the barcode &#10088;isbn&#10089;</h3>
            <label htmlFor="isbn">
              <input
                {...register("isbn")}
                placeholder="ISBN"
                type="text"
                id="isbn"
              />
            </label>
          </form>
        </Rodal>
      </div>
    </section>
  );
}
