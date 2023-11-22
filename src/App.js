import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import components
import Username from "./components/Username";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Recovery from "./components/Recovery";
import Profile from "./components/Profile";
import Password from "./components/Password";
import PageNotFound from "./components/PageNotFound";

// auth middleware
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";

// root routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Username></Username>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password></Password>
      </ProtectRoute>
    ),
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile></Profile>
      </AuthorizeUser>
    ),
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
