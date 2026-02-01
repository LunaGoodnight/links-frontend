export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8">
      {children}
    </div>
  );
}
