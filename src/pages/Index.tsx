
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import { Link } from "react-router-dom";
import { ArrowRight, Book, Users, Lightbulb, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div>
      <Hero
        title="Understanding Autism Together"
        subtitle="Building awareness, fostering acceptance, and creating a supportive community for individuals on the autism spectrum and their families."
        ctaText="Learn More"
        ctaLink="/about"
        imageSrc="https://www.synlab-sd.com/wp-content/uploads/2024/08/SYNLAB_Blog-Autismo_IMG-INTERNA_INFOGRAFICO_ingles.jpg"
      />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-800">What is Autism Spectrum Disorder?</h2>
            <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
              Autism, or Autism Spectrum Disorder (ASD), is a complex neurodevelopmental condition characterized 
              by challenges with social skills, repetitive behaviors, speech, and nonverbal communication.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link to="/about">
              <Button variant="outline" className="flex items-center gap-2">
                Learn more about autism <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">
            Explore Our Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoCard
              title="About Autism"
              content="Learn about the signs, symptoms, and diagnosis of autism spectrum disorder."
              linkTo="/about"
              linkText="Read More"
              className="h-full"
              imageSrc="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop"
            />
            <InfoCard
              title="Real Stories"
              content="Read personal experiences from people with autism and their families."
              linkTo="/stories"
              linkText="Read Stories"
              className="h-full"
              imageSrc="https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop"
            />
            <InfoCard
              title="Support & Resources"
              content="Find helpful resources, therapies, and community support options."
              linkTo="/resources"
              linkText="Find Support"
              className="h-full"
              imageSrc="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop"
            />
            <InfoCard
              title="Activities & Tools"
              content="Access autism-friendly activities, tools, and educational materials."
              linkTo="/activities"
              linkText="Explore"
              className="h-full"
              imageSrc="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop"
            />
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6">Get Involved</h2>
            <p className="text-xl text-gray-700 mb-8">
              Your support can make a difference in the lives of individuals with autism and their families.
              Whether you want to share your story, volunteer, or simply learn more, we welcome your involvement.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/stories/submit">
                <Button variant="default" size="lg" className="w-full flex items-center justify-center gap-2">
                  <Book size={18} /> Share Your Story
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="w-full flex items-center justify-center gap-2">
                  <Heart size={18} /> Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
