import { Link } from 'react-router-dom';
import { IoDiamond } from 'react-icons/io5';
import { FaGithub, FaHeart } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`relative py-12 mt-auto ${
        darkMode
          ? 'bg-gem-950/60 border-t border-white/5'
          : 'bg-white/60 border-t border-gem-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <IoDiamond
                className={`text-2xl ${
                  darkMode ? 'text-gem-400' : 'text-gem-600'
                }`}
              />
              <span
                className={`text-xl font-display font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Gem<span className="gradient-text">Stone</span>
              </span>
            </Link>
            <p
              className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Discover the perfect gemstone aligned with your stars,
              personality, and life goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`font-display font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Quick Links
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Gemstone Catalog', path: '/catalog' },
                { name: 'Get Recommendation', path: '/recommend' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-sm transition-colors ${
                    darkMode
                      ? 'text-gray-400 hover:text-gem-300'
                      : 'text-gray-500 hover:text-gem-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h3
              className={`font-display font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              About
            </h3>
            <p
              className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              GemStone Advisor uses ancient astrological wisdom combined with modern
              technology to recommend the perfect gemstones for you.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            darkMode ? 'border-white/5' : 'border-gray-200'
          }`}
        >
          <p
            className={`text-sm ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            © {new Date().getFullYear()} GemStone Advisor. All rights reserved.
          </p>
          <p
            className={`text-sm flex items-center gap-1 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            Made with <FaHeart className="text-red-400 text-xs" /> for Humara Pandit
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
