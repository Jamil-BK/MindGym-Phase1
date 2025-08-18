// Layout component used by all tool pages
export default function ToolPage({ title, subtitle, children }) {
  return (
    <section className="space-y-4">
      
      {/* Section header with title and optional subtitle */}
      <header>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
      </header>

      {/* Content container with border and background */}
      <div className="rounded-2xl p-4 border border-white/10 bg-white/5">
        {children}
      </div>
      
    </section>
  );
}
