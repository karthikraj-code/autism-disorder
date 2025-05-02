
import { Link } from "react-router-dom";

interface StoryCardProps {
  id: string;
  title: string;
  authorName: string;
  relationship: string;
  excerpt: string;
}

const StoryCard = ({ id, title, authorName, relationship, excerpt }: StoryCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-400">
      <h3 className="font-bold text-xl mb-2 text-indigo-700">{title}</h3>
      <div className="mb-4">
        <span className="text-sm text-gray-600 italic">
          By {authorName} • {relationship}
        </span>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}</p>
      <Link
        to={`/stories/${id}`}
        className="inline-block text-indigo-600 hover:text-indigo-800 font-medium"
      >
        Read full story →
      </Link>
    </div>
  );
};

export default StoryCard;
