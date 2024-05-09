import axiosInstance from "../api/axiosInstance";

const TransactionService = () => {
  const create = async (payload) => {
    const { data } = await axiosInstance.post("/transactions", payload);
    return data;
  };
  const getAll = async (query) => {
    const { data } = await axiosInstance.get(`/transactions`, {
      params: query,
    });
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/transactions/${id}`);
    return data;
  };

  const convertFactory = (titleFile, data) => {
    // const titleFile =

    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = titleFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = async (query) => {
    const { data } = await axiosInstance.get(`/transactions/csv`, {
      responseType: "blob",
      params: query,
    });

    // download file
    const titleFile = `wmb_transaction_from_${query.startTransDate}_to_${query.endTransDate}.csv`;
    convertFactory(titleFile, data);

    return data;
  };

  const convertToPDF = async (query) => {
    const { data } = await axiosInstance.get(`/transactions/pdf`, {
      responseType: "blob",
      params: query,
    });

    // download file
    const titleFile = `wmb_transaction_from_${query.startTransDate}_to_${query.endTransDate}.pdf`;
    convertFactory(titleFile, data);

    return data;
  };

  return {
    create,
    getAll,
    getById,
    convertToCSV,
    convertToPDF,
  };
};

export default TransactionService;
