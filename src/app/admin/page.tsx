export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-midnight font-[family-name:var(--font-space-grotesk)]">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-slate">New Leads</h3>
          <p className="text-3xl font-bold text-midnight mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-slate">Proposals Sent</h3>
          <p className="text-3xl font-bold text-midnight mt-2">4</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-slate">Projects Won</h3>
          <p className="text-3xl font-bold text-midnight mt-2">2</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-slate">Storage Usage</h3>
          <p className="text-xl font-bold text-green-600 mt-2">Aman (45%)</p>
        </div>
      </div>
    </div>
  );
}
