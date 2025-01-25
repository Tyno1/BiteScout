import React from "react";
import { doSocialLogin } from "@/app/actions/index";

export default function SocialLogin() {
  return (
    <form action={doSocialLogin} className="flex flex-col gap-2 w-full">
      <button
        className="text-sm font-bold w-full py-2 px-4 bg-white rounded text-black"
        type="submit"
        name="action"
        value="google"
      >
        Sign in with Google
      </button>
      <button
        className="text-sm font-bold w-full py-2 px-4 bg-white rounded text-black"
        type="submit"
        name="action"
        value="github"
      >
        Sign in with GitHub
      </button>
    </form>
  );
}
