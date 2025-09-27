import Link from "next/link";

type LinkProp = {
  text: string;
  to: string;
  className?: string;
};
export default function NewLink({ text, to, className }: LinkProp) {
  const BaseStyles =
    "px-3 py-2 text-sm font-medium hover:border-b-2 hover:border-orange-500 focus:ring-orange-500 focus:outline-none focus:ring-1 focus:ring-offset-0";
  return (
    <Link href={to} className={`${BaseStyles} ${className}`}>
      {text}
    </Link>
  );
}
