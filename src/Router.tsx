import { createBrowserRouter } from "react-router-dom";
import User from "./pages/User";

import Root from "./Root";
import ErrorComponents from "./components/ErrorComponents";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import UserDetail from "./pages/UserDetail";
import Coins from "./pages/Coins";
import CoinDetail from "./pages/CoinDetail";
import Chart from "./pages/Chart";
import Price from "./pages/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComponents />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "user/:userId",
        element: <UserDetail />,
      },
      {
        path: "coin",
        element: <Coins />,
      },
      {
        path: "coin/:coinId",
        element: <CoinDetail />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
