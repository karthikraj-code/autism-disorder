
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface Story {
  id: string;
  title: string;
  author_name: string;
  relationship: string;
  content: string;
  created_at: string;
}

const StoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from("stories")
          .select("*")
          .eq("id", id)
          .eq("approved", true)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error("Story not found");
        }

        setStory(data);
      } catch (err: any) {
        console.error("Error fetching story:", err);
        setError(err.message || "Failed to load story");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      return "Unknown date";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-700" />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {error || "Story not found"}
        </h2>
        <p className="text-gray-600 mb-6">
          The story you're looking for could not be found or may have been removed.
        </p>
        <Button onClick={() => navigate("/stories")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link to="/stories" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
      </Link>

      <article className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
          {story.title}
        </h1>
        
        <div className="flex items-center text-gray-600 mb-6">
          <div>
            <p className="text-sm">
              By <span className="font-medium">{story.author_name}</span> • {story.relationship}
            </p>
            <p className="text-xs">
              Shared on {formatDate(story.created_at)}
            </p>
          </div>
        </div>

        <div className="prose lg:prose-lg max-w-none">
          {story.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Everyone's journey with autism is unique. Would you like to share yours?
        </p>
        <Link to="/stories/submit">
          <Button>Share Your Story</Button>
        </Link>
      </div>
    </div>
  );
};

export default StoryDetail;
