type MedicalRecordsEmptyBlockProps = {
  message: string;
};

export function MedicalRecordsEmptyBlock({
  message,
}: MedicalRecordsEmptyBlockProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-8 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}