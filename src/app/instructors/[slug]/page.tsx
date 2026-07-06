import { Container, Courses, Heading } from "@/components";
import { images } from "@/components/shared/Images";
import SocialCard from "@/components/cards/SocialCard";
import Image from "next/image";
import { getAllInstructorsAction } from "@/actions/instructorActions";
import { FacebookIcon, GlobeIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const instructors = await getAllInstructorsAction();
  const chosen = instructors.find((instructor) => instructor.slug === slug);
  if (!chosen) {
    notFound();
  }
  if (!chosen) return {};

  return {
    title: `${chosen?.name} Courses`,
    description: chosen?.bio?.slice(0, 150),
    keywords: ["instructor", chosen?.name, "courses", "learning", "e-learning"],
  };
}

const InstructorDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const instructors = await getAllInstructorsAction();
  const chosen = instructors.find((instructor) => instructor.slug === slug);
  if (!chosen) {
    notFound();
  }

  const socials = {
    Website: { url: chosen?.websiteUrl, icon: <GlobeIcon /> },
    Facebook: { url: chosen?.facebookUrl, icon: <FacebookIcon /> },
    Twitter: { url: chosen?.twitterUrl, icon: <TwitterIcon /> },
    LinkedIn: { url: chosen?.linkedinUrl, icon: <LinkedinIcon /> },
    YouTube: { url: chosen?.youtubeUrl, icon: <YoutubeIcon /> },
  };

  return (
    <>
      <section className="bg-white dark:bg-slate-800">
        <Image src={images.instructorCover} alt={"instructor cover"} width={1000} height={1000} className="w-full " />
        <Container As={"div"} className="mt-[-80px] md:mt-[-120px]">
          <Image
            src={(chosen?.avatarUrl as string) || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
            alt={"instructor cover"}
            width={200}
            height={200}
            className="rounded-full w-28 h-28 md:w-40 md:h-40 mx-auto md:mx-0 object-cover"
          />
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className=" space-y-2">
              <h1 className="text-2xl md:text-4xl font-semibold">{chosen?.name}</h1>
              <h2 className="text-md md:text-lg text-muted-foreground font-semibold ml-1">{chosen?.headline}</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="border border-primary rounded-md p-4">
                <h3 className="text-muted-foreground">Total Student</h3>
                <h4 className="font-semibold text-2xl">{chosen?.totalStudents}</h4>
              </div>
              <div className="border border-primary rounded-md p-4">
                <h3 className="text-muted-foreground">Total Reviews</h3>
                <h4 className="font-semibold text-2xl">{chosen?.totalReviews}</h4>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">{chosen?.bio}</p>
        </Container>
      </section>
      <Container background="bg-white dark:bg-slate-800 my-6">
        <Heading title="You can also follow me on other platforms" className="text-xl max-w-fit" />
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          {Object.entries(socials).map(([key, social], index) => (
            <SocialCard key={index} href={social.url as string} icon={social.icon} title={key[0].toUpperCase() + key.slice(1)} />
          ))}
        </div>
      </Container>
      <Container background="bg-white dark:bg-slate-800">
        <Courses heading={<Heading title="My Courses" className="text-2xl" />} courses={chosen?.courses} />
      </Container>
    </>
  );
};

export default InstructorDetails;
