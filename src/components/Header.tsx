
import { Link } from "react-router-dom";
import UserButton from "@/components/UserButton";

const Header = () => {
  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Autism Spectrum Connect</Link>
        
        <div className="flex items-center mt-4 md:mt-0">
          <nav className="mr-6">
            <ul className="flex flex-wrap justify-center gap-6">
              <li><Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-indigo-200 transition-colors">About Autism</Link></li>
              <li><Link to="/stories" className="hover:text-indigo-200 transition-colors">Real Stories</Link></li>
              <li><Link to="/resources" className="hover:text-indigo-200 transition-colors">Support & Resources</Link></li>
              <li><Link to="/activities" className="hover:text-indigo-200 transition-colors">Activities & Tools</Link></li>
              <li><Link to="/prediction" className="hover:text-indigo-200 transition-colors">Screening Tool</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-200 transition-colors">Contact Us</Link></li>
            </ul>
          </nav>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
