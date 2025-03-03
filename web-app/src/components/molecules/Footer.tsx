import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-white w-full flex flex-col items-center justify-center py-16 relative">
      <div className="news-letter bg-black w-full h-40 p-10 px-4 lg:px-32 xl:px-48 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-20">
        <h3 className="text-white text-2xl">Subscribe Newsletters</h3>
        <div className="flex bg-white p-2 rounded-lg w-full justify-between">
          <input
            className="text-black w-full h-14 p-4 focus:outline-none"
            type="text"
            placeholder="Enter your Email"
          />
        </div>
      </div>
      <div className="px-4 lg:px-32 xl:px-48 w-full p-10 flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        <div className="w-full md:w-60">
          <p>University Of South Wales, Pontypridd, Wales, UK.</p>
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
        <button
          className="absolute bottom-8 right-8"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        ></button>
      </div>
    </div>
  );
};

export default Footer;
