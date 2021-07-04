import "./App.css";
import MyRoutes from "./utils/MyRoutes";
import { useAuth } from "./context/authContext";
import { instance } from "./api/axiosapi";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
function App() {
  const { token } = useAuth();
  instance.defaults.headers.common["Authorization"] = token || "";
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <MyRoutes />
    </div>
  );
}

export default App;
