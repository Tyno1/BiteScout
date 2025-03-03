import Footer from "@/components/ui/Footer";
import CallToAction from "@/components/ui/Home/CallToAction";
import Features from "@/components/ui/Home/Features";
import Hero from "@/components/ui/Home/Hero";
import PopularDestinations from "@/components/ui/Home/PopularDestinations";
import Testimonials from "@/components/ui/Home/Testimonies";
import TopMeals from "@/components/ui/Home/TopMeals";
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
