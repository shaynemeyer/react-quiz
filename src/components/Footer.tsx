interface FooterProps {
  children: React.ReactNode;
}

export default function Footer({ children }: FooterProps) {
  return <footer>{children}</footer>;
}
