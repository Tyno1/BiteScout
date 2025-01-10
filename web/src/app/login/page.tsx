"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
  const [providers, setProviders] = useState();
  const router = useRouter();
  const { data: session, status } = useSession();

  const fetchProviders = async () => {
    try {
      const providersData: any = await getProviders();
      setProviders(providersData);
    } catch (error) {
      toast("error fetching");
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Logged in successfully!");
      router.push("/onboarding/roles");
    }
  }, [status]);

  return (
    <div className="bg-black w-[100vw] h-[100vh] flex items-center justify-center">
      <form className="text-white w-[25%] min-h-[50%] flex flex-col items-center gap-6">
        <h2 className="font-bold text-2xl">Sign In</h2>
        <ul className="w-full flex flex-col gap-2">
          {providers &&
            Object.values(providers).map((provider: any) => (
              <li key={provider?.name}>
                <button
                  className="text-sm font-bold w-full py-2 px-4 bg-white rounded text-black"
                  aria-label={`Sign in with ${provider.name}`}
                  type="button"
                  onClick={() => signIn(provider?.id)}
                >
                  {provider.name} Sign In
                </button>
              </li>
            ))}
        </ul>

        <h3>Or</h3>
        <div className="w-full flex flex-col gap-2">
          <input
            className="text-sm w-full py-4 px-4 bg-white rounded text-black"
            placeholder="john@doe.com"
            type="text"
          />
          <input
            className="text-sm w-full py-4 px-4 bg-white rounded text-black"
            placeholder="*******"
            type="text"
          />
          <button className="text-sm font-bold w-full py-2 px-4 bg-red rounded text-white">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
