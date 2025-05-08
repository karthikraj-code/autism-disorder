
import Hero from "@/components/Hero";
import InfoCard from "@/components/InfoCard";
import { Separator } from "@/components/ui/separator";
import { Download, Volume2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";

const Activities = () => {
  // State for audio player
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Audio tracks
  const tracks = [
    { 
      id: 1, 
      title: "Gentle Rain", 
      description: "Calming rain sounds for relaxation and focus",
      src: "https://soundbible.com/mp3/rain_thunder-mike-koenig.mp3",
      duration: "1:22"
    },
    { 
      id: 2, 
      title: "Ocean Waves", 
      description: "Peaceful ocean sounds to reduce anxiety",
      src: "https://soundbible.com/mp3/Ocean_Waves-Mike_Koenig-980635567.mp3",
      duration: "0:14"
    },
    { 
      id: 3, 
      title: "White Noise", 
      description: "Consistent white noise for sensory regulation",
      src: "https://soundbible.com/mp3/White-Noise-SoundBible.com-1665936212.mp3",
      duration: "0:05"
    }
  ];

  // Handle play/pause toggle
  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        if (currentTrack !== trackId) {
          setCurrentTrack(trackId);
          const track = tracks.find(t => t.id === trackId);
          if (track) {
            audioRef.current.src = track.src;
            audioRef.current.volume = volume / 100;
          }
        }
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            console.error("Error playing audio:", error);
          });
      }
    }
  };

  // Update volume
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Update progress bar
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(currentProgress);
          setDuration(audioRef.current.duration);
        }
      }, 100);
    } else if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying]);

  // Handle track end
  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  return (
    <div>
      <Hero
        title="Activities & Tools"
        subtitle="Explore autism-friendly activities, educational resources, and helpful tools for individuals on the spectrum."
      />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">
            Calming Music
          </h2>
          
          <div className="max-w-3xl mx-auto mb-12 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-indigo-700">Audio Player</h3>
                <div className="flex items-center">
                  <Volume2 size={18} className="text-gray-600 mr-2" />
                  <Slider
                    className="w-28"
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
              
              {isPlaying && (
                <div className="mb-4">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              <div className="space-y-4 mt-6">
                {tracks.map((track) => (
                  <div key={track.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Toggle
                      pressed={currentTrack === track.id && isPlaying}
                      onPressedChange={() => togglePlay(track.id)}
                      className="h-10 w-10 rounded-full flex items-center justify-center mr-4 bg-indigo-100 hover:bg-indigo-200"
                      aria-label={isPlaying && currentTrack === track.id ? "Pause" : "Play"}
                    >
                      {isPlaying && currentTrack === track.id ? (
                        <Pause size={18} className="text-indigo-700" />
                      ) : (
                        <Play size={18} className="text-indigo-700" />
                      )}
                    </Toggle>
                    <div>
                      <h4 className="font-medium text-gray-800">{track.title}</h4>
                      <p className="text-sm text-gray-600">{track.description}</p>
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      {track.duration}
                    </div>
                  </div>
                ))}
              </div>

              <audio ref={audioRef} className="hidden" />

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Listening to calming sounds can help reduce anxiety, improve focus, and provide sensory regulation for individuals on the autism spectrum.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-12" />
          
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

// Helper function to format time in MM:SS
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default Activities;
