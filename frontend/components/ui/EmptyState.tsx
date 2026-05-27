import { SearchX } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "Nenhum resultado encontrado",
  description = "Tente buscar com outro termo.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <SearchX className="w-10 h-10 text-gray-300" />
      <p className="font-semibold text-gray-600">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}