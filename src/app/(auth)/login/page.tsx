import Image from "next/image";
import LoginForm from "./LoginForm";
import { images } from "@/components/shared/Images";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-12 mx-8 my-16">
      <div className="space-y-4 max-w-11/12">
        <h2 className="text-2xl font-semibold">Welcome Back</h2>
        <LoginForm />
      </div>
      <Image src={images.loginImage} alt="login image" width={400} height={350} className="hidden lg:block rounded-md" />
    </div>
  );
};

export default Login;
