
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import StoryCard from "@/components/StoryCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Story {
  id: string;
  title: string;
  author_name: string;
  relationship: string;
  content: string;
  created_at: string;
}

const Stories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        // Insert some sample stories
        const sampleStories = [
          {
            title: "Finding My Voice Through Art",
            author_name: "Thomas R.",
            relationship: "Person with autism",
            content: "I was diagnosed with autism when I was four years old. Throughout my childhood, I struggled with verbal communication and often felt frustrated when I couldn't express my thoughts and feelings to others. My parents tried various therapies, but what really changed my life was when they signed me up for an art class at age 10.\n\nThe first time I held a paintbrush, something clicked. I could finally express all the things I couldn't say with words. My art teacher was patient and understanding, never forcing me to follow strict guidelines but encouraging me to create in ways that felt natural to me.\n\nToday, at 27, I'm a professional artist with my own gallery showings. My artwork often features intricate patterns and vivid colors that reflect how I see the world. Through my art, I've not only found my voice but also connected with others in ways I never thought possible. Art has become my language, my therapy, and my passion.\n\nFor anyone on the autism spectrum struggling to find their way to express themselves, I encourage you to explore different mediums until you find what speaks to you. For me, it was painting, but it could be music, writing, dance, or something entirely different for you. The key is to not give up until you find your voice.",
          },
          {
            title: "Our Journey: Raising a Daughter with Autism",
            author_name: "Jennifer and Mark K.",
            relationship: "Parent",
            content: "When our daughter Sophia was diagnosed with autism at age 3, we felt overwhelmed and uncertain about the future. The early days were filled with countless therapy appointments, IEP meetings, and learning everything we could about autism.\n\nOne of our biggest challenges was helping Sophia navigate social situations. While she was incredibly bright and had an amazing memory for facts about her special interests (particularly marine biology), she struggled to understand social cues and make friends. We watched her experience rejection and confusion, which broke our hearts.\n\nA turning point came when we found a social skills group specifically for girls with autism. The program recognized that autism often presents differently in girls and tailored their approach accordingly. Sophia flourished in this environment, making her first real friendships and developing strategies for social interactions.\n\nAnother game-changer was finding a school with a truly inclusive approach. Rather than just placing Sophia in a mainstream classroom without support, this school embraced neurodiversity and adapted their teaching methods to suit different learning styles. Her teachers recognized her strengths and built on them, while providing support for areas where she struggled.\n\nSophia is now 16 and thriving. She's still passionate about marine biology and is already taking college-level courses in the subject. She has a small but solid group of friends who appreciate her unique perspective and quirky sense of humor.\n\nTo other parents beginning this journey, we'd say: trust your instincts, celebrate the small victories, find your community, and never stop advocating for your child. The path isn't always easy, but it is incredibly rewarding. Sophia has taught us more about perseverance, different ways of thinking, and unconditional love than we ever thought possible.",
          },
          {
            title: "My Brother, My Hero",
            author_name: "Maya L.",
            relationship: "Sibling",
            content: "Growing up with an older brother with autism shaped my life in ways I'm still discovering. Ethan is five years older than me, and for as long as I can remember, he's been both my biggest challenge and my greatest teacher.\n\nAs children, our relationship wasn't always easy. I sometimes felt jealous of the extra attention he received from our parents. There were birthday parties and family gatherings that ended abruptly due to Ethan becoming overwhelmed. I didn't always understand why we had to leave or why our family seemed different from others.\n\nBut alongside these challenges were moments of pure joy and connection. Ethan has an encyclopedic knowledge of trains and can recall the most obscure details about railway systems around the world. Some of my favorite childhood memories are of us sitting together with his train books, listening to him excitedly explain everything from steam engines to maglev technology.\n\nAs I grew older, I began to see how society treated Ethan differently, sometimes with ignorance or cruelty. Watching him navigate a world that wasn't built for him, yet still maintain his kindness and authenticity, made me fiercely protective and gave me a passion for disability rights and advocacy.\n\nEthan is now 30 and lives semi-independently. He works at a library where his attention to detail and organizational skills are valued. We still share a close bond, though it looks different than typical sibling relationships. He's taught me patience, acceptance, and how to see the world from different perspectives.\n\nTo other siblings of people with autism: your feelings—whether it's frustration, pride, worry, or love—are all valid. Find people you can talk to honestly about your experiences. And know that the unique relationship you have with your sibling, while sometimes complicated, can be one of the most rewarding connections in your life.",
          },
          {
            title: "Embracing Neurodiversity in the Classroom",
            author_name: "Dr. Rebecca M.",
            relationship: "Professional",
            content: "After 25 years as a special education teacher and now as an educational consultant, I've witnessed enormous changes in how we approach autism in schools. When I first started teaching in the late 1990s, the focus was heavily on making autistic students conform to neurotypical expectations—often at the cost of their self-esteem and mental health.\n\nOne student in particular changed my perspective early in my career. Connor was labeled as \"difficult\" and \"non-compliant\" by previous teachers. He struggled with traditional classroom setups—the fluorescent lighting, unexpected schedule changes, and requirement to sit still for long periods were all enormous challenges for him. Rather than trying to force him to adapt, I began adapting the environment instead. We found alternatives to fluorescent lighting, created a predictable visual schedule, and established a quiet corner where he could take breaks when feeling overwhelmed.\n\nThe transformation was remarkable. Once Connor's sensory and routine needs were accommodated, his natural intelligence, creativity, and humor emerged. He went from being constantly in crisis to becoming an engaged learner who looked forward to school.\n\nThis experience taught me that behavior is communication. When autistic students act out, it's often because their needs aren't being met or they're trying to cope with an overwhelming environment. Instead of asking \"How do we change this student?\" we should ask \"How do we change our approach?\"\n\nOver the years, I've developed what I call the Three A's approach: Acceptance, Accommodation, and Appreciation. Accept autistic students as they are rather than viewing them through a deficit lens. Accommodate their needs rather than forcing them to endure environments that cause distress. And appreciate the unique perspectives and strengths they bring to the classroom.\n\nThe most successful educational environments I've seen are those where neurodiversity is truly embraced—where stimming isn't punished, special interests are incorporated into learning, and differences in social interaction are respected rather than pathologized. In these environments, all students benefit from a culture that values diverse ways of thinking and being.\n\nMy greatest hope is that the next generation of educators will begin with the presumption of competence for all learners and create truly inclusive spaces where autistic students don't just survive but thrive.",
          },
          {
            title: "Finding My Tribe at 40",
            author_name: "Alex J.",
            relationship: "Person with autism",
            content: "I received my autism diagnosis at age 40, and it was like finally finding the missing piece of a puzzle I'd been trying to solve my entire life.\n\nFor decades, I'd struggled with sensory sensitivities, social confusion, and intense special interests without understanding why. I was labeled \"gifted but underachieving\" in school, \"difficult\" in relationships, and \"not a team player\" at work. I developed elaborate coping mechanisms and spent exhausting amounts of energy trying to appear 'normal,' often collapsing in private after social interactions.\n\nThe journey to diagnosis began when my 8-year-old nephew was diagnosed with autism. As my sister described his experiences, I felt a shock of recognition. So many of his challenges mirrored my own, though they presented differently. I began researching autism in adults, particularly how it manifests in women and people who were assigned female at birth like myself. The more I read, the more my life made sense.\n\nReceiving the official diagnosis brought a complex mix of emotions—grief for the years spent blaming myself for struggles that weren't my fault, but also immense relief and self-understanding. For the first time, I had context for both my challenges and strengths.\n\nPost-diagnosis, the most transformative experience has been connecting with the autistic community. After a lifetime of feeling like an alien trying to pass as human, I finally found my tribe. In online forums and local support groups, I meet people who instinctively understand things I've never been able to explain to neurotypical people—the sensory overwhelm in grocery stores, the exhaustion of masking, the intensity of special interests.\n\nI've learned to unmask more, to accommodate my sensory needs without shame, and to recognize that my different neurotype comes with genuine strengths—pattern recognition, deep focus, and a creative approach to problem-solving among them.\n\nTo anyone discovering they're autistic later in life: It's never too late to get to know your authentic self. The journey isn't always easy, but understanding yourself through this lens can bring clarity, community, and a sense of coming home to who you truly are.",
          }
        ];

        // Check if stories already exist to avoid duplicates
        const { data: existingStories } = await supabase
          .from("stories")
          .select("id")
          .eq("approved", true);
        
        // Only insert sample stories if there are none or few existing approved stories
        if (!existingStories || existingStories.length < 3) {
          for (const story of sampleStories) {
            await supabase.from("stories").insert({
              ...story,
              approved: true
            });
          }
        }

        // Fetch stories from the database
        const { data, error } = await supabase
          .from("stories")
          .select("*")
          .eq("approved", true)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setStories(data || []);
      } catch (err: any) {
        console.error("Error fetching stories:", err);
        setError(err.message || "Failed to load stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const getExcerpt = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return `${content.substring(0, maxLength).trim()}...`;
  };

  return (
    <div>
      <Hero
        title="Real Stories"
        subtitle="Read personal experiences from individuals on the autism spectrum, their families, and caregivers."
        imageSrc="https://cdn-backh.nitrocdn.com/dCALSdIiVdoMTPjGUvaWbestYlcjPtwz/assets/images/optimized/rev-04cbad2/www.autismparentingmagazine.com/wp-content/uploads/2023/10/Social-Stories-for-Autistic-Children-2.jpg"
      />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-indigo-800">Personal Journeys</h2>
              <p className="mt-2 text-gray-600">
                Everyone's experience with autism is unique. These stories offer glimpses into different perspectives.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/stories/submit">
                <Button>Share Your Story</Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-700" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No stories have been shared yet.</p>
              <p className="mt-2 text-gray-600">Be the first to share your experience!</p>
              <Link to="/stories/submit" className="mt-4 inline-block">
                <Button>Share Your Story</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  authorName={story.author_name}
                  relationship={story.relationship}
                  excerpt={getExcerpt(story.content)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Stories;
