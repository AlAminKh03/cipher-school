import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import Profile from "./Components/ProfileComponets/Profile";
import UserContext from "./Components/UserContext";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import MainProfile from "./pages/MainProfile";
import myFollower from "./pages/myFollower";
import MyFollower from "./pages/myFollower";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <App />,
  },
  {
    path: "/followers",
    element: <MyFollower />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <RouterProvider router={router} />
      </UserContext>
    </QueryClientProvider>
  </React.StrictMode>
);
