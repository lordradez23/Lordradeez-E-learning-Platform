import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ReactPlayer from "react-player";

export async function VideoPlayer({ video }: { video: string }) {
  return (
    <div className="space-y-4">
      <ReactPlayer src={`${video}`} className="react-player max-w-full" controls width={950} height={500} />
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Download This Video</span>
        </Button>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Translation</span>
          <Switch defaultChecked />
          <span className="text-sm font-medium">ON</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">Reference</span>
          <Link href="#" className="text-sm text-primary hover:underline line-clamp-1">
            {`${video}`}
          </Link>
        </div>
      </div>
      <Separator />
    </div>
  );
}
