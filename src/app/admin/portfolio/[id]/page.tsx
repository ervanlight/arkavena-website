export default function AdminEditPortfolio({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight font-manrope mb-6">Edit Project: {params.id}</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-slate">Edit form goes here...</p>
      </div>
    </div>
  );
}
