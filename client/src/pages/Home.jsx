import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoDiamond } from 'react-icons/io5';
import { FaArrowRight, FaStar, FaHeart, FaCompass, FaShieldAlt, FaGem } from 'react-icons/fa';
import { HiSparkles, HiCollection, HiBookmark } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: <HiSparkles className="text-2xl" />,
      title: 'Personalized Picks',
      desc: 'Get gemstone recommendations tailored to your zodiac sign, personality, and life goals.',
      gradient: 'from-gem-500 to-purple-600',
    },
    {
      icon: <HiCollection className="text-2xl" />,
      title: 'Vast Catalog',
      desc: 'Browse our curated collection of 18+ gemstones with detailed descriptions and benefits.',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: <HiBookmark className="text-2xl" />,
      title: 'Save Favorites',
      desc: 'Create an account to save your favorite gems and track recommendation history.',
      gradient: 'from-gold-500 to-orange-600',
    },
  ];

  const steps = [
    { num: '01', title: 'Enter Your Details', desc: 'Share your zodiac sign, personality type, and goals.' },
    { num: '02', title: 'Get Recommendations', desc: 'Our engine matches you with the perfect gemstones.' },
    { num: '03', title: 'Explore & Save', desc: 'Learn about your gems and save favorites for later.' },
  ];

  const popularGems = [
    { name: 'Ruby', color: 'from-red-500 to-rose-600', emoji: '🔴', zodiac: 'Aries' },
    { name: 'Emerald', color: 'from-emerald-500 to-green-600', emoji: '🟢', zodiac: 'Taurus' },
    { name: 'Sapphire', color: 'from-blue-500 to-indigo-600', emoji: '🔵', zodiac: 'Virgo' },
    { name: 'Amethyst', color: 'from-purple-500 to-violet-600', emoji: '🟣', zodiac: 'Aquarius' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-cosmic' : 'bg-cosmic-light'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                darkMode ? 'bg-gem-400/30' : 'bg-gem-400/20'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gem-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
                darkMode
                  ? 'bg-gem-600/20 border border-gem-500/20'
                  : 'bg-gem-100 border border-gem-200'
              }`}
            >
              <IoDiamond className={darkMode ? 'text-gem-400' : 'text-gem-600'} />
              <span className={`text-sm font-medium ${darkMode ? 'text-gem-300' : 'text-gem-700'}`}>
                Powered by Astrological Wisdom
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Discover Your{' '}
              <span className="gradient-text">Perfect</span>
              <br />
              Gemstone
            </h1>

            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Unlock the cosmic energy aligned with your zodiac sign. Personalized gemstone
              recommendations for career growth, love, health, and inner peace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/recommend">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 !px-8 !py-4 !text-base"
                >
                  <FaGem />
                  Get Your Recommendation
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </Link>
              <Link to="/catalog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2 !px-8 !py-4 !text-base"
                >
                  Browse Catalog
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Floating gem icons */}
          <motion.div
            className="absolute -top-10 right-10 text-4xl opacity-30"
            animate={{ y: [-10, 10, -10], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            💎
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-10 text-3xl opacity-20"
            animate={{ y: [10, -10, 10], rotate: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why <span className="gradient-text">GemStone Advisor</span>?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Your journey to discovering the right gemstone starts here
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className={`p-6 rounded-2xl transition-all duration-300 ${
                  darkMode
                    ? 'glass-dark hover:shadow-glow'
                    : 'glass-light hover:shadow-xl'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className={`text-lg font-display font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              How It <span className="gradient-text">Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div
                  className={`text-5xl font-display font-extrabold mb-4 ${
                    darkMode ? 'text-gem-800' : 'text-gem-100'
                  }`}
                >
                  {step.num}
                </div>
                <h3 className={`text-lg font-display font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Gemstones Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Popular <span className="gradient-text">Gemstones</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Some of the most sought-after gemstones and their zodiac connections
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {popularGems.map((gem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`relative overflow-hidden rounded-2xl p-6 text-center cursor-pointer ${
                  darkMode ? 'glass-dark' : 'glass-light'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gem.color} opacity-10`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{gem.emoji}</div>
                  <h3 className={`font-display font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {gem.name}
                  </h3>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {gem.zodiac}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2 mx-auto"
              >
                View All Gemstones
                <FaArrowRight className="text-sm" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-3xl p-8 md:p-14 text-center ${
              darkMode ? 'glass-dark' : 'glass-light'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gem-600/10 to-gold-500/10" />
            <div className="relative z-10">
              <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Ready to Find Your <span className="gradient-text">Cosmic Gem</span>?
              </h2>
              <p className={`text-lg mb-8 max-w-xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Take our quick assessment and discover which gemstone is destined for you.
              </p>
              <Link to="/recommend">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-gold flex items-center gap-2 mx-auto !px-8 !py-4 !text-base"
                >
                  <FaCompass />
                  Start Your Journey
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
