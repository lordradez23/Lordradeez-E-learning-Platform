import { Separator } from "@/components/ui/separator";
import ProfileSettingsForm from "./ProfileSettingsForm";

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Setting Profile</h1>
        <p className="text-muted-foreground mt-2">Add Information About You</p>
      </div>
      <Separator />
      <ProfileSettingsForm />
    </div>
  );
}

export default ProfileSettings;
