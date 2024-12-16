interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white p-4 md:p-6 rounded-lg ${className}`}>
      {children}
    </div>
  );
}
