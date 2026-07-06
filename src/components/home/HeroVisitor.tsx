"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { images } from "@/components/shared/Images";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import { GSDevTools } from "gsap/GSDevTools";

const HeroVisitor = () => {
  // gsap.registerPlugin(GSDevTools);
  useGSAP(() => {
    // GSDevTools.create()
    gsap
      .timeline()
      .from(".test", {
        scale: 2,
        opacity: 0,
        ease: "power4.in",
      })
      .from(
        ".test3",
        {
          opacity: 0,
          x: 200,
        },
        "<"
      )
      .from(".test2", {
        opacity: 0,
        y: -50,
      })
      .from(".con", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
      });
  });

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl test md:text-4xl lg:text-6xl font-semibold max-w-[700px] text-pretty !font-alike">
          Learn New Skills <span className="text-primary">Anytime</span> and <span className="text-primary">Anywhere</span>
        </h1>
        <p className="max-w-96 test2 text-pretty text-muted-foreground">
          Take advantage of this moment, let&apos;s join us. You will get many benefits and can study anywhere and anytime
        </p>
        <div className="space-x-4 con">
          <Button className="text-white md:text-lg md:p-6">Get Started</Button>
          <Button variant="outline" className="md:text-lg md:p-6">
            Join Now
          </Button>
        </div>
      </div>
      <div>
        <Image priority loading="eager" src={images.HeroImage} alt="hero image" className="md:w-[600px] max-w-full test3" width={400} height={400} />
      </div>
    </>
  );
};

export default HeroVisitor;
