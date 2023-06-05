import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import About from "../../pages/About/About";
import AddTask from "../../pages/AddTask/AddTask";
import AllTask from "../../pages/AllTask/AllTask";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import SignUp from "../../pages/SignUp/SignUp";

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
        path: "/allTask",
        element: <AllTask />,
      },
      {
        path: "/addTask",
        element: <AddTask />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
