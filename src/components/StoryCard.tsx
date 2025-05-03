
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface StoryCardProps {
  id: string;
  title: string;
  authorName: string;
  relationship: string;
  excerpt: string;
}

const StoryCard = ({ id, title, authorName, relationship, excerpt }: StoryCardProps) => {
  return (
    <Card className="h-full flex flex-col border-l-4 border-indigo-400 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <h3 className="font-bold text-xl text-indigo-700">{title}</h3>
        <div className="text-sm text-gray-600 italic">
          By {authorName} • {relationship}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Link
          to={`/stories/${id}`}
          className="inline-block text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Read full story →
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
