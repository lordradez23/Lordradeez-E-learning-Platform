import Image from "next/image";
import RegisterForm from "./RegisterForm";
import { images } from "@/components/shared/Images";

const Register = () => {
  return (
    <div className=" flex flex-col md:flex-row justify-center items-center gap-12 mx-8 my-16">
      <div className="max-w-11/12 space-y-4">
        <h2 className="text-2xl font-semibold">Create a new account</h2>
        <RegisterForm />
      </div>
      <Image src={images.signImage} alt="sign image" width={400} height={350} className="hidden lg:block max-w-full rounded-md" />
    </div>
  );
};

export default Register;
