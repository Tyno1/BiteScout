import Footer from "@/components/ui/Footer";
import CallToAction from "@/components/ui/home/CallToAction";
import Features from "@/components/ui/home/Features";
import Hero from "@/components/ui/home/Hero";
import PopularDestinations from "@/components/ui/home/PopularDestinations";
import Testimonials from "@/components/ui/home/Testimonies";
import TopMeals from "@/components/ui/home/TopMeals";
import Navbar from "@/components/molecules/Navbar";

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
