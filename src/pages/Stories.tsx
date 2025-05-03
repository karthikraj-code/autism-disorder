
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
        imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop"
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
