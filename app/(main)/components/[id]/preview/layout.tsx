export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background relative flex justify-center items-center">
      {children}
    </div>
  )
} 