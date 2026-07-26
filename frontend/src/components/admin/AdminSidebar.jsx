import {
    Box,
    ClipboardList,
    LayoutDashboard,
    LogOut,
    ShoppingBag,
    X
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar({
  isOpen,
  onClose,
}) {
  const navigate = useNavigate();

  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ClipboardList,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: ShoppingBag,
    },
    {
      name: "Customizations",
      path: "/admin/customizations",
      icon: Box,
    },
  ];

  const handleLogout = () => {
    /*
      Later:

      localStorage.removeItem("adminToken");
    */

    navigate("/admin");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-neutral-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-24 items-center justify-between border-b border-neutral-100 px-7">
          <NavLink to="/admin/dashboard">
            <span className="text-2xl font-black tracking-tight">
              PREP'D
            </span>
          </NavLink>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-5">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Management
          </p>

          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-black text-white!"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                  }`
                }
              >
                <Icon size={19} />

                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-neutral-100 p-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />

            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}