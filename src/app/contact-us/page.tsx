import Image from "next/image";
import ContactUsForm from "./ContactUsForm";
import { images } from "@/components/shared/Images";

const ContactUs = () => {
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center gap-12 my-10 mx-8">
      <Image src={images.contactImage} alt="sign image" width={600} height={500} className="hidden lg:block lg:w-6/12 max-w-full rounded-md " />
      <div className="space-y-4 mt-8 w-10/12 lg:w-4/12 ">
        <h2 className="text-2xl md:text-4xl font-semibold">How Can We Help ?</h2>
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactUs;
