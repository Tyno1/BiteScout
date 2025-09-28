"use client";

import {
  Camera,
  MapPin,
  Monitor,
  Search,
  Shield,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/atoms";
import { Footer, Navbar } from "@/components/molecules";
import { Card } from "@/components/organisms";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-light">
            Discover how BiteScout serves both food lovers and restaurants with our comprehensive
            platform
          </p>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Core Services
            </h2>
            <p className="text-xl text-card-foreground max-w-4xl mx-auto font-light leading-relaxed">
              BiteScout brings together food discovery, restaurant management, and community
              building in one beautifully designed platform.
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
                  <h3 className="text-2xl font-bold text-foreground mb-4">Visual Food Discovery</h3>
                  <p className="text-card-foreground leading-relaxed font-light">
                    Immersive TikTok-style scrolling through trending dishes, personalized
                    suggestions, and infinite food exploration for food lovers everywhere.
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
                  <Monitor className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Restaurant Management</h3>
                  <p className="text-card-foreground leading-relaxed font-light">
                    Complete control over your restaurant&apos;s presence with powerful admin tools,
                    food catalogue management, and customer engagement features.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* For Users Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              For Food Lovers
            </h2>
            <p className="text-xl text-card-foreground max-w-3xl mx-auto font-light">
              Everything you need to discover, explore, and share amazing food experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Visual Discovery Feed</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Immersive TikTok-style scrolling through trending dishes, personalized suggestions,
                and infinite food exploration
              </p>
            </Card>

            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Smart Search & Filters</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Find dishes by name, cuisine, restaurant, dietary needs, allergens, price, and
                location
              </p>
            </Card>

            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Content Creation</h3>
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
              <h3 className="text-xl font-bold text-foreground mb-4">Restaurant Profiles</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                View food highlights, see what others are eating, and order via delivery platforms
              </p>
            </Card>

            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-danger/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-danger" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Social Features</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Like, save, follow users and restaurants, and build your food community
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
              <h3 className="text-xl font-bold text-foreground mb-4">Location Services</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Discover food near you with geolocation and distance-based recommendations
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* For Restaurants Section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              For Restaurants
            </h2>
            <p className="text-xl text-card-foreground max-w-3xl mx-auto font-light">
              Powerful tools to showcase your food, engage customers, and grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card
              className=""
              containerClassName="bg-background hover:shadow-xl transition-all duration-300"
              padding="lg"
              shadow="lg"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <Monitor className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Web Admin Dashboard</h3>
                  <p className="text-card-foreground leading-relaxed font-light">
                    Complete control over your restaurant&apos;s presence on BiteScout
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-card-foreground font-light">
                    Manage food catalogue with detailed information
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-card-foreground font-light">
                    Upload verified images and videos
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-card-foreground font-light">
                    Set pricing, cuisine types, and course categories
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-card-foreground font-light">
                    Manage allergen information and dietary tags
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-card-foreground font-light">
                    Pin featured dishes for maximum visibility
                  </span>
                </div>
              </div>
            </Card>

            <Card
              className=""
              containerClassName="bg-background hover:shadow-xl transition-all duration-300"
              padding="lg"
              shadow="lg"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="p-4 bg-secondary/10 rounded-2xl">
                  <Zap className="w-10 h-10 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Customer Engagement</h3>
                  <p className="text-card-foreground leading-relaxed font-light">
                    Build relationships with food lovers and increase your reach
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span className="text-card-foreground font-light">
                    View and manage user-tagged posts
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span className="text-card-foreground font-light">
                    Monitor customer engagement and feedback
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span className="text-card-foreground font-light">
                    Respond to customer interactions
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span className="text-card-foreground font-light">Build your food community</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Platform Features
            </h2>
            <p className="text-xl text-card-foreground max-w-3xl mx-auto font-light">
              Advanced capabilities that make BiteScout the ultimate food discovery platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Safety & Trust</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Manual restaurant verification, image moderation, and content safety measures
              </p>
            </Card>

            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Mobile First</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Optimized for mobile devices with responsive design and touch-friendly interface
              </p>
            </Card>

            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Community Driven</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Built around real people sharing real food experiences, not just business listings
              </p>
            </Card>

            <Card
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Performance Optimized</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Fast loading, smooth scrolling, and efficient image handling for the best user
                experience
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 px-4 bg-foreground text-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Pricing Plans</h2>
            <p className="text-xl text-background/80 max-w-3xl mx-auto font-light">
              Simple, transparent pricing for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              className="text-center text-foreground"
              containerClassName="bg-background hover:shadow-xl transition-all duration-300"
              padding="lg"
              shadow="lg"
            >
              <h3 className="text-2xl font-bold mb-6">Free</h3>
              <div className="text-4xl font-bold mb-8">$0</div>
              <ul className="space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-light">Unlimited food discovery</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-light">Basic search and filters</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-light">Save up to 50 dishes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-light">Follow restaurants</span>
                </li>
              </ul>
              <Button
                text="Get Started"
                variant="solid"
                color="primary"
                size="lg"
                onClick={() => {}}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
              />
            </Card>

            <Card
              className="text-center text-primary-foreground relative"
              containerClassName="bg-primary hover:shadow-xl transition-all duration-300"
              padding="lg"
              shadow="lg"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-danger text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-6">Pro</h3>
              <div className="text-4xl font-bold mb-8">
                $9.99<span className="text-lg">/month</span>
              </div>
              <ul className="space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span className="font-light">Everything in Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span className="font-light">Unlimited saved dishes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span className="font-light">Advanced filters</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  <span className="font-light">Priority support</span>
                </li>
              </ul>
              <Button
                text="Start Pro"
                variant="solid"
                color="neutral"
                size="lg"
                onClick={() => {}}
                className="w-full bg-background text-foreground hover:bg-background/90 shadow-lg hover:shadow-xl transition-all duration-200"
              />
            </Card>

            <Card
              className="text-center text-foreground"
              containerClassName="bg-background hover:shadow-xl transition-all duration-300"
              padding="lg"
              shadow="lg"
            >
              <h3 className="text-2xl font-bold mb-6">Restaurant</h3>
              <div className="text-4xl font-bold mb-8">
                $29<span className="text-lg">/month</span>
              </div>
              <ul className="space-y-4 mb-10 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-light">Full admin dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-light">Unlimited dish uploads</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-card-foreground font-light">Analytics & insights</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-light">Priority placement</span>
                </li>
              </ul>
              <Button
                text="Contact Sales"
                variant="solid"
                color="primary"
                size="lg"
                onClick={() => {}}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-foreground mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of users and restaurants already using BiteScout to discover and share
            amazing food
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
              text="Restaurant Signup"
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
