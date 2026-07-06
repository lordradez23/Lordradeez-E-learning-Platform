import Image from "next/image";
import { Award, Headset, House } from "lucide-react";
import { images } from "@/components/shared/Images";
import Heading from "@/components/shared/Heading";

const WhyUs = () => {
  return (
    <>
      <Heading title="Why do you need to study with us?" description="Find out their experiences and reasons for joining us" />
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 mt-8">
        <div className="hidden md:block">
          <Image src={images.whyUsImage} alt="hero image" className="md:w-[400px] max-w-full" width={200} height={200} />
        </div>
        <div>
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <Award className="text-primary" size={18} />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">120+ Premium Courses</h3>
                <p className="text-muted-foreground max-w-82 leading-tight">we facilitate members with many premium classes</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <House className="text-primary" size={18} />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Study anywhere and anytime</h3>
                <p className="text-muted-foreground max-w-82 leading-tight">Join us you can learn more flexibly. Study anywhere and anytime</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <Headset className="text-primary" size={18} />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Taught by a professional mentor</h3>
                <p className="text-muted-foreground max-w-82 leading-tight">Join us you can learn with a mentor who has been proven professional</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WhyUs;
