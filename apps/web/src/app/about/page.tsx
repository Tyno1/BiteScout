"use client";

import {
  Camera,
  Heart,
  MapPin,
  Palette,
  Salad,
  Smartphone,
  Star,
  TrendingUp,
  Trophy,
  Type,
  Zap,
} from "lucide-react";
import { Button } from "@/components/atoms";
import { Footer, Navbar } from "@/components/molecules";
import { Card } from "@/components/organisms";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Follow the <span className="text-primary">Flavor</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-light">
            BiteScout reimagines food discovery through immersive visuals. Instead of star ratings
            and endless reviews, explore dishes by scrolling through photos and videos of real food
            from real people.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Our Vision
            </h2>
            <p className="text-xl text-card-foreground max-w-4xl mx-auto font-light leading-relaxed">
              BiteScout brings together the joy of eating, the power of community, and the ease of
              discovery in one beautifully curated platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card
              className="border-l-4 border-l-primary"
              containerClassName="bg-background"
              padding="lg"
              shadow="lg"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Visual Discovery</h3>
                  <p className="text-card-foreground leading-relaxed font-light">
                    We don&apos;t ask users to read reviews. We show them exactly what they could
                    eat next — via vibrant, full-screen food content that makes your mouth water.
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="border-l-4 border-l-accent"
              containerClassName="bg-background"
              padding="lg"
              shadow="lg"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-accent/10 rounded-2xl">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Real Taste</h3>
                  <p className="text-card-foreground leading-relaxed font-light">
                    It&apos;s not about ratings. It&apos;s about recognition — great food,
                    beautifully captured, socially shared, and effortlessly discovered by food
                    lovers everywhere.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-card-foreground max-w-3xl mx-auto font-light">
              Discover, share, and explore food in a whole new way
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Discover Visually</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Immersive TikTok-style feed with trending dishes, suggestions, and infinite food
                exploration
              </p>
            </Card>

            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Search & Filter</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Find dishes by name, cuisine, restaurant, dietary needs, allergens, and location
              </p>
            </Card>

            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Share Your Food</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Upload images/videos, add food details, tag restaurants, and share your culinary
                adventures
              </p>
            </Card>

            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Explore Restaurants</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                View food highlights, see what others are eating, and order via delivery platforms
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Built for Food Lovers
            </h2>
            <p className="text-xl text-card-foreground max-w-3xl mx-auto font-light">
              Whether you&apos;re a visual foodie, fast explorer, or dietary seeker, BiteScout has
              you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card
              className="text-center hover:bg-background/90 transition-all duration-300"
              containerClassName="bg-background hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Smartphone className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">The Visual Foodie</h3>
              <p className="text-card-foreground mb-4 font-medium">Ages 18-35</p>
              <p className="text-card-foreground font-light leading-relaxed">
                Loves TikTok and Instagram, but craves real food inspiration. Wants to discover new
                dishes through beautiful visuals and authentic content.
              </p>
            </Card>

            <Card
              className="text-center hover:bg-background/90 transition-all duration-300"
              containerClassName="bg-background hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-24 h-24 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Zap className="w-16 h-16 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">The Fast Explorer</h3>
              <p className="text-card-foreground mb-4 font-medium">Ages 25-45</p>
              <p className="text-card-foreground font-light leading-relaxed">
                Wants to find exactly what to eat nearby, without reading endless reviews. Values
                quick, visual decision-making for food choices.
              </p>
            </Card>

            <Card
              className="text-center hover:bg-background/90 transition-all duration-300"
              containerClassName="bg-background hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-24 h-24 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Salad className="w-16 h-16 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">The Dietary Seeker</h3>
              <p className="text-card-foreground mb-4 font-medium">Ages 21-50</p>
              <p className="text-card-foreground font-light leading-relaxed">
                Filters food based on specific needs: vegan, gluten-free, nut-free, and more. Needs
                reliable, visual confirmation of dietary compliance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Brand Identity */}
      <section className="py-24 px-4 bg-foreground text-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Our Brand Identity
            </h2>
            <p className="text-xl text-background/80 max-w-3xl mx-auto font-light">
              Modern, playful, classy, and inclusive — just like the food community we&apos;re
              building
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">B</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Name</h3>
              <p className="text-background/70 font-light">
                BiteScout – &quot;Follow the Flavor&quot;
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Palette className="w-16 h-16 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Colors</h3>
              <p className="text-background/70 font-light">
                Deep black, toasted gold, warm red, cool cream
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Type className="w-16 h-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Typography</h3>
              <p className="text-background/70 font-light">
                Contemporary sans serif with personality
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Trophy className="w-16 h-16 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Icon</h3>
              <p className="text-background/70 font-light">Stylized bite mark on a scout badge</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
            Ready to Follow the Flavor?
          </h2>
          <p className="text-xl text-foreground mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of food lovers discovering, sharing, and exploring the world&apos;s most
            delicious dishes
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              text="Download App"
              variant="solid"
              color="neutral"
              size="lg"
              onClick={() => {}}
              className="bg-card text-foreground hover:bg-card/90 shadow-lg hover:shadow-xl transition-all duration-200"
            />
            <Button
              text="Join Waitlist"
              variant="solid"
              color="neutral"
              size="lg"
              onClick={() => {}}
              className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90 shadow-lg hover:shadow-xl transition-all duration-200"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
