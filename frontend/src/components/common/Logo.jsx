import logo from "@/assets/logo/logo_white_svg.png";

export default function Logo({
  className = "",
}) {
  return (
    <img
      src={logo}
      alt="PREP'D"
      className={` ${className}`}
      style={{ width: "140px", height: "40px", objectFit: "contain" }}
    />
  );
}