import React from "react";
import { doSocialLogin } from "@/app/actions/index";

interface LoginProp {
  loginType: string;
}

export default function SocialLogin({ loginType }: LoginProp) {
  return (
    <form action={doSocialLogin} className="flex flex-col gap-2 w-full">
      <button
        className="text-sm font-bold w-full py-2 px-4 bg-white rounded text-black"
        type="submit"
        name="action"
        value="google"
      >
        {loginType} with Google
      </button>
      <button
        className="text-sm font-bold w-full py-2 px-4 bg-white rounded text-black"
        type="submit"
        name="action"
        value="github"
      >
        {loginType} with GitHub
      </button>
    </form>
  );
}
