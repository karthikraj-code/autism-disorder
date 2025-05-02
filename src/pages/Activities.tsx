
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Activities = () => {
  return (
    <div>
      <Hero
        title="Activities & Tools"
        subtitle="Explore autism-friendly activities, educational resources, and helpful tools for individuals on the spectrum."
      />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">
            Sensory Activities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <InfoCard
              title="Sensory Bottle"
              content={
                <div>
                  <p className="mb-2">Create a calming sensory bottle with water, glitter, and food coloring.</p>
                  <p className="mb-4">Watching the glitter slowly float is soothing and can help regulate emotions.</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Empty water bottle</li>
                    <li>Clear glue or glycerin</li>
                    <li>Glitter or small objects</li>
                    <li>Food coloring (optional)</li>
                  </ul>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Tactile Bins"
              content={
                <div>
                  <p className="mb-2">Fill containers with materials of different textures for sensory exploration.</p>
                  <p className="mb-4">Good options include rice, beans, water beads, or kinetic sand.</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Large plastic bin</li>
                    <li>Filling material (rice, sand, etc.)</li>
                    <li>Small toys or objects to hide</li>
                    <li>Scoops or containers</li>
                  </ul>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Homemade Slime"
              content={
                <div>
                  <p className="mb-2">Create slime for a fun tactile experience that can be calming and engaging.</p>
                  <p className="mb-4">Basic recipe: mix 1/2 cup white glue with 1/2 cup liquid starch.</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>White school glue</li>
                    <li>Liquid starch or borax solution</li>
                    <li>Food coloring (optional)</li>
                    <li>Glitter or beads (optional)</li>
                  </ul>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Bubble Play"
              content={
                <div>
                  <p className="mb-2">Bubbles provide visual stimulation and can encourage movement and interaction.</p>
                  <p className="mb-4">Try different bubble wands and techniques for varied experiences.</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Bubble solution</li>
                    <li>Various bubble wands</li>
                    <li>Large containers for giant bubbles</li>
                  </ul>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Light Table Activities"
              content={
                <div>
                  <p className="mb-2">Use a light table or box for visually stimulating play with translucent objects.</p>
                  <p className="mb-4">Try colored shapes, X-rays, or water beads on the light source.</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>DIY light box (clear container with lights)</li>
                    <li>Colored transparent objects</li>
                    <li>Colored cellophane</li>
                  </ul>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Weighted Activities"
              content={
                <div>
                  <p className="mb-2">Use weighted items like blankets or lap pads to provide proprioceptive input.</p>
                  <p className="mb-4">This can have a calming effect for many people with autism.</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Weighted blankets (10% of body weight)</li>
                    <li>Weighted stuffed animals</li>
                    <li>Compression vests or weighted vests</li>
                  </ul>
                </div>
              }
              className="h-full"
            />
          </div>
          
          <Separator className="my-12" />
          
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">
            Educational Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <InfoCard
              title="Visual Schedules"
              content={
                <div>
                  <p className="mb-2">Help provide structure and predictability through visual representations of daily activities.</p>
                  <p className="mb-4">Can reduce anxiety and support transitions between activities.</p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 mt-2">
                    <Download size={16} />
                    Download Template
                  </Button>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Social Stories"
              content={
                <div>
                  <p className="mb-2">Short, personalized stories that describe social situations and appropriate responses.</p>
                  <p className="mb-4">Help prepare for new experiences or navigate challenging social interactions.</p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 mt-2">
                    <Download size={16} />
                    Example Stories
                  </Button>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Communication Cards"
              content={
                <div>
                  <p className="mb-2">Picture cards that help individuals express needs, wants, and feelings.</p>
                  <p className="mb-4">Particularly useful for nonverbal or minimally verbal people.</p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 mt-2">
                    <Download size={16} />
                    Printable Cards
                  </Button>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Emotion Charts"
              content={
                <div>
                  <p className="mb-2">Visual guides that help identify and express different emotions.</p>
                  <p className="mb-4">Can improve emotional awareness and self-regulation.</p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 mt-2">
                    <Download size={16} />
                    Emotion Chart
                  </Button>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Timer Tools"
              content={
                <div>
                  <p className="mb-2">Visual timers help understand the concept of time and prepare for transitions.</p>
                  <p className="mb-4">Options include sand timers, visual countdown apps, or Time Timers®.</p>
                  <p className="text-sm">Recommended apps: Visual Timer, Time Timer</p>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Reward Systems"
              content={
                <div>
                  <p className="mb-2">Token boards or sticker charts to provide positive reinforcement.</p>
                  <p className="mb-4">Help motivate learning and reinforce desired behaviors.</p>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 mt-2">
                    <Download size={16} />
                    Reward Charts
                  </Button>
                </div>
              }
              className="h-full"
            />
          </div>
          
          <Separator className="my-12" />
          
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">
            Calming Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              title="Calming Music"
              content={
                <div>
                  <p className="mb-2">Soft, rhythmic music can help reduce anxiety and promote relaxation.</p>
                  <p className="mb-4">Consider nature sounds, classical music, or specially designed autism-friendly tracks.</p>
                  <div className="bg-indigo-50 p-4 rounded">
                    <audio controls className="w-full">
                      <source src="https://soundbible.com/mp3/rain_thunder-mike-koenig.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    <p className="text-xs mt-2 text-center">Rain and thunder sounds</p>
                  </div>
                </div>
              }
              className="h-full"
            />
            <InfoCard
              title="Breathing Exercises"
              content={
                <div>
                  <p className="mb-2">Simple breathing techniques to reduce anxiety and promote self-regulation.</p>
                  <p className="mb-4">This interactive bubble breathing animation can help guide practice:</p>
                  <div className="bg-indigo-50 p-4 rounded flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-blue-500 mx-auto animate-pulse"></div>
                      <p className="mt-2 text-sm">Breathe in as the circle grows,<br />breathe out as it shrinks</p>
                    </div>
                  </div>
                </div>
              }
              className="h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Activities;
