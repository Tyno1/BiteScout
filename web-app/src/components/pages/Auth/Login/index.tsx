import React from "react";
// import { useSession } from "next-auth/react";
// import { redirect, useRouter } from "next/navigation";
import SocialLogin from "@/components/molecules/forms/SocialLogin";
import LoginForm from "@/components/molecules/forms/LoginForm";
import { useNavigate } from "react-router";

const Login = () => {
  // const session = useSession();
  // const router = useRouter();

  // if (session?.data?.user) {
  //   redirect("/login/loading");
  // }

  const navigate = useNavigate();
  const NavTo = (route: string) => {
    navigate(route);
  };
  return (
    <div className="bg-black w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="text-white w-[25%] min-h-[50%] flex flex-col items-center gap-6">
        <h2 className="font-bold text-2xl">Sign In</h2>
        <SocialLogin loginType="Sign In" />
        <p>Or</p>
        <LoginForm />
        <div className="flex flex-col ">
          <p className="text-sm">You dont have an account?</p>
          <button className="text-red" onClick={() => NavTo("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
