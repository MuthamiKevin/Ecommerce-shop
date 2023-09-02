import React, { useEffect, useState } from "react";
import { Delete } from "@mui/icons-material";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import io from "socket.io-client";
import { useCartcontext } from "./context/CartContex";
import { useUserContext } from "./context/UserContext";
import { Fade, Slide } from "react-awesome-reveal";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [{ itemsInCart }, dispatch] = useCartcontext();
  const [{ user }, dispatchUser] = useUserContext();
  const backendURL = "https://e-shop-xlam.onrender.com/uploads";
  const history = useHistory();

  useEffect(() => {
    const socket = io("https://e-shop-xlam.onrender.com");

    const fetchCartItems = () => {
      fetch("https://e-shop-xlam.onrender.com/product/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCartData(data);
          setLoading(false);
          dispatch({
            type: "ADD_IN_CART",
            inCart: data.length,
          });
        })
        .catch((error) => {
          setError("Failed to fetch cart items.");
          setLoading(false);
        });
    };
    // fetching initial item in the cart
    if (user) {
      fetchCartItems();
    }
    // Socket.IO event listener for cart updates

    socket.on("dataChange", (change) => {
      // Handling the change event

      if (change.type === "cartItemAdded") {
        const newItem = change.cartItem;

        setCartData((prevData) => [...prevData, newItem]);
      } else if (change.type === "cartItemDeleted") {
        const deletedItemId = change.cartItem._id;
        setCartData((prevData) =>
          prevData.filter((item) => item._id !== deletedItemId)
        );
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeFromCart = (item) => {
    fetch(`https://e-shop-xlam.onrender.com/product/cart/${item._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(() => {
        // Updating the cart data in the component state
        setCartData((prevData) =>
          prevData.filter((product) => product._id !== item._id)
        );
      })
      .catch((error) => {
        setError("Failed to remove item from the cart.");
      });
  };

  return (
    <section className="bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-10% to-100% from-yellow-200 via-red-400 to-fuchsia-500 h-screen grid place-items-center grid-cols-3">
      <div className="left col-span-2">
        <ul className=" flex flex-col gap-5 items-start overflow-y-scroll h-30 w-full scroll-smooth bg-slate-400">
          {
            cartData.length > 0 ? (
              cartData.map((item, index )=> (
                <li key={index} className=" w-full flex items-center justify-between gap-2 p-1 bg-gray-200 shadow-md rounded-md">
                  <Link
                  className=" flex items-center"
                  to={`/product/${item.item._id}`}
                >
                  <div className=" flex items-center  gap-1 lg:gap-5 w-full">
                    {/* Product image */}
                    <img
                      src={`${backendURL}/${item?.item.image_url}` || ""}
                      alt=""
                      className="h-40 w-40 object-cover bg-slate-200 rounded border"
                    />
                    <div>
                      <p className=" uppercase tracking-tighter first-letter:uppercase ">
                        {item.item.name}
                      </p>
                      <p className=" text-xs font-semibold">
                        {item.item.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}{" "}
                        x {item.quantity}{" "}
                        <strong className="text-base shadow-xl">
                          {(item.item.price * item.quantity).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          )}
                        </strong>
                      </p>
                    </div>
                  
                  </div>
                </Link>
                <div
                  onClick={() => removeFromCart(item)}
                  className="bg-gray-50 rounded-full h-10 w-10 grid place-items-center cursor-pointer"
                >
                  <Delete />
                </div>
                </li>
              ))
            ) : (
              <div className=" text-center flex flex-col items-center justify-center h-full w-full px-20">
              <p className=" text-gray-50">Your shopping cart is empty!</p>
              <button
                className=" px-10 py-2 bg-gray-200 rounded-md mt-2 hover:bg-opacity-30 hover:text-white duration-500"
              >
                Continue Shopping
              </button>
            </div>
            )
          }
        </ul>
      </div>
      <div className="right col-span-1">world</div>
      {/* <div className=" relative h-full w-full">
        {cartData.length > 0 && (
          <div className=" absolute bottom-14 z-10 w-full h-10  flex items-center justify-center hover:bg-opacity-70 bg-orange-500 delay-100 duration-150 rounded-lg">
            <button className=" w-full h-full text-ebony-50 uppercase tracking-wider font-Poppins ">Checkout</button>
          </div>
        )}
        <div className=" border-b-2 py-2 px-5 border-gray-500 ">
          <h1 className="bg-orange-500 font-Poppins font-extrabold tracking-wider  inline py-1 px-5 rounded text-gray-50">
            Cart
          </h1>
        </div>
        <Fade cascade duration={350} direction="right" className="h-full">
        <ul className="cart flex flex-col gap-5 p-1 overflow-y-scroll h-4/5">
          {cartData.length > 0 ? (
            cartData.map((item, index) => (
              <li
                key={index}
                className=" shadow-md rounded-lg cursor-default bg-orange-500 relative font-YsabeauInfant  text-ebony-50 p-0"
              >
                <Link
                  className=" flex items-center  justify-between"
                  to={`/product/${item.item._id}`}
                  onClick={() => setShowCart(false)}
                >
                  <div className=" flex items-center  gap-1 lg:gap-5">
                    <img
                      src={`${backendURL}/${item?.item.image_url}` || ""}
                      alt=""
                      className="h-20 w-20 object-cover bg-slate-200 rounded-lg"
                    />
                    <div>
                      <p className=" uppercase tracking-tighter first-letter:uppercase ">
                        {item.item.name}
                      </p>
                      <p className=" text-xs font-semibold">
                        {item.item.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}{" "}
                        x {item.quantity}{" "}
                        <strong className="text-base shadow-xl">
                          {(item.item.price * item.quantity).toLocaleString(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          )}
                        </strong>
                      </p>
                    </div>
                  </div>
                </Link>
                <div
                  onClick={() => removeFromCart(item)}
                  className="text-ebony-950 absolute lg:right-2 right-1 z-30 top-1/2 bottom-1/2 -translate-y-1/2 bg-gray-50 rounded-full h-10 w-10 grid place-items-center cursor-pointer"
                >
                  <Delete />
                </div>
              </li>
            ))
          ) : (
            <div className=" text-center flex flex-col items-center justify-center h-full">
              <p className=" text-gray-50">Your shopping cart is empty!</p>
              <button
                className=" px-10 py-2 bg-gray-200 rounded-md mt-2 hover:bg-opacity-30 hover:text-white duration-500"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </ul></Fade>
      </div> */}
    </section>
  );
};

export default Cart;
