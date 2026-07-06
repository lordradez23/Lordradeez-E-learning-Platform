import { Button } from "@/components/ui/button";
const Banner = ({ title, description,image }: { title: string; description?: string; image: string }) => {
  return (
    <div className="max-w-full h-[349px] mx-auto relative">
      <div className={`${image} absolute inset-0 z-0 before:absolute before:inset-0 before:bg-[#044cdda8]/40`}>
        <div className="flex flex-col items-center justify-center gap-4 text-white px-4 relative z-10 h-full">
          <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
          <p className="text-sm md:text-base max-w-80 text-center">{description}</p>
          <Button className="text-white">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
