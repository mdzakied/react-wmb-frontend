import axiosInstance from "../api/axiosInstance";

const UserService = () => {
  const getAll = async (query) => {
    const { data } = await axiosInstance.get(`/users`, { params: query });
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  };

  const update = async (payload) => {
    const { data } = await axiosInstance.put("/users", payload);
    return data;
  };

  const deleteById = async (id) => {
    const { data } = await axiosInstance.delete(`/users/${id}`);
    return data;
  };

  return {
    getAll,
    getById,
    update,
    deleteById,
  };
};

export default UserService;
