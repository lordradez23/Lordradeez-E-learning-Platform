import { cn } from "@/lib/utils";

const Container = ({
  background = "",
  className = "",
  children,
  As = "section",
}: {
  background?: string;
  className?: string;
  children: React.ReactNode;
  As?: React.ElementType;
}) => {
  return (
    <As className={cn(`${background} px-6 md:px-16 pb-8 py-6 md:py-10 ${className}`)}>
      <div className="container mx-auto space-y-6">{children}</div>
    </As>
  );
};

export default Container;
