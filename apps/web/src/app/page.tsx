import { Footer, Navbar } from "@/components/molecules";
import {
  CallToAction,
  Features,
  Hero,
  PopularDestinations,
  Testimonials,
  TopMeals,
} from "@/components/ui";

export default function Home() {
  return (
    <div className="max-w-[100vw] min-h-[100vh] flex flex-col items-center">
      <Navbar theme="dark" />
      <Hero />
      <Features />
      <TopMeals />
      <PopularDestinations />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
