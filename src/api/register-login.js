import axios from "axios";
import { instance } from "./helper/instance";
let cancelToken;
if (typeof cancelToken != typeof undefined) {
  cancelToken.cancel("Canceling the previous request");
}
const api = {
  async register(data, setData, navigate, toast) {
    delete data.confirmPassword;
    cancelToken = axios.CancelToken.source();
    try {
      const res = await instance.post("user/create-account", data, {
        cancelToken: cancelToken.token,
      });
      setData({});
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  },
  async login(data, setData, navigate, toast) {
    try {
      cancelToken = axios.CancelToken.source();
      const res = await instance.post("user/login", data, {
        cancelToken: cancelToken.token,
      });
      setData({});
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
};

export default api;
