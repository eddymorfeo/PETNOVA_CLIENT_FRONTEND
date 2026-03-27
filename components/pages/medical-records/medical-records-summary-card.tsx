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
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2.5 text-sm leading-7 text-slate-800 break-words">
        {value}
      </p>
    </div>
  );
}