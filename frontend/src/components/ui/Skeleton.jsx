// components/ui/Skeleton.jsx

export default function Skeleton({
  className = "",
}) {
  return (
    <div
      className={`
        rounded-xl
        bg-[linear-gradient(110deg,#f5f5f5_8%,#ececec_18%,#f5f5f5_33%)]
        bg-size-[200%_100%]
        animate-shimmer
        ${className}
      `}
    />
  );
}