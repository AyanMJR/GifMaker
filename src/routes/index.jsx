import { createBrowserRouter } from "react-router-dom";
import LoginPage from "src/pages/LoginPage";
import GifCreator from "src/pages/GifCreator";
import PrivateRoute from "../components/PrivateRoute";

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/app',
    element: <PrivateRoute><GifCreator /></PrivateRoute> 
  }
])

export default AppRouter;