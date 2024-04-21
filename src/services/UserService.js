import axiosInstance from "../api/axiosInstance";

const UserService = () => {
  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  };

  return {
    getById,
  };
};

export default UserService;
