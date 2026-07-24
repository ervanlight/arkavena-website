export default function AdminLeadDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight font-[family-name:var(--font-space-grotesk)] mb-6">Lead Detail: {params.id}</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-slate">Lead details and actions go here...</p>
      </div>
    </div>
  );
}
