import { AlertCircle } from "lucide-react";

interface Props {
  message?: string;
}

export default function ErrorState({
  message = "Erro ao carregar dados. Verifique se a API está rodando.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <AlertCircle className="w-10 h-10 text-red-400" />
      <p className="font-semibold text-gray-700">Ops! Algo deu errado</p>
      <p className="text-sm text-gray-500 max-w-sm">{message}</p>
    </div>
  );
}
