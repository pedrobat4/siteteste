"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { blogPosts, testimonials, expertiseAreas } from "@/lib/data";
import Link from "next/link";

const iconMap: { [key: string]: React.ElementType } = {
  Briefcase: LucideIcons.Briefcase,
  HeartHandshake: LucideIcons.HeartHandshake,
  Home: LucideIcons.Home,
  Shield: LucideIcons.Shield,
  Gavel: LucideIcons.Gavel,
  FileText: LucideIcons.FileText,
};

export default function HomePage() {
  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary mb-4">
            Clarity in Complexity. Justice for You.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            LexPro offers expert legal counsel with a commitment to integrity and achieving the best outcomes for our clients.
          </p>
          <div>
            <Button size="lg" asChild>
              <Link href="#contact">Schedule a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image 
                src="https://placehold.co/600x700.png"
                alt="Lawyer Jane Doe"
                width={600}
                height={700}
                className="rounded-lg shadow-2xl"
                data-ai-hint="lawyer portrait"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">Meet Jane Doe, Esq.</h2>
              <p className="text-lg text-muted-foreground mb-4">
                With over 15 years of experience in corporate and family law, Jane Doe has built a reputation for her sharp legal mind, unwavering dedication to her clients, and a compassionate approach to sensitive legal matters.
              </p>
              <p className="text-lg text-muted-foreground">
                A graduate of Harvard Law School, Jane founded LexPro with the vision of creating a modern law firm that combines traditional legal excellence with innovative, client-focused solutions. She is committed to demystifying the law and empowering her clients with knowledge and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section id="expertise" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary text-center mb-12">Areas of Expertise</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area) => {
              const Icon = iconMap[area.icon];
              return (
                <Card key={area.title} className="text-center h-full hover:shadow-lg transition-shadow transform hover:-translate-y-1 duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
                      {Icon && <Icon className="w-8 h-8" />}
                    </div>
                    <CardTitle className="font-headline">{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary text-center mb-12">What Our Clients Say</h2>
          <Carousel opts={{ loop: true }} className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardContent className="text-center pt-6">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => <LucideIcons.Star key={i} className="text-yellow-400 fill-current" />)}
                      </div>
                      <p className="text-xl italic text-foreground mb-6">"{testimonial.quote}"</p>
                      <p className="font-bold font-headline text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary text-center mb-12">From Our Blog</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Card key={post.slug} className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <Image 
                  src={post.image.src}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                  data-ai-hint={post.image.hint}
                />
                <CardHeader>
                  <CardTitle className="font-headline text-xl h-16">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 text-accent">
                    <Link href={`/blog/${post.slug}`}>Read More →</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary text-center mb-12">Get In Touch</h2>
          <Card className="max-w-2xl mx-auto p-6 md:p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Please describe your legal issue." rows={5} />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">Send Message</Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
