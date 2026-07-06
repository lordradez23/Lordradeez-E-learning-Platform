import ActiveLink from "@/components/shared/ActiveLink";
import { SettingsSidebarItems } from "@/constants";

export function SettingsSidebar() {
  return (
    <div className="space-y-4">
      <div className="pb-2">
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>
      <nav className="space-y-2">
        {SettingsSidebarItems.map((item) => (
          <ActiveLink
            key={item.href}
            href={item.href}
            className="font-medium duration-200 hover:text-primary flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
            activeClassName="text-primary"
            exact
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </ActiveLink>
        ))}
      </nav>
    </div>
  );
}
