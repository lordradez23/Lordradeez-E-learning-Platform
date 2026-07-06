import ActiveLink from "@/components/shared/ActiveLink";
import { NotepadText, Settings } from "lucide-react";
import Image from "next/image";
import { getUserFromToken } from "@/lib/JWT";

const AccountAside = async () => {
  const user = await getUserFromToken();
  return (
    <div className="flex flex-col lg:space-y-8">
      <div className="mx-auto space-y-2">
        <Image
          src={(user?.avatar as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
          alt="user avatar"
          width={200}
          height={200}
          className="w-16 h-16 rounded-full object-cover mx-auto"
        />
        <h3 className="text-2xl font-semibold">{user?.fullName || "User Name"}</h3>
      </div>
      <div className="flex flex-row lg:flex-col justify-center space-y-4">
        <ActiveLink href={"/account"} exact activeClassName="text-primary">
          <h4 className="flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-gray-100 font-medium hover:text-primary rounded-md">
            <NotepadText />
            <span>My Class</span>
          </h4>
        </ActiveLink>
        <ActiveLink href={"/account/settings"} activeClassName="text-primary">
          <h4 className="flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-gray-100 font-medium hover:text-primary rounded-md">
            <Settings />
            <span>Settings</span>
          </h4>
        </ActiveLink>
      </div>
    </div>
  );
};

export default AccountAside;
