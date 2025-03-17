import Navbar from "../../molecules/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import TopMeals from "./components/TopMeals";
import PopularDestinations from "./components/PopularDestinations";
import Testimonials from "./components/Testimonies";
import CallToAction from "./components/CallToAction";
import Footer from "../../molecules/Footer";

const Home = () => {
  return (
    <div className="w-[100vw] min-h-[100vh] flex flex-col items-center">
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
};

export default Home;
