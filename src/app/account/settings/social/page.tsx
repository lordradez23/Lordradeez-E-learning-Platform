import { Separator } from "@/components/ui/separator";
import ChangeAccountForm from "./SocialSettingsForm";

function SocialMediaSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Social Media</h1>
        <p className="text-muted-foreground mt-2">You can add social media account</p>
      </div>
      <Separator />
      <ChangeAccountForm />
    </div>
  );
}

export default SocialMediaSettings;
