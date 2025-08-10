"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "../atoms";

export function Footer() {
  return (
    <div className="bg-background w-full flex flex-col items-center justify-center pb-16 relative">
      <div className="news-letter bg-foreground w-full h-40 p-10 px-4 lg:px-32 xl:px-48 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-20">
        <h3 className="text-background text-2xl">Subscribe Newsletters</h3>
        <div className="flex bg-input p-2 rounded-lg w-full justify-between">
          <input
            className="text-input-foreground w-full h-14 p-4 focus:outline-none"
            type="text"
            placeholder="Enter your Email"
          />
        </div>
      </div>
      <div className="px-4 lg:px-32 xl:px-48 w-full p-10 flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        <div className="w-full md:w-60">
          <div className="md:mt-40 flex flex-col md:gap-10 text-sm">
            <p>(790) 945-3041</p>
            <p>tynodesignz@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col justify-between md:items-start">
          <div className="flex gap-10 text-sm">
            <ul className="flex flex-col gap-2">
              <li>About</li>
              <li>Download</li>
              <li>Our Services</li>
              <li>Partners</li>
              <li>Contact</li>
            </ul>

            <ul className="flex flex-col gap-2 ml-auto">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Linkedin</li>
              <li>Instagram</li>
            </ul>
          </div>
          <p className="text-sm mt-10 md:mt-0">
            © 2024 Anthony Ukutegbe. All rights reserved.
          </p>
        </div>
        <Button
          text="Back to Top"
          size="sm"
          IconBefore={<ArrowUp />}
          variant="solid"
          color="neutral"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute bottom-8 right-8"
        />
      </div>
    </div>
  );
}
