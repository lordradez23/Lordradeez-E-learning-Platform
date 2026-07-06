import { SettingsSidebar } from "./SettingsSidebar";

const Settings = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background w-full">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="bg-white dark:bg-slate-800 min-h-screen">
          <SettingsSidebar />
        </div>
        <div className="md:col-span-3 bg-white dark:bg-slate-800 min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Settings;
