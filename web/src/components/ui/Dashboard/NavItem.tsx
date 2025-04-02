import { usePathname } from "next/navigation";
import React from "react";

interface NavItemProps {
  icon: React.ReactElement;
  text: string;
  path?: string;
  handleNav?: (navName: string) => void;
}

const NavItem = ({ icon, text, path, handleNav }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = path ? pathname === path : false;

  return (
    <li className="w-full">
      <button
        onClick={() => handleNav && handleNav(path ? path : "/")}
        className={`
          flex items-center 
          px-2 py-4 rounded-md 
          cursor-pointer 
          transition-colors w-full
          ${isActive ? "bg-red text-white" : "hover:bg-gray-100 text-gray-700"}
        `}
      >
        {React.cloneElement(icon, {
          className: "mr-3 w-5 h-5",
        })}
        <span className="text-sm font-medium">{text}</span>
      </button>
    </li>
  );
};

export default NavItem;
