
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface InfoCardProps {
  title: string;
  content: string | ReactNode;
  imageSrc?: string;
  linkTo?: string;
  linkText?: string;
  className?: string;
}

const InfoCard = ({
  title,
  content,
  imageSrc,
  linkTo,
  linkText,
  className = "",
}: InfoCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {imageSrc && (
        <img
          className="w-full h-48 object-cover"
          src={imageSrc}
          alt={title}
        />
      )}
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2 text-indigo-700">{title}</h3>
        <div className="text-gray-700 mb-4">{content}</div>
        {linkTo && linkText && (
          <Link
            to={linkTo}
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
