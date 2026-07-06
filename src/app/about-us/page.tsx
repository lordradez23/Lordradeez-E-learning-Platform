import { getAchievements } from "@/actions/newsActions";
import { Banner, Container } from "@/components";
import { images } from "@/components/shared/Images";
import { Button } from "@/components/ui/button";
import { camelCaseToLabel } from "@/lib/utils";
import Image from "next/image";
import Counter from "./Counter";

const AboutUs = async () => {
  const achievements = await getAchievements();
  return (
    <>
      <Container background="bg-white dark:bg-slate-800">
        <div className="flex flex-col-reverse md:flex-row justify-evenly md:gap-4">
          <div className="content flex flex-col justify-around gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Our Vision</h2>
              <p className="text-sm leading-5 md:leading-6 md:text-base text-muted-foreground max-w-96">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            <Button variant={"outline"} className="w-fit">
              Learn More
            </Button>
          </div>
          <div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <Image src={images.aboutImage1} alt="about image" width={270} height={370} className="row-span-2 max-w-full rounded-md " />
              <Image src={images.aboutImage2} alt="about image" width={270} height={150} className=" max-w-full rounded-md " />
              <Image src={images.aboutImage3} alt="about image" width={270} height={150} className=" max-w-full rounded-md " />
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className=" flex flex-col md:flex-row justify-evenly gap-4">
          <div>
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              <Image src={images.aboutImage4} alt="about image" width={570} height={200} className="col-span-3 max-w-full rounded-md " />
              <Image src={images.aboutImage5} alt="about image" width={170} height={200} className="max-w-full rounded-md " />
              <Image src={images.aboutImage6} alt="about image" width={370} height={200} className="col-span-2  max-w-full rounded-md " />
            </div>
          </div>
          <div className="content flex flex-col justify-around gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Our Mission</h2>
              <p className="text-sm leading-5 md:leading-6 md:text-base text-muted-foreground max-w-96">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              </p>
            </div>
            <Button variant={"outline"} className="w-fit">
              Learn More
            </Button>
          </div>
        </div>
      </Container>

      <Container background="bg-white dark:bg-slate-800">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-3xl font-semibold">Our Achievements</h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex flex-col md:flex-row justify-evenly gap-4 md:gap-14">
            {Object.entries(achievements).map(([key, value], index) => (
              <Counter key={index} target={value} label={camelCaseToLabel(key)} />
            ))}
          </div>
        </div>
      </Container>

      <Container background="bg-white dark:bg-slate-800">
        <Banner image="about-banner-image" title="Let's Join Us" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
      </Container>
    </>
  );
};

export default AboutUs;
