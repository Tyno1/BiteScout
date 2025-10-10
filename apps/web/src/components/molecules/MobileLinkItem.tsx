import Link from "next/link";

type MobileLinkProp = {
  path: string;
  text: string;
  theme?: "dark" | "light";
  parentTheme?: "dark" | "light";
  toggleMenu?: () => void;
};

export const MobileLinkItem = ({
  path,
  text,
  toggleMenu,
}: MobileLinkProp) => {

  return (
    <Link
      href={path}
      onClick={toggleMenu}
      className={`block px-3 py-8 text-base flex items-center justify-center font-medium transition-colors duration-200 text-foreground hover:bg-foreground/5 hover:text-primary`}
    >
      {text}
    </Link>
  );
};
