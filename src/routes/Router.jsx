import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Vip from "../components/Vip";
import Team from "../components/Team";
import Profile from "../components/Profile";
import AppInstallIncome from "../components/App";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home/> },
      { path: "/vip", element: <Vip /> },
      { path: "/team", element: <Team /> },
      { path: "/profile", element: <Profile /> },
      { path: "/app", element: <AppInstallIncome/> },
    ],
  },
  
  
]);
