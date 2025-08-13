"use client"

import { Accordion, Button, Input, Select, Textarea } from "@/components/atoms";
import { Footer, Navbar } from "@/components/molecules";
import { Card } from "@/components/organisms";
import { Clock, HelpCircle, Mail, MapPin, MessageCircle, Phone, Star, Users } from "lucide-react";

export default function Contact() {
  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "partnership", label: "Restaurant Partnership" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "bug", label: "Report a Bug" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-light">
            Have questions about BiteScout? We&apos;d love to hear from you. 
            Our team is here to help with any inquiries or support you need.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Contact Information
            </h2>
            <p className="text-xl text-card-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Multiple ways to reach our team and get the support you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              className="text-center"
              containerClassName="bg-background hover:shadow-xl transition-all duration-300"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Email Support</h3>
              <p className="text-card-foreground mb-6 leading-relaxed font-light">
                Get help with your account, technical issues, or general questions
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">General Inquiries</p>
                  <a href="mailto:hello@bitescout.com" className="text-primary hover:text-primary/80 transition-colors">
                    hello@bitescout.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Support</p>
                  <a href="mailto:support@bitescout.com" className="text-primary hover:text-primary/80 transition-colors">
                    support@bitescout.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Restaurants</p>
                  <a href="mailto:partners@bitescout.com" className="text-primary hover:text-primary/80 transition-colors">
                    partners@bitescout.com
                  </a>
                </div>
              </div>
            </Card>

            <Card 
              className="text-center"
              containerClassName="bg-background hover:shadow-xl transition-all duration-300"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Phone Support</h3>
              <p className="text-card-foreground mb-6 leading-relaxed font-light">
                Speak directly with our customer support team
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">Customer Support</p>
                  <a href="tel:+44123456789" className="text-secondary hover:text-secondary/80 text-xl font-semibold transition-colors">
                    +44 (0) 123 456 789
                  </a>
                </div>
                <p className="text-sm text-card-foreground">Monday - Friday, 9:00 AM - 6:00 PM GMT</p>
              </div>
            </Card>

            <Card 
              className="text-center"
              containerClassName="bg-background hover:shadow-xl transition-all duration-300"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Office Location</h3>
              <p className="text-card-foreground mb-6 leading-relaxed font-light">
                Visit our headquarters in Cardiff, Wales
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">BiteScout HQ</p>
                  <div className="text-card-foreground space-y-1">
                    <p>123 Food Street</p>
                    <p>Cardiff Bay</p>
                    <p>Cardiff, CF10 4UQ</p>
                    <p>United Kingdom</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Support Options
            </h2>
            <p className="text-xl text-card-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Choose the best way to get help based on your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card 
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Help Center</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Comprehensive guides and FAQs for common questions
              </p>
            </Card>

            <Card 
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Live Chat</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Real-time support during business hours
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
              <h3 className="text-xl font-bold text-foreground mb-4">Community</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Connect with other users in our community forum
              </p>
            </Card>

            <Card 
              className="text-center hover:bg-card/90 transition-all duration-300"
              containerClassName="bg-card hover:shadow-xl"
              padding="lg"
              shadow="lg"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Feedback</h3>
              <p className="text-card-foreground text-sm leading-relaxed font-light">
                Share your ideas and suggestions for improvement
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
              Send Us a Message
            </h2>
            <p className="text-xl text-card-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Fill out the form below and we&apos;ll get back to you as soon as possible
            </p>
          </div>

          <Card 
            className=""
            containerClassName="bg-background"
            padding="lg"
            shadow="lg"
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
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="newsletter" className="text-sm text-card-foreground">
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
      </section>

      {/* Business Hours */}
      <section className="py-24 px-4 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <Clock className="w-10 h-10 text-primary mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Business Hours</h2>
          </div>
          <p className="text-xl text-background/80 mb-12 font-light leading-relaxed">
            When you can expect to hear back from us
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-primary">Customer Support</h3>
              <div className="space-y-3 text-background/80">
                <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM GMT</p>
                <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM GMT</p>
                <p><strong>Sunday:</strong> Closed</p>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-primary">Email Response</h3>
              <div className="space-y-3 text-background/80">
                <p><strong>General Inquiries:</strong> Within 24 hours</p>
                <p><strong>Support Issues:</strong> Within 4 hours</p>
                <p><strong>Partnership:</strong> Within 48 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-card-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Check out our comprehensive FAQ section
          </p>
          
          <div className="max-w-3xl mx-auto">
            <Accordion
              items={[
                {
                  id: 'faq-1',
                  title: 'How do I reset my password?',
                  content: 'You can reset your password through the login screen or contact our support team for assistance. We\'ll guide you through the process step by step.',
                },
                {
                  id: 'faq-2',
                  title: 'How do I report inappropriate content?',
                  content: 'Use the report button on any post or contact our moderation team directly. We take content moderation seriously and respond to reports within 24 hours.',
                },
                {
                  id: 'faq-3',
                  title: 'How can restaurants join BiteScout?',
                  content: 'Restaurants can apply through our partnership portal or contact our business development team. We\'ll help you get set up and start reaching new customers.',
                },
                {
                  id: 'faq-4',
                  title: 'Is BiteScout available internationally?',
                  content: 'Currently launching in Cardiff, Wales with plans to expand to other UK cities and internationally. Stay tuned for updates on new locations.',
                },
                {
                  id: 'faq-5',
                  title: 'What payment methods do you accept?',
                  content: 'We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our trusted payment partners.',
                },
                {
                  id: 'faq-6',
                  title: 'How do I contact customer support?',
                  content: 'You can reach our customer support team via email at support@bitescout.com, phone at +44 (0) 123 456 789, or through our live chat during business hours.',
                },
              ]}
              variant="default"
              size="md"
              allowMultiple={true}
              defaultOpen={['faq-1']}
              containerClassName="text-left"
            />
          </div>
          
          <div className="mt-12">
            <Button
              text="View All FAQs"
              variant="solid"
              color="primary"
              size="lg"
              onClick={() => {}}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
