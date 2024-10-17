import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../contexts/AuthProvider";
import useCart from "../../hooks/useCart";

const Item = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axiosSecure.get(`/menu/${id}`);
        setItem(response.data);
        document.title = `Your Item: ${response.data.name}`; // Set document title dynamically
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [axiosSecure, id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: item._id,
        name: item.name,
        quantity: 1,
        image: item.image,
        price: item.price,
        email: user.email,
      };

      axios
        .post("https://foodi-website-sever.onrender.com/carts", cartItem)
        .then((response) => {
          if (response) {
            refetch(); // refetch cart
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Food added to the cart.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        // display: "flex-col",
        flexDirection: "column",
        // justifyContent: "space-around",
        gap: "60px",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* <h1 style={{ color: "green", marginBottom: "20px" }}>
       */}
      <h1 className="flex flex-col text-2xl font-bold mb-20px">
        😍😍😍😍 <span className="text-4xl text-orange-500">{item.name}!</span>
        😍😍😍😍
      </h1>
      <div
        to={`/menu/${item._id}`}
        className="relative shadow-xl card mt-20px"
        style={{ width: "400px", height: "400px" }}
      >
        <div className="absolute gap-1 p-4 rating right-2 top-2 heartStar bg-green"></div>
        <figure style={{ height: "60%", overflow: "hidden" }}>
          <img
            src={item.image}
            alt="Shoes"
            className="transition-all duration-300 hover:scale-105"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>
        <div className="card-body" style={{ padding: "20px" }}>
          <h2 className="card-title">
            <span className="text-blue-700">{item.name}</span>!
          </h2>
          <p className="from-neutral-600">Description : {item.recipe}</p>
          <div className="items-center justify-between mt-2 card-actions">
            <h5 className="font-semibold">
              <span className="text-sm text-black-700">Price: $ </span>{" "}
              {item.price}
            </h5>
            <button
              onClick={() => handleAddToCart(item)}
              className="text-white btn bg-green"
              style={{ padding: "10px 20px", borderRadius: "5px" }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
