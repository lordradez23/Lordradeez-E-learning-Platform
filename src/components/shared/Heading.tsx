import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  description?: string;
  cta?: React.ReactNode;
  className?: string;
}

const Heading = ({ title, description, cta, className = "" }: IProps) => {
  return (
    <div className={`${description ? "space-y-2" : ""} ${cta ? "flex justify-between items-center" : ""}`}>
      <h2 className={cn(`text-3xl font-semibold max-w-96 leading-8 ${className}`)}>{title}</h2>
      {description && <p className="text-muted-foreground max-w-80 leading-tight">{description}</p>}
      {cta && cta}
    </div>
  );
};

export default Heading;
