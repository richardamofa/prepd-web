import { Bell, Menu } from "lucide-react";

export default function AdminHeader({
  onMenuClick,
}) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-200 bg-white/90 px-5 backdrop-blur-xl sm:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 hover:bg-neutral-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={23} />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm font-semibold text-neutral-800">
          PREP'D Admin
        </p>

        <p className="text-xs text-neutral-500">
          Manage your store
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative rounded-full p-2 transition hover:bg-neutral-100">
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-black" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
            AO
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">
              Andrea Opare
            </p>

            <p className="text-xs text-neutral-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}