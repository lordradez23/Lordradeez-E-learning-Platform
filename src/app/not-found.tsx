import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { images } from "@/components/shared/Images";

const notFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <Image src={images.notFoundImg} alt="404 not found" width={400} height={400} />
      <p className="text-2xl font-semibold">Sorry, we&apos;re working on it</p>
      <Button className="text-lg p-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
};

export default notFound;
