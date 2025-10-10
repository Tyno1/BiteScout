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
import Image from "next/image";
import { Button } from "@/components/atoms";
import { Footer, Navbar } from "@/components/molecules";
import { Card } from "@/components/organisms";

export default function Services() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navbar />

			{/* Hero Section */}
			<section className="bg-background flex flex-col gap-4 px-4 md:px-14 mb-4 md:mb-10">
				<div className="max-w-5xl h-[40vh] flex flex-col justify-center items-start">
					<h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
						Services
					</h2>
					<h1 className="text-lg md:text-3xl w-full lg:max-w-[60vw] text-left leading-relaxed font-medium text-foreground">
						Discover how BiteScout serves both food lovers and restaurants with
						our comprehensive platform
					</h1>
				</div>
			</section>

			{/* Core Services Section */}
			<section className="px-4 md:px-14 mb-4 md:mb-10">
				<div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-10 justify-between border border-foreground p-4">
					<div className="flex flex-col justify-between items-start">
						<h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
							Core Services
						</h2>
						<h2 className="text-lg text-left leading-relaxed font-medium text-foreground">
							BiteScout brings together food discovery, restaurant management,
							and community building in one beautifully designed platform.
						</h2>
					</div>
					<div className="relative h-[50vh] w-full md:min-w-[50vw] ml-auto rounded-lg">
						<Image
							src="https://res.cloudinary.com/dr9md8vbd/image/upload/v1760090019/assets/aboutus-2_jxazta.jpg"
							alt="Core Services"
							fill
							className="object-cover rounded-lg"
							loading="lazy"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					<Card
						className="border-l-1 border-l-primary transition-all duration-300"
						containerClassName="bg-background border-1 border-foreground p-4 rounded-none shadow-none"
						padding="lg"
					>
						<div className="flex items-start gap-6">
							<div className="p-4 bg-primary/10">
								<Camera className="w-8 h-8 text-primary" />
							</div>
							<div>
								<h3 className="text-xl font-medium mb-4 text-card-foreground">
									Visual Food Discovery
								</h3>
								<p className="leading-relaxed font-light text-muted-foreground">
									Immersive TikTok-style scrolling through trending dishes,
									personalized suggestions, and infinite food exploration for
									food lovers everywhere.
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
								<Monitor className="w-8 h-8 text-primary" />
							</div>
							<div>
								<h3 className="text-xl font-medium mb-4 text-card-foreground">
									Restaurant Management
								</h3>
								<p className="leading-relaxed font-light text-muted-foreground">
									Complete control over your restaurant&apos;s presence with
									powerful admin tools, food catalogue management, and
									customer engagement features.
								</p>
							</div>
						</div>
					</Card>
				</div>
			</section>

			{/* For Users Section */}
			<section className="py-10 px-4 md:px-14 mb-4 md:mb-10">
				<div className="border border-foreground p-4">
					<div className="text-center mb-8">
						<h2 className="text-md md:text-lg font-light mb-4 tracking-tight text-foreground">
							For Food Lovers
						</h2>
						<h2 className="text-lg text-center leading-relaxed font-medium text-foreground max-w-2xl mx-auto">
							Everything you need to discover, explore, and share amazing food
							experiences
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center p-6 border border-foreground/20 rounded-none">
							<div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<Camera className="w-8 h-8 text-primary" />
							</div>
							<h3 className="text-base font-medium mb-3 text-foreground">
								Visual Discovery Feed
							</h3>
							<p className="text-sm leading-relaxed font-light text-muted-foreground">
								Immersive TikTok-style scrolling through trending dishes and
								personalized suggestions
							</p>
						</div>
						<div className="text-center p-6 border border-foreground/20 rounded-none">
							<div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
								<Search className="w-8 h-8 text-secondary" />
							</div>
							<h3 className="text-base font-medium mb-3 text-foreground">
								Smart Search & Filters
							</h3>
							<p className="text-sm leading-relaxed font-light text-muted-foreground">
								Find dishes by name, cuisine, restaurant, dietary needs, and
								location
							</p>
						</div>
						<div className="text-center p-6 border border-foreground/20 rounded-none">
							<div className="w-16 h-16 bg-success/10 flex items-center justify-center mx-auto mb-4">
								<TrendingUp className="w-8 h-8 text-success" />
							</div>
							<h3 className="text-base font-medium mb-3 text-foreground">
								Content Creation
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
								Restaurant Profiles
							</h3>
							<p className="text-sm leading-relaxed font-light text-muted-foreground">
								View food highlights, see what others are eating, and order via
								delivery
							</p>
						</div>
						<div className="text-center p-6 border border-foreground/20 rounded-none">
							<div className="w-16 h-16 bg-destructive/10 flex items-center justify-center mx-auto mb-4">
								<Users className="w-8 h-8 text-destructive" />
							</div>
							<h3 className="text-base font-medium mb-3 text-foreground">
								Social Features
							</h3>
							<p className="text-sm leading-relaxed font-light text-muted-foreground">
								Like, save, follow users and restaurants, and build your food
								community
							</p>
						</div>
						<div className="text-center p-6 border border-foreground/20 rounded-none">
							<div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
								<MapPin className="w-8 h-8 text-secondary" />
							</div>
							<h3 className="text-base font-medium mb-3 text-foreground">
								Location Services
							</h3>
							<p className="text-sm leading-relaxed font-light text-muted-foreground">
								Discover food near you with geolocation and distance-based
								recommendations
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
						alt="For Food Lovers"
						fill
						className="object-cover"
						loading="lazy"
					/>
				</div>
			</section>

			{/* For Restaurants Section */}
			<section className="py-10 px-4 md:px-14 mb-4 md:mb-10">
				<div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-10 justify-between border border-foreground p-4">
					<div className="flex flex-col justify-between items-start">
						<h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
							For Restaurants
						</h2>
						<h2 className="text-lg text-left leading-relaxed font-medium text-foreground">
							Powerful tools to showcase your food, engage customers, and grow
							your business
						</h2>
					</div>
					<div className="w-full md:min-w-[50vw]">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="p-6 border border-foreground/20 rounded-none">
								<div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
									<div className="p-3 bg-primary/10">
										<Monitor className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h3 className="text-lg font-medium text-foreground mb-2">
											Web Admin Dashboard
										</h3>
										<p className="text-sm text-muted-foreground font-light">
											Complete control over your restaurant&apos;s presence on
											BiteScout
										</p>
									</div>
								</div>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-primary rounded-full" />
										<span className="text-sm text-muted-foreground font-light">
											Manage food catalogue with detailed information
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-primary rounded-full" />
										<span className="text-sm text-muted-foreground font-light">
											Upload verified images and videos
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-primary rounded-full" />
										<span className="text-sm text-muted-foreground font-light">
											Set pricing, cuisine types, and course categories
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-primary rounded-full" />
										<span className="text-sm text-muted-foreground font-light">
											Manage allergen information and dietary tags
										</span>
									</div>
								</div>
							</div>
							<div className="p-6 border border-foreground/20 rounded-none">
							<div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
							<div className="p-3 bg-secondary/10">
										<Zap className="w-6 h-6 text-secondary" />
									</div>
									<div>
										<h3 className="text-lg font-medium text-foreground mb-2">
											Customer Engagement
										</h3>
										<p className="text-sm text-muted-foreground font-light">
											Build relationships with food lovers and increase your reach
										</p>
									</div>
								</div>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-secondary rounded-full" />
										<span className="text-sm text-muted-foreground font-light">
											View and manage user-tagged posts
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-secondary rounded-full" />
										<span className="text-sm text-muted-foreground font-light">
											Monitor customer engagement and feedback
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-secondary rounded-full" />
										<span className="text-sm text-muted-foreground font-light">
											Respond to customer interactions
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-secondary rounded-full" />
										<span className="text-sm text-muted-foreground font-light">
											Build your food community
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Platform Features */}
			<section className="py-10 px-4 md:px-14 mb-4 md:mb-10">
				<div className="border border-foreground p-4">
					<div className="text-center mb-8">
						<h2 className="text-md md:text-lg font-light mb-4 tracking-tight text-foreground">
							Platform Features
						</h2>
						<h2 className="text-lg text-center leading-relaxed font-medium text-foreground max-w-2xl mx-auto">
							Advanced capabilities that make BiteScout the ultimate food
							discovery platform
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="text-center p-6 border border-foreground/20 rounded-none">
							<div className="w-16 h-16 bg-success/10 flex items-center justify-center mx-auto mb-4">
								<Shield className="w-8 h-8 text-success" />
							</div>
							<h3 className="text-base font-medium mb-3 text-foreground">
								Safety & Trust
							</h3>
							<p className="text-sm leading-relaxed font-light text-muted-foreground">
								Manual restaurant verification, image moderation, and content
								safety measures
							</p>
						</div>
						<div className="text-center p-6 border border-foreground/20 rounded-none">
							<div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-4">
								<Smartphone className="w-8 h-8 text-accent" />
							</div>
							<h3 className="text-base font-medium mb-3 text-foreground">
								Mobile First
							</h3>
							<p className="text-sm leading-relaxed font-light text-muted-foreground">
								Optimized for mobile devices with responsive design and
								touch-friendly interface
							</p>
						</div>
						<div className="text-center p-6 border border-foreground/20 rounded-none">
							<div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
								<Users className="w-8 h-8 text-secondary" />
							</div>
							<h3 className="text-base font-medium mb-3 text-foreground">
								Community Driven
							</h3>
							<p className="text-sm leading-relaxed font-light text-muted-foreground">
								Built around real people sharing real food experiences, not just
								business listings
							</p>
						</div>
						<div className="text-center p-6 border border-foreground/20 rounded-none">
							<div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
								<TrendingUp className="w-8 h-8 text-primary" />
							</div>
							<h3 className="text-base font-medium mb-3 text-foreground">
								Performance Optimized
							</h3>
							<p className="text-sm leading-relaxed font-light text-muted-foreground">
								Fast loading, smooth scrolling, and efficient image handling for
								the best user experience
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Plans */}
			<section className="py-10 px-4 md:px-14 mb-4 md:mb-10">
				<div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-10 justify-between border border-foreground p-4">
					<div className="flex flex-col justify-between items-start">
						<h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
							Pricing Plans
						</h2>
						<h2 className="text-lg text-left leading-relaxed font-medium text-foreground">
							Simple, transparent pricing for everyone
						</h2>
					</div>
					<div className="w-full md:min-w-[50vw]">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="text-center p-4 border border-foreground/20 rounded-none">
								<h3 className="text-lg font-medium mb-2 text-foreground">Free</h3>
								<div className="text-2xl font-bold text-foreground mb-4">
									$0<span className="text-sm text-muted-foreground">/month</span>
								</div>
								<ul className="space-y-2 text-left text-sm">
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Unlimited food discovery</span>
									</li>
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Basic search and filters</span>
									</li>
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Save up to 50 dishes</span>
									</li>
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Follow restaurants</span>
									</li>
								</ul>
							</div>
							<div className="text-center p-4 border border-foreground/20 rounded-none border-2 border-primary">
								<div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium mb-2 inline-block">
									Popular
								</div>
								<h3 className="text-lg font-medium mb-2 text-foreground">Pro</h3>
								<div className="text-2xl font-bold text-foreground mb-4">
									$9.99<span className="text-sm text-muted-foreground">/month</span>
								</div>
								<ul className="space-y-2 text-left text-sm">
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Everything in Free</span>
									</li>
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Unlimited saved dishes</span>
									</li>
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Advanced filters</span>
									</li>
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Priority support</span>
									</li>
								</ul>
							</div>
							<div className="text-center p-4 border border-foreground/20 rounded-none">
								<h3 className="text-lg font-medium mb-2 text-foreground">Restaurant</h3>
								<div className="text-2xl font-bold text-foreground mb-4">
									$29<span className="text-sm text-muted-foreground">/month</span>
								</div>
								<ul className="space-y-2 text-left text-sm">
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Full admin dashboard</span>
									</li>
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Unlimited dish uploads</span>
									</li>
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Analytics & insights</span>
									</li>
									<li className="flex items-center gap-2">
										<div className="w-1.5 h-1.5 bg-primary rounded-full" />
										<span className="text-muted-foreground">Priority placement</span>
									</li>
								</ul>
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
							Ready to Get Started?
						</h2>
						<h2 className="text-lg text-center leading-relaxed font-medium text-foreground max-w-3xl mx-auto mb-8">
							Join thousands of users and restaurants already using BiteScout to
							discover and share amazing food
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
								text="Restaurant Signup"
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
