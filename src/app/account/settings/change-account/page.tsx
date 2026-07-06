import { Separator } from "@/components/ui/separator";
import ChangeAccountForm from "./ChangeAccountForm";

function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Setting Account</h1>
        <p className="text-muted-foreground mt-2">You can change your password here</p>
      </div>
      <Separator />
      <ChangeAccountForm />
    </div>
  );
}

export default AccountSettings;
