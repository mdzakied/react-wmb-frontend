import Maintenance from "@shared/components/Maintenance/Maintenance";

function Dashboard() {
  return (
    <>
      {/* Tittle */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
        <div className="divider-title"></div>
      </div>

      {/* Maintenance */}
      <Maintenance />
    </>
  );
}

export default Dashboard;
