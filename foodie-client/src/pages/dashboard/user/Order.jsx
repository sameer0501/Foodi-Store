import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const Order = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `https://foodi-website-sever.onrender.com/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  // console.log(orders)

  // date format
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString(); // You can adjust options as needed
  };
  return (
    <div className="container px-4 mx-auto max-w-screen-2xl xl:px-24">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="flex flex-col items-center justify-center py-28">
          {/* content */}
          <div className="px-4 text-center space-y-7">
            <h2 className="text-4xl font-bold leading-snug md:text-5xl md:leading-snug">
              Track Your All<span className="text-green"> Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table content */}
      <div>
        {
          <div>
            <div>
              <div className="overflow-x-auto">
                <table className="table text-center">
                  {/* head */}
                  <thead className="text-white rounded-sm bg-green">
                    <tr>
                      <th>#</th>
                      <th>Order Date</th>
                      <th>transitionId</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(item.createdAt)}</td>
                        <td className="font-medium">{item.transitionId}</td>
                        <td>${item.price}</td>
                        <td>{item.status}</td>
                        <td>
                          <button className="text-orange-400 bg-transparent border-none btn btn-sm">
                            Contact
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />
          </div>
        }
      </div>
    </div>
  );
};

export default Order;
