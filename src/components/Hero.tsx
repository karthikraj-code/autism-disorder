
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  ctaText?: string;
  ctaLink?: string;
}

const Hero = ({ title, subtitle, imageSrc, ctaText, ctaLink }: HeroProps) => {
  return (
    <div className="relative bg-indigo-50 overflow-hidden">
      {imageSrc && (
        <div className="absolute inset-0 opacity-25">
          <img
            src={imageSrc}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-indigo-800 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-800">
            {subtitle}
          </p>
          {ctaText && ctaLink && (
            <div className="mt-8 flex justify-center">
              <Link
                to={ctaLink}
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
