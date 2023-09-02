import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage} from "./pages/EventsPage";
import {HandleEvents, loader as handleLoader} from "./components/UI/HandleEvents.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, loader as contextLoader } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: contextLoader,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
      },
      {
        path: "/event/:eventId",
        element: <HandleEvents />,
        loader: handleLoader,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
