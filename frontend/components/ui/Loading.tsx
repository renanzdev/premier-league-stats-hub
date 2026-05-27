export default function Loading({ text = "Carregando..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#00A94F", borderTopColor: "transparent" }} />
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
}