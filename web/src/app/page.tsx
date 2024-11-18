import CallToAction from "@/components/ui/Home/CallToAction";
import Features from "@/components/ui/Home/Features";
import Hero from "@/components/ui/Home/Hero";
import PopularDestinations from "@/components/ui/Home/PopularDestinations";
import Testimonials from "@/components/ui/Home/Testimonies";

export default function Home() {
  return (
    <div className="w-[100vw] min-h-[100vh] flex flex-col items-center">
      <Hero />
      <Features />
      <PopularDestinations />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
