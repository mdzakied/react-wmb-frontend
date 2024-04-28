import TransactionList from "./components/TransactionList";

export default function Transaction() {
  return (
    <>
      {/* Tittle */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Transaction</h1>
        <div className="divider-title"></div>
      </div>

      {/* Transaction List */}
      <TransactionList />
    </>
  );
}
