
import Hero from "@/components/Hero";
import StorySubmissionForm from "@/components/StorySubmissionForm";

const SubmitStory = () => {
  return (
    <div>
      <Hero
        title="Share Your Story"
        subtitle="Your experiences matter. Help others by sharing your journey with autism."
      />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-indigo-800">Tell Your Story</h2>
            <p className="mt-2 text-gray-600">
              Your story can inspire, educate, and provide hope to others in the autism community. 
              All stories will be reviewed before being published to ensure a supportive environment.
            </p>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-6 md:p-8 shadow-sm">
            <StorySubmissionForm />
          </div>
          
          <div className="mt-8 text-sm text-gray-600">
            <p>
              By submitting your story, you agree that it may be published on our website. 
              We reserve the right to edit for clarity or length while preserving the essence of your story.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitStory;
