import axiosInstance from "../api/axiosInstance";

const TransactionService = () => {
  const create = async (payload) => {
    const { data } = await axiosInstance.post("/transactions", payload);
    return data;
  };
  const getAll = async (query) => {
    const { data } = await axiosInstance.get(`/transactions`, { params: query });
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/transactions/${id}`);
    return data;
  };

  return {
    create,
    getAll,
    getById,
  };
};

export default TransactionService;
