
import Hero from "@/components/Hero";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle } from "lucide-react";

const About = () => {
  return (
    <div>
      <Hero
        title="Understanding Autism"
        subtitle="Learn about autism spectrum disorder, its characteristics, and how it affects individuals differently."
        imageSrc="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop"
      />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">What is Autism Spectrum Disorder?</h2>
          
          <div className="prose lg:prose-lg max-w-none">
            <p>
              Autism spectrum disorder (ASD) is a complex neurodevelopmental condition that affects communication, 
              social interaction, and behavior in varying degrees. It is referred to as a "spectrum" disorder 
              because there is wide variation in the type and severity of symptoms people experience.
            </p>
            
            <p>
              ASD occurs in all ethnic, racial, and economic groups. Although ASD can be a lifelong disorder, 
              treatments and services can improve a person's symptoms and ability to function.
            </p>
            
            <h3 className="text-2xl font-semibold text-indigo-700 mt-8 mb-4">Common Characteristics</h3>
            
            <p>People with ASD often have:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>Difficulty with communication and interaction with other people</li>
              <li>Restricted interests and repetitive behaviors</li>
              <li>Symptoms that affect their ability to function in school, work, and other areas of life</li>
            </ul>
            
            <p>
              Autism is also often accompanied by sensory sensitivities and medical issues such as 
              gastrointestinal (GI) disorders, seizures or sleep disorders, as well as mental health 
              challenges such as anxiety, depression, and attention issues.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">Common Myths vs Facts</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <XCircle className="text-red-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Myth: Autism is caused by vaccines</h3>
                  <p className="text-gray-700">
                    Extensive research has conclusively demonstrated that there is no link between autism and vaccines. 
                    This myth originated from a discredited study that has since been retracted.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fact: Autism is a spectrum</h3>
                  <p className="text-gray-700">
                    Autism presents differently in each individual. Some people may need significant support in their 
                    daily lives, while others may need less support and, in some cases, live entirely independently.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <XCircle className="text-red-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Myth: People with autism don't have feelings</h3>
                  <p className="text-gray-700">
                    People with autism absolutely have feelings and can form deep emotional bonds. They may express or 
                    process emotions differently, but they experience the full range of human emotions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fact: Early intervention helps</h3>
                  <p className="text-gray-700">
                    Research shows that early intervention services can greatly improve a child's development. 
                    These services can help children from birth to 3 years old learn important skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-indigo-800 mb-6">Signs and Symptoms</h2>
          
          <div className="prose lg:prose-lg max-w-none">
            <p>
              The signs and symptoms of autism usually appear in the first three years of life, although some 
              children show hints of future problems within the first 12 months. These signs may include:
            </p>
            
            <h3 className="text-2xl font-semibold text-indigo-700 mt-8 mb-4">Social Communication and Interaction</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Difficulty establishing and maintaining back-and-forth interactions</li>
              <li>Limited use of eye contact, facial expressions, and gestures</li>
              <li>Challenges developing and maintaining relationships</li>
              <li>Difficulty understanding others' perspectives</li>
              <li>Not responding to their name by 9 months of age</li>
            </ul>
            
            <h3 className="text-2xl font-semibold text-indigo-700 mt-8 mb-4">Restrictive or Repetitive Behaviors</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Repetitive movements or speech patterns</li>
              <li>Rigid routines and resistance to change</li>
              <li>Highly specific interests that are unusual in intensity or focus</li>
              <li>Unusual reactions to sensory input (hyper- or hyposensitivity)</li>
              <li>Strong attachment to unusual objects</li>
            </ul>
            
            <p className="mt-6">
              If you're concerned about your child's development, don't wait. Talk to your doctor about 
              screening your child for autism. The earlier a child receives support, the better the outcome.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
