import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
// import Main from "../layout/Main";
// import Home from "../pages/home/Home";
// import Menu from "../pages/shop/Menu";
// import UpdateProfile from "../pages/dashboard/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: (
          <Menu />
          //{" "}
        ),
      },
      {
        path: "/cart-page",
        element: <CartPage />,
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRouter>
            <UpdateProfile />
            //{" "}
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
    ],
    // ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      // {
      //   path: "add-menu",
      //   element: <AddMenu />,
      // },
      // {
      //   path: "manage-items",
      //   element: <ManageItems />,
      // },
      // {
      //   path: "update-menu/:id",
      //   element: <UpdateMenu />,
      //   loader: ({ params }) =>
      //     fetch(`https://foodi-server.onrender.com/menu/${params.id}`),
      // },
      // {
      //   path: "bookings",
      //   element: <ManageBookings />,
      // },
    ],
  },
]);

export default router;
