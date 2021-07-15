import { instance } from "../api/axiosapi";
import { notify } from "../utils/notification";
function Interceptor() {
  const addErrorInterceptor = () => {
    instance.interceptors.response.use(
      (response) => {
        if (response !== undefined) {
          // console.log("from interceptors response", response);
          return response;
        }
      },
      (error) => {
        // console.log("from interceptors error", error);
        if (error.response) {
          const code = error.response.status;
          if (code === 401) {
            console.log("Password incorrect - 401");
            notify("Password incorrect ❌");
          }

          if (code === 404) {
            // notify("Email not registered 404")
            console.log("Email not registered 404");
            notify("Email not registered, signup please ❗");
          }
          if (code === 304) {
            // notify("Email not registered 404")
            console.log("Email already registered");
            notify("Email already registered, signin or use another email ❗");
          }
        }
      }
    );
  };

  addErrorInterceptor();

  return null;
}

export default Interceptor;
