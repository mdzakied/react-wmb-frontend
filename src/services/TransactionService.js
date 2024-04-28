import axiosInstance from "../api/axiosInstance";

const TransactionService = () => {
  const getAll = async (query) => {
    const { data } = await axiosInstance.get(`/transactions`, { params: query });
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/transactions/${id}`);
    return data;
  };

  return {
    getAll,
    getById,
  };
};

export default TransactionService;
