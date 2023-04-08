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

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/myProfile",
    element: (
      <PrivateRoute>
        <MainProfile />
      </PrivateRoute>
    ),
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
