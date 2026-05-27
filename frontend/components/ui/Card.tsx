import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 overflow-hidden",
        hover && "transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
