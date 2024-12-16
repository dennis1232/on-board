interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  children: React.ReactNode;
  className?: string;
  component?: keyof JSX.IntrinsicElements;
}

export function Typography({
  variant = 'body',
  children,
  className = '',
  component,
}: TypographyProps) {
  const variants = {
    h1: 'text-2xl md:text-3xl font-bold text-marine-blue',
    h2: 'text-xl md:text-2xl font-bold text-marine-blue',
    h3: 'text-lg md:text-xl font-bold text-marine-blue',
    h4: 'text-base md:text-lg font-semibold text-marine-blue',
    body: 'text-base text-cool-gray',
    caption: 'text-sm text-cool-gray',
    label: 'text-sm font-medium text-marine-blue'
  };

  const Component = component || {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    caption: 'span',
    label: 'label'
  }[variant] as keyof JSX.IntrinsicElements;

  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
}