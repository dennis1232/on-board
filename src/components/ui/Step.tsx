import { Typography } from "./Typography";

import { Card } from "./Card";

interface StepProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function Step({ title, description, children, className = '' }: StepProps) {
  return (
    <Card className={`max-w-lg mx-auto ${className}`}>
      <Typography variant="h1" className="mb-2">
        {title}
      </Typography>
      <Typography variant="body" className="mb-6 md:mb-8">
        {description}
      </Typography>
      {children}
    </Card>
  );
} 