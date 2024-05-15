import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ChakraProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from "@chakra-ui/react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Chats from "./components/Chats";
import ChatProvider from "./context/ChatProvider";

const { Button } = chakraTheme.components;

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

const Root = () => {
  return (
    <ChatProvider>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </ChatProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/chats",
        element: <Chats />,
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);
