type MedicalRecordsSummaryCardProps = {
  label: string;
  value: string;
};

export function MedicalRecordsSummaryCard({
  label,
  value,
}: MedicalRecordsSummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-800">{value}</p>
    </div>
  );
}