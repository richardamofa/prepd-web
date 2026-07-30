export default function Skeleton({
  className = "",
}) {
  return (
    <div
      className={`
        rounded-xl
        bg-[linear-gradient(90deg,#f5f5f5_25%,#e5e5e5_50%,#f5f5f5_75%)]
        bg-size-[1000px_100%]
        animate-shimmer
        ${className}
      `}
    />
  );
}