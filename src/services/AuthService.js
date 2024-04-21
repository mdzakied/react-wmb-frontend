import axiosInstance from "../api/axiosInstance";

const AuthService = () => {
  const login = async (payload) => {
    const { data } = await axiosInstance.post("/auth/login", payload);
    return data;
  };

  const validateToken = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/validate-token");
      return data.statusCode === 200;
    } catch (error) {
      localStorage.removeItem("user");
      return false;
    }
  };

  const registerAdmin = async (payload) => {
    const { data } = await axiosInstance.post("/auth/register/admin", payload);
    return data;
  };

  const registerCustomer = async (payload) => {
    const { data } = await axiosInstance.post("/auth/register", payload);
    return data;
  };


  return {
    login,
    validateToken,
    registerAdmin,
    registerCustomer
  };
};

export default AuthService;
