export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-background relative min-h-screen">{children}</div>;
}
