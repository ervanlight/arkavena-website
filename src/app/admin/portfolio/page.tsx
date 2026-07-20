export default function AdminPortfolio() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-midnight font-manrope">Portfolio CMS</h1>
        <a href="/admin/portfolio/new" className="bg-bronze text-\[#0E1B26\] px-4 py-2 rounded hover:bg-opacity-90">
          Add New Project
        </a>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-slate">Portfolio list goes here...</p>
      </div>
    </div>
  );
}
