import React ,{ lazy , Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenuCard from "./components/RestaurantMenuCard";
import userContext from "./utilis/UserContext";
// import Grocery from "./components/Grocery";

const AppLayout = () => {

  const [loggedinInfo , setLoggedinInfo] = useState()

  useEffect(() => {
    const newData = {
      name: "Soham S Shinde",
    };
    setLoggedinInfo(newData.name);
  },[]);

  return (
    <userContext.Provider
      value={{ isLoggedUser: loggedinInfo, setLoggedinInfo }}
    >
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </userContext.Provider>
  );
};



const Grocery = lazy(() =>  import("./components/Grocery") );

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Grocery loading</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenuCard />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
