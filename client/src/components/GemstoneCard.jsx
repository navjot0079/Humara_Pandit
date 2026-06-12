import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

// Color map for gemstone color indicators
const colorMap = {
  Red: 'bg-red-500',
  Green: 'bg-emerald-500',
  Blue: 'bg-blue-500',
  Purple: 'bg-purple-500',
  White: 'bg-gray-100 border border-gray-300',
  Yellow: 'bg-yellow-400',
  Golden: 'bg-yellow-500',
  'Yellow-Green': 'bg-lime-400',
  'Blue-Green': 'bg-teal-400',
  'Dark Red': 'bg-red-800',
  Pink: 'bg-pink-400',
  'Brown-Gold': 'bg-amber-600',
  'Purple-Green': 'bg-violet-400',
  Multicolor: 'bg-gradient-to-r from-red-400 via-green-400 to-blue-400',
  Iridescent: 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400',
  'Light Blue': 'bg-sky-300',
};

const GemstoneCard = ({
  gemstone,
  index = 0,
  isFavorite = false,
  onToggleFavorite,
  showFavorite = false,
  onClick,
}) => {
  const { darkMode } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
        darkMode
          ? 'glass-dark hover:shadow-glow'
          : 'glass-light hover:shadow-xl'
      }`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            darkMode
              ? 'from-gem-900/50 to-gem-800/30'
              : 'from-gem-100 to-gem-50'
          }`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-6xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            💎
          </motion.div>
        </div>

        {/* Color indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded-full shadow-md ${
              colorMap[gemstone.color] || 'bg-gray-400'
            }`}
          />
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              darkMode
                ? 'bg-black/40 text-white/80'
                : 'bg-white/80 text-gray-700'
            }`}
          >
            {gemstone.color}
          </span>
        </div>

        {/* Favorite button */}
        {showFavorite && (
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(gemstone._id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
              darkMode ? 'bg-black/40 hover:bg-black/60' : 'bg-white/80 hover:bg-white'
            }`}
          >
            {isFavorite ? (
              <FaHeart className="text-red-400" />
            ) : (
              <FaRegHeart
                className={darkMode ? 'text-white/60' : 'text-gray-400'}
              />
            )}
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3
            className={`text-lg font-display font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {gemstone.name}
          </h3>
          {gemstone.zodiac && (
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                darkMode
                  ? 'bg-gem-600/20 text-gem-300'
                  : 'bg-gem-100 text-gem-700'
              }`}
            >
              {gemstone.zodiac}
            </span>
          )}
        </div>

        <p
          className={`text-sm mb-3 line-clamp-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {gemstone.description}
        </p>

        {/* Benefits preview */}
        <div className="flex flex-wrap gap-1.5">
          {gemstone.benefits?.slice(0, 2).map((benefit, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 rounded-lg ${
                darkMode
                  ? 'bg-white/5 text-gray-300'
                  : 'bg-gem-50 text-gem-600'
              }`}
            >
              {benefit.length > 30 ? benefit.slice(0, 30) + '...' : benefit}
            </span>
          ))}
          {gemstone.benefits?.length > 2 && (
            <span
              className={`text-xs px-2 py-1 rounded-lg ${
                darkMode ? 'text-gem-400' : 'text-gem-500'
              }`}
            >
              +{gemstone.benefits.length - 2} more
            </span>
          )}
        </div>

        {/* Planet and Price */}
        <div
          className={`flex items-center justify-between mt-3 pt-3 border-t ${
            darkMode ? 'border-white/5' : 'border-gray-100'
          }`}
        >
          <div className="flex items-center gap-1">
            <FaStar
              className={`text-xs ${
                darkMode ? 'text-gold-400' : 'text-gold-500'
              }`}
            />
            <span
              className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {gemstone.planet}
            </span>
          </div>
          {gemstone.priceRange && (
            <span
              className={`text-xs font-medium ${
                darkMode ? 'text-gold-400' : 'text-gold-600'
              }`}
            >
              {gemstone.priceRange}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GemstoneCard;
