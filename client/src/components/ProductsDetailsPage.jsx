import { Add, LocalMall, Minimize, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProductsDetailsPage = () => {
  const [details, setDetails] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const backendURL = "http://localhost:3000/uploads";
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error when fetching data");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setDetails(data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className=" grid place-items-center lg:h-screen h-screen md:h-full bg-gradient-to-r from-gray-300 from-15% to-100% via-gray-200 to-gray-400 overflow-y-auto">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <div className=" grid lg:grid-cols-2 grid-cols-1 lg:border-l lg:border-t lg:border-b rounded-xl lg:gap-5 gap-2 w-11/12 mx-auto h-full lg:h-96 border-slate-600 ">
          <div className="details-right h-full w-full overflow-hidden">
            <img
              src={`${backendURL}/${details.image_url}`}
              alt=""
              className="h-full w-full lg:object-contain object-cover"
            />
          </div>
          <div className="detailsleft border border-slate-600 rounded-xl px-2 flex flex-col justify-center h-full w-full">
            <div className=" flex flex-col justify-between  h-full  mb-5">
            <div className="flex flex-col justify-center h-full">
              <h1 className=" font-Poppins font-extrabold uppercase my-1 bg-orange-500 inline w-fit px-2 text-gray-200 rounded-md shadow-md">
                {details.name}
              </h1>
              <p className=" text-gray-700 font-YsabeauInfant text-sm my-1">
                {details.description}
              </p>
              <p className=" font-YsabeauInfant font-extrabold mt-5 bg-gray-200 inline px-2 w-fit rounded shadow-md">
                ${details.price}.00
              </p>
            </div>
            <div className=" flex lg:flex-row flex-col items-center lg:gap-5 gap-2 mt-2 lg:mt-0">
              <div className=" flex items-center bg-gray-300  justify-between  w-full  h-10 rounded-lg">
                <Remove />
                <p>2</p>
                <Add />
              </div>
              <div className="flex items-center bg-orange-500 justify-center h-10 rounded-lg w-full gap-2">
                <LocalMall />
                <p>Add to Cart</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetailsPage;
