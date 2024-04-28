import Maintenance from "@shared/components/Maintenance/Maintenance";

function Account() {
  return (
    <>
      {/* Tittle */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Account</h1>
        <div className="divider-title"></div>
      </div>

      {/* Maintenance */}
      <Maintenance />
    </>
  );
}

export default Account;
