"use client";

import {
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useId } from "react";
import { Accordion, Button, Input, Select, Textarea } from "@/components/atoms";
import { Footer, Navbar } from "@/components/molecules";
import { Card } from "@/components/organisms";

export default function Contact() {
  const newsletterId = useId();
  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "partnership", label: "Restaurant Partnership" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "bug", label: "Report a Bug" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-background flex flex-col gap-4 px-4 md:px-14 mb-4 md:mb-10">
        <div className="max-w-5xl h-[40vh] flex flex-col justify-center items-start">
          <h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
            Contact
          </h2>
          <h1 className="text-lg md:text-3xl w-full lg:max-w-[60vw] text-left leading-relaxed font-medium text-foreground">
            Have questions about BiteScout? We&apos;d love to hear from you. Our
            team is here to help with any inquiries or support you need.
          </h1>
        </div>
      </section>
      {/* Contact Information */}
      <section className="px-4 md:px-14 mb-4 md:mb-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-10 justify-between border border-foreground p-4">
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
              Contact Information
            </h2>
            <h2 className="text-lg text-left leading-relaxed font-medium text-foreground">
              Multiple ways to reach our team and get the support you need
            </h2>
          </div>
          <div className="relative h-[50vh] w-full md:min-w-[50vw] ml-auto rounded-lg">
            <Image
              src="https://res.cloudinary.com/dr9md8vbd/image/upload/v1760090019/assets/about4_f25sgq.jpg"
              alt="Contact Information"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="border-l-1 border-l-primary transition-all duration-300"
            containerClassName="bg-background border-1 border-foreground p-4 rounded-none shadow-none"
            padding="lg"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 bg-primary/10">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4 text-card-foreground">
                  Email Support
                </h3>
                <p className="leading-relaxed font-light text-muted-foreground mb-4">
                  Get help with your account, technical issues, or general
                  questions
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium text-card-foreground">
                      General Inquiries
                    </p>
                    <a
                      href="mailto:hello@bitescout.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      hello@bitescout.com
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Support</p>
                    <a
                      href="mailto:support@bitescout.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      support@bitescout.com
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">
                      Restaurants
                    </p>
                    <a
                      href="mailto:partners@bitescout.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      partners@bitescout.com
                    </a>
                  </div>
                </div>
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
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4 text-card-foreground">
                  Phone Support
                </h3>
                <p className="leading-relaxed font-light text-muted-foreground mb-4">
                  Speak directly with our customer support team
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium text-card-foreground">
                      Customer Support
                    </p>
                    <a
                      href="tel:+44123456789"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      +44 (0) 123 456 789
                    </a>
                  </div>
                  <p className="text-muted-foreground">
                    Monday - Friday, 9:00 AM - 6:00 PM GMT
                  </p>
                </div>
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
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4 text-card-foreground">
                  Office Location
                </h3>
                <p className="leading-relaxed font-light text-muted-foreground mb-4">
                  Visit our headquarters in Cardiff, Wales
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium text-card-foreground">
                      BiteScout HQ
                    </p>
                    <div className="text-muted-foreground space-y-1">
                      <p>123 Food Street</p>
                      <p>Cardiff Bay</p>
                      <p>Cardiff, CF10 4UQ</p>
                      <p>United Kingdom</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      {/* Support Options */}
      <section className="py-10 px-4 md:px-14 mb-4 md:mb-10">
        <div className="border border-foreground p-4">
          <div className="text-center mb-8">
            <h2 className="text-md md:text-lg font-light mb-4 tracking-tight text-foreground">
              Support Options
            </h2>
            <h2 className="text-lg text-center leading-relaxed font-medium text-foreground max-w-2xl mx-auto">
              Choose the best way to get help based on your needs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-base font-medium mb-3 text-foreground">
                Help Center
              </h3>
              <p className="text-sm leading-relaxed font-light text-muted-foreground">
                Comprehensive guides and FAQs for common questions
              </p>
            </div>
            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-base font-medium mb-3 text-foreground">
                Live Chat
              </h3>
              <p className="text-sm leading-relaxed font-light text-muted-foreground">
                Real-time support during business hours
              </p>
            </div>
            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-base font-medium mb-3 text-foreground">
                Community
              </h3>
              <p className="text-sm leading-relaxed font-light text-muted-foreground">
                Connect with other users in our community forum
              </p>
            </div>
            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-base font-medium mb-3 text-foreground">
                Feedback
              </h3>
              <p className="text-sm leading-relaxed font-light text-muted-foreground">
                Share your ideas and suggestions for improvement
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-10 px-4 md:px-14 h-[50vh] w-full mb-4 md:mb-10">
        <div className="absolute inset-0 bg-background/20 z-10" />
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dr9md8vbd/image/upload/v1760090020/assets/about5_nh8b8w.jpg"
            alt="Support Options"
            fill
            className="object-cover"
          />
        </div>
      </section>
      {/* Contact Form */}
      <section className="py-10 px-4 md:px-14 mb-4 md:mb-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-10 justify-between border border-foreground p-4">
          <div className="flex flex-col justify-between items-start">
            <h2 className="text-md md:text-lg font-light mb-8 tracking-tight text-foreground">
              Send Us a Message
            </h2>
            <h2 className="text-lg text-left leading-relaxed font-medium text-foreground">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible
            </h2>
          </div>
          <div className="w-full md:min-w-[50vw]">
            <Card
              containerClassName="bg-background  p-4 rounded-none shadow-none"
              padding="lg"
            >
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    required
                    useLabel
                    placeholder="Enter your first name"
                    inputSize="md"
                    fullWidth
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    required
                    useLabel
                    placeholder="Enter your last name"
                    inputSize="md"
                    fullWidth
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    useLabel
                    placeholder="Enter your email address"
                    inputSize="md"
                    fullWidth
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    useLabel
                    placeholder="Enter your phone number"
                    inputSize="md"
                    fullWidth
                  />
                </div>

                <Select
                  label="Subject"
                  name="subject"
                  required
                  useLabel
                  placeholder="Select a subject"
                  options={subjectOptions}
                  inputSize="md"
                  fullWidth
                />

                <Textarea
                  label="Message"
                  name="message"
                  required
                  useLabel
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  inputSize="md"
                  fullWidth
                />

                <div className="flex items-center gap-3">
                  <input
                    id={newsletterId}
                    type="checkbox"
                    name="newsletter"
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label
                    htmlFor={newsletterId}
                    className="text-sm text-muted-foreground"
                  >
                    Subscribe to our newsletter for updates and food inspiration
                  </label>
                </div>

                <div className="text-center">
                  <Button
                    text="Send Message"
                    variant="solid"
                    color="primary"
                    size="lg"
                    type="submit"
                    onClick={() => {}}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
                  />
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-10 px-4 md:px-14 mb-4 md:mb-10">
        <div className="border border-foreground p-4">
          <div className="text-center mb-8">
            <h2 className="text-md md:text-lg font-light mb-4 tracking-tight text-foreground">
              Business Hours
            </h2>
            <h2 className="text-lg text-center leading-relaxed font-medium text-foreground max-w-2xl mx-auto">
              When you can expect to hear back from us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-4 text-foreground">
                Customer Support
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM GMT
                </p>
                <p>
                  <strong>Saturday:</strong> 10:00 AM - 4:00 PM GMT
                </p>
                <p>
                  <strong>Sunday:</strong> Closed
                </p>
              </div>
            </div>

            <div className="text-center p-6 border border-foreground/20 rounded-none">
              <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-medium mb-4 text-foreground">
                Email Response
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>General Inquiries:</strong> Within 24 hours
                </p>
                <p>
                  <strong>Support Issues:</strong> Within 4 hours
                </p>
                <p>
                  <strong>Partnership:</strong> Within 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-10 px-4 md:px-14">
        <div className="border border-foreground p-8">
          <div className="text-center">
            <h2 className="text-md md:text-lg font-light mb-4 tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <h2 className="text-lg text-center leading-relaxed font-medium text-foreground max-w-3xl mx-auto mb-8">
              Can&apos;t find what you&apos;re looking for? Check out our
              comprehensive FAQ section
            </h2>

            <div className="max-w-3xl mx-auto">
              <Accordion
                items={[
                  {
                    id: "faq-1",
                    title: "How do I reset my password?",
                    content:
                      "You can reset your password through the login screen or contact our support team for assistance. We'll guide you through the process step by step.",
                  },
                  {
                    id: "faq-2",
                    title: "How do I report inappropriate content?",
                    content:
                      "Use the report button on any post or contact our moderation team directly. We take content moderation seriously and respond to reports within 24 hours.",
                  },
                  {
                    id: "faq-3",
                    title: "How can restaurants join BiteScout?",
                    content:
                      "Restaurants can apply through our partnership portal or contact our business development team. We'll help you get set up and start reaching new customers.",
                  },
                  {
                    id: "faq-4",
                    title: "Is BiteScout available internationally?",
                    content:
                      "Currently launching in Cardiff, Wales with plans to expand to other UK cities and internationally. Stay tuned for updates on new locations.",
                  },
                  {
                    id: "faq-5",
                    title: "What payment methods do you accept?",
                    content:
                      "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our trusted payment partners.",
                  },
                  {
                    id: "faq-6",
                    title: "How do I contact customer support?",
                    content:
                      "You can reach our customer support team via email at support@bitescout.com, phone at +44 (0) 123 456 789, or through our live chat during business hours.",
                  },
                ]}
                variant="default"
                size="md"
                allowMultiple={true}
                defaultOpen={["faq-1"]}
                containerClassName="text-left"
              />
            </div>

            <div className="mt-8 text-center">
              <Button
                text="View All FAQs"
                variant="solid"
                color="neutral"
                size="lg"
                onClick={() => {}}
                className="bg-card text-card-foreground hover:bg-card/90 border border-foreground/20 rounded-none"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
