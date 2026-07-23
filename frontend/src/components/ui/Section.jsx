export default function Section({
  children,
  className = "",
  ...props
}) {
  return (
    <section
      {...props}
      className={`px-6 py-24 md:px-12 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}