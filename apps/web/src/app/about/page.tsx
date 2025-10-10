"use client";

import {
  Camera,
  Heart,
  MapPin,
  Salad,
  Smartphone,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/atoms";
import { Footer, Navbar } from "@/components/molecules";
import { Card } from "@/components/organisms";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-background flex flex-col gap-4 px-4 md:px-14 mb-4 md:mb-10">
        <div className="max-w-5xl h-[40vh] flex flex-col justify-center items-start">
          <h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
            About
          </h2>
          <motion.h1 className="text-lg md:text-3xl w-full lg:max-w-[60vw] text-left leading-relaxed font-medium text-foreground">
            BiteScout reimagines food discovery through immersive visuals.
            Instead of star ratings and endless reviews, explore dishes by
            scrolling through photos and videos of real food from real people.
          </motion.h1>
        </div>
      </section>

      <section className="px-4 md:px-14 mb-4 md:mb-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-10 justify-between border border-foreground p-4">
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
              Our Vision
            </h2>
            <h2 className="text-lg text-left leading-relaxed font-medium text-foreground">
              BiteScout brings together the joy of eating, the power of
              community, and the ease of discovery in one beautifully curated
              platform.
            </h2>
          </div>
          <div className="relative h-[50vh] w-full md:min-w-[50vw] ml-auto rounded-lg">
            <Image
              src="https://res.cloudinary.com/dr9md8vbd/image/upload/v1760090019/assets/aboutus-2_jxazta.jpg"
              alt="Follow the Flavor"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card
            className="border-l-1 border-l-primary transition-all duration-300 "
            containerClassName="bg-background border-1 border-foreground p-4 rounded-none shadow-none"
            padding="lg"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 bg-primary/10">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4 text-card-foreground">
                  Visual Discovery
                </h3>
                <p className="leading-relaxed font-light text-muted-foreground">
                  We don&apos;t ask users to read reviews. We show them exactly
                  what they could eat next — via vibrant, full-screen food
                  content that makes your mouth water.
                </p>
              </div>
            </div>
          </Card>

          <Card
            className="border-l-1 border-l-primary transition-all duration-300"
            containerClassName="bg-background border border-foreground p-4 rounded-none shadow-none"
            padding="lg"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 bg-primary/10">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4 text-card-foreground">
                  Real Taste
                </h3>
                <p className="leading-relaxed font-light text-muted-foreground">
                  It&apos;s not about ratings. It&apos;s about recognition —
                  great food, beautifully captured, socially shared, and
                  effortlessly discovered by food lovers everywhere.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 px-4 md:px-14 mb-4 md:mb-10">
        <div className="border border-foreground p-4">
          <div className="text-center mb-8">
            <h2 className="text-md md:text-lg font-light mb-4 tracking-tight text-foreground">
              How It Works
            </h2>
            <h2 className="text-lg text-center leading-relaxed font-medium text-foreground max-w-2xl mx-auto">
              Discover, share, and explore food in a whole new way
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-base font-medium mb-3 text-foreground">
                Discover Visually
              </h3>
              <p className="text-sm leading-relaxed font-light text-muted-foreground">
                Immersive TikTok-style feed with trending dishes and
                personalized suggestions
              </p>
            </div>
            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-base font-medium mb-3 text-foreground">
                Search & Filter
              </h3>
              <p className="text-sm leading-relaxed font-light text-muted-foreground">
                Find dishes by name, cuisine, restaurant, dietary needs, and
                location
              </p>
            </div>
            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-base font-medium mb-3 text-foreground">
                Share Your Food
              </h3>
              <p className="text-sm leading-relaxed font-light text-muted-foreground">
                Upload images/videos, add food details, tag restaurants, and
                share adventures
              </p>
            </div>
            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-base font-medium mb-3 text-foreground">
                Explore Restaurants
              </h3>
              <p className="text-sm leading-relaxed font-light text-muted-foreground">
                View food highlights, see what others are eating, and order via
                delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-10 px-4 md:px-14 h-[50vh] w-full mb-4 md:mb-10">
        <div className="absolute inset-0 bg-background/20 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dr9md8vbd/image/upload/v1760090019/assets/aboutus3_fp3odi.jpg"
            alt="Follow the Flavor"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Target Users */}
      <section className="py-10 px-4 md:px-14">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-10 justify-between border border-foreground p-4">
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
              Built for Food Lovers
            </h2>
            <h2 className="text-lg text-left leading-relaxed font-medium text-foreground">
              Whether you&apos;re a visual foodie, fast explorer, or dietary
              seeker, BiteScout has you covered
            </h2>
          </div>
          <div className="w-full md:min-w-[50vw]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-foreground/20 rounded-none">
                <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-foreground">
                  The Visual Foodie
                </h3>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Ages 18-35
                </p>
                <p className="text-sm leading-relaxed font-light text-muted-foreground">
                  Loves TikTok and Instagram, but craves real food inspiration.
                  Wants to discover new dishes through beautiful visuals.
                </p>
              </div>
              <div className="text-center p-4 border border-foreground/20 rounded-none">
                <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-foreground">
                  The Fast Explorer
                </h3>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Ages 25-45
                </p>
                <p className="text-sm leading-relaxed font-light text-muted-foreground">
                  Wants to find exactly what to eat nearby, without reading
                  endless reviews. Values quick, visual decision-making.
                </p>
              </div>
              <div className="text-center p-4 border border-foreground/20 rounded-none">
                <div className="w-16 h-16 bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Salad className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-foreground">
                  The Dietary Seeker
                </h3>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Ages 21-50
                </p>
                <p className="text-sm leading-relaxed font-light text-muted-foreground">
                  Filters food based on specific needs: vegan, gluten-free,
                  nut-free, and more. Needs reliable, visual confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-4 md:px-14">
        <div className="border border-foreground p-8">
          <div className="text-center">
            <h2 className="text-md md:text-lg font-light mb-4 tracking-tight text-foreground">
              Ready to Follow the Flavor?
            </h2>
            <h2 className="text-lg text-center leading-relaxed font-medium text-foreground max-w-3xl mx-auto mb-8">
              Join thousands of food lovers discovering, sharing, and exploring
              the world&apos;s most delicious dishes
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Button
                text="Download App"
                variant="solid"
                color="neutral"
                size="lg"
                onClick={() => {}}
                className="bg-card text-card-foreground hover:bg-card/90 border border-foreground/20 rounded-none w-full sm:w-auto"
              />
              <Button
                text="Join Waitlist"
                variant="solid"
                color="neutral"
                size="lg"
                onClick={() => {}}
                className="bg-background text-foreground hover:bg-background/90 border border-foreground/20 rounded-none w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
