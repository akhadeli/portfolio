export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-light">Page not found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}
