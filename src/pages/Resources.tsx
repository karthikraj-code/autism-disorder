
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Resources = () => {
  return (
    <div>
      <Hero
        title="Support & Resources"
        subtitle="Find helpful information, support options, and resources for individuals with autism and their families."
      />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="therapy" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="therapy">Therapy Options</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="family">Family Support</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="therapy">
              <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">Therapy Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard
                  title="Applied Behavior Analysis (ABA)"
                  content={
                    <div>
                      <p className="mb-2">ABA therapy uses reinforcement principles to increase helpful behaviors and reduce harmful ones.</p>
                      <p>It's highly structured and can help develop communication, learning, and social skills.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Speech-Language Therapy"
                  content={
                    <div>
                      <p className="mb-2">Helps improve verbal, nonverbal, and social communication skills.</p>
                      <p>May involve alternative communication methods for nonverbal individuals.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Occupational Therapy"
                  content={
                    <div>
                      <p className="mb-2">Helps develop skills needed for independent living and participation in school or work activities.</p>
                      <p>Often addresses sensory processing, fine motor skills, and daily living activities.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Social Skills Training"
                  content={
                    <div>
                      <p className="mb-2">Teaches appropriate social behaviors through modeling and practice.</p>
                      <p>May be delivered one-on-one or in group settings to reinforce peer interaction.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Sensory Integration Therapy"
                  content={
                    <div>
                      <p className="mb-2">Helps individuals who are over or under-sensitive to sensory input.</p>
                      <p>Activities are designed to help regulate responses to sensory experiences.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Cognitive Behavioral Therapy (CBT)"
                  content={
                    <div>
                      <p className="mb-2">Particularly helpful for older children and adults to address anxiety or depression.</p>
                      <p>Helps identify negative thought patterns and develop coping strategies.</p>
                    </div>
                  }
                  className="h-full"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="education">
              <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">Education Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard
                  title="Individualized Education Programs (IEPs)"
                  content={
                    <div>
                      <p className="mb-2">Legal documents that outline special education services a child will receive.</p>
                      <p>Created through collaboration between parents and school staff.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Inclusive Classrooms"
                  content={
                    <div>
                      <p className="mb-2">Educational settings where students with disabilities learn alongside peers without disabilities.</p>
                      <p>Often includes accommodations and modifications to support learning needs.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Specialized Schools"
                  content={
                    <div>
                      <p className="mb-2">Schools specifically designed to meet the needs of students with autism or other developmental disabilities.</p>
                      <p>Often feature small class sizes and specialized teaching approaches.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Home-Based Programs"
                  content={
                    <div>
                      <p className="mb-2">Structured teaching programs delivered in the home environment.</p>
                      <p>Can be customized to a child's specific learning needs and pace.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Assistive Technology"
                  content={
                    <div>
                      <p className="mb-2">Tools and devices that support learning and communication.</p>
                      <p>Examples include speech-generating devices, visual schedules, and specialized apps.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Transition Planning"
                  content={
                    <div>
                      <p className="mb-2">Programs to help teens with autism prepare for adulthood and independence.</p>
                      <p>Focuses on life skills, vocational training, and continuing education options.</p>
                    </div>
                  }
                  className="h-full"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="family">
              <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">Family Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard
                  title="Parent Training"
                  content={
                    <div>
                      <p className="mb-2">Programs that teach parents strategies to support their child's development and manage challenging behaviors.</p>
                      <p>Often delivered by professionals with expertise in autism.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Sibling Support Groups"
                  content={
                    <div>
                      <p className="mb-2">Groups designed to help brothers and sisters understand autism and address their unique concerns.</p>
                      <p>Provides a space for siblings to connect with peers in similar situations.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Respite Care"
                  content={
                    <div>
                      <p className="mb-2">Short-term care that provides temporary relief for primary caregivers.</p>
                      <p>Allows parents and family members time to rest and recharge.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Family Counseling"
                  content={
                    <div>
                      <p className="mb-2">Therapy sessions involving multiple family members to improve communication and resolve conflicts.</p>
                      <p>Helps families adapt and thrive while supporting a loved one with autism.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Financial Resources"
                  content={
                    <div>
                      <p className="mb-2">Information about insurance coverage, government benefits, and grants available to families.</p>
                      <p>Guidance on navigating healthcare and educational systems to access services.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Parent Support Networks"
                  content={
                    <div>
                      <p className="mb-2">Groups that connect parents and caregivers of children with autism.</p>
                      <p>Provides emotional support, practical advice, and shared experiences.</p>
                    </div>
                  }
                  className="h-full"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="community">
              <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">Community Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard
                  title="Autism Organizations"
                  content={
                    <div>
                      <p className="mb-2">National and local organizations dedicated to autism advocacy, research, and support.</p>
                      <p>Examples include Autism Speaks, Autism Society of America, and local chapters.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Sensory-Friendly Events"
                  content={
                    <div>
                      <p className="mb-2">Community activities modified to accommodate sensory sensitivities.</p>
                      <p>Examples include movie screenings, museum hours, and sporting events with reduced noise and lighting.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Social Clubs"
                  content={
                    <div>
                      <p className="mb-2">Groups for individuals with autism to socialize and build friendships in supported environments.</p>
                      <p>Activities may include game nights, art classes, or special interest discussions.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Adult Services"
                  content={
                    <div>
                      <p className="mb-2">Programs supporting adults with autism in areas of employment, housing, and community participation.</p>
                      <p>Includes job coaching, supported living options, and day programs.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Advocacy Resources"
                  content={
                    <div>
                      <p className="mb-2">Information on disability rights and how to advocate effectively for needed services.</p>
                      <p>Guidance on creating systemic change to support the autism community.</p>
                    </div>
                  }
                  className="h-full"
                />
                <InfoCard
                  title="Research Opportunities"
                  content={
                    <div>
                      <p className="mb-2">Information about ongoing studies and how to participate in autism research.</p>
                      <p>Contributing to scientific understanding can help improve future treatments and services.</p>
                    </div>
                  }
                  className="h-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Resources;
