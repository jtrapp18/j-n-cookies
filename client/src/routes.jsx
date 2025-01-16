// routes.js
import App from "./App";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "page1",
        element: <Page1 />,
      },
    ],
  },
];

export default routes;
