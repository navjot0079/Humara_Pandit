import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaHandSparkles, FaGem, FaMoneyBillWave } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const RecommendationCard = ({ gemstone, type = 'zodiac', index = 0 }) => {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${
        darkMode ? 'glass-dark' : 'glass-light'
      }`}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gem-500/20 via-transparent to-gold-500/20 pointer-events-none" />

      {/* Badge */}
      <div className="flex items-center justify-between mb-6">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
            type === 'zodiac'
              ? 'bg-gem-600/20 text-gem-300 border border-gem-500/20'
              : 'bg-gold-600/20 text-gold-300 border border-gold-500/20'
          }`}
        >
          {type === 'zodiac' ? '♈ Zodiac Match' : '🎯 Goal Match'}
        </span>
      </div>

      {/* Gemstone Name */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          className="text-5xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          💎
        </motion.div>
        <div>
          <h2
            className={`text-2xl md:text-3xl font-display font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {gemstone.name}
          </h2>
          <p
            className={`text-sm ${
              darkMode ? 'text-gem-300' : 'text-gem-600'
            }`}
          >
            {gemstone.color} • {gemstone.zodiac || gemstone.goalAssociation}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed mb-6 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}
      >
        {gemstone.description}
      </p>

      {/* Benefits */}
      <div className="mb-6">
        <h3
          className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
            darkMode ? 'text-gem-300' : 'text-gem-600'
          }`}
        >
          Benefits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {gemstone.benefits?.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`flex items-start gap-2 text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <FaStar
                className={`mt-1 flex-shrink-0 text-xs ${
                  darkMode ? 'text-gold-400' : 'text-gold-500'
                }`}
              />
              {benefit}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl ${
          darkMode ? 'bg-white/5' : 'bg-gem-50/50'
        }`}
      >
        <div className="text-center">
          <FaStar
            className={`mx-auto mb-1 ${
              darkMode ? 'text-gem-400' : 'text-gem-500'
            }`}
          />
          <p
            className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Planet
          </p>
          <p
            className={`text-sm font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {gemstone.planet}
          </p>
        </div>
        <div className="text-center">
          <FaCalendarAlt
            className={`mx-auto mb-1 ${
              darkMode ? 'text-gem-400' : 'text-gem-500'
            }`}
          />
          <p
            className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Best Day
          </p>
          <p
            className={`text-sm font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {gemstone.bestDay}
          </p>
        </div>
        <div className="text-center">
          <FaHandSparkles
            className={`mx-auto mb-1 ${
              darkMode ? 'text-gem-400' : 'text-gem-500'
            }`}
          />
          <p
            className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Wear Method
          </p>
          <p
            className={`text-sm font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {gemstone.wearMethod?.split(' ').slice(0, 4).join(' ')}...
          </p>
        </div>
        <div className="text-center">
          <FaMoneyBillWave
            className={`mx-auto mb-1 ${
              darkMode ? 'text-gold-400' : 'text-gold-500'
            }`}
          />
          <p
            className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Price Range
          </p>
          <p
            className={`text-sm font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {gemstone.priceRange}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
