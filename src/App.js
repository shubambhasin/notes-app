import "./App.css";
import MyRoutes from "./utils/MyRoutes";
import { useAuth } from "./context/authContext";
import { instance } from "./api/axiosapi";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import Interceptor from './utils/Interceptors'

function App() {
  const { token } = useAuth();
  instance.defaults.headers.common["Authorization"] = token || "";
  return (
    <div className="App">
      <Interceptor/>
      <Toaster />
      <Navbar />
      <MyRoutes />
    </div>
  );
}

export default App;
