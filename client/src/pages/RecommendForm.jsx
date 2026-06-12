import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGem, FaArrowRight, FaUser, FaBirthdayCake, FaStar, FaBullseye, FaBrain } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { recommendAPI } from '../services/api';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const personalityTypes = [
  { value: 'Leader', icon: '👑', desc: 'Born to lead and inspire' },
  { value: 'Creative', icon: '🎨', desc: 'Artistic and imaginative' },
  { value: 'Analytical', icon: '🧠', desc: 'Logical and detail-oriented' },
  { value: 'Emotional', icon: '💖', desc: 'Empathetic and intuitive' },
  { value: 'Adventurous', icon: '🌍', desc: 'Bold and exploration-driven' },
];

const goals = [
  { value: 'Career Growth', icon: '📈', color: 'from-emerald-500 to-teal-600' },
  { value: 'Wealth', icon: '💰', color: 'from-gold-500 to-yellow-600' },
  { value: 'Love', icon: '❤️', color: 'from-pink-500 to-rose-600' },
  { value: 'Health', icon: '🌿', color: 'from-green-500 to-lime-600' },
  { value: 'Confidence', icon: '💪', color: 'from-orange-500 to-amber-600' },
  { value: 'Education', icon: '📚', color: 'from-blue-500 to-indigo-600' },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const RecommendForm = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    zodiac: '',
    birthMonth: '',
    personalityType: '',
    goal: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.zodiac || !formData.goal) {
      setError('Please fill in Name, Zodiac Sign, and Goal.');
      return;
    }

    setLoading(true);
    try {
      const res = await recommendAPI.getRecommendation(formData);
      navigate('/recommend/result', { state: { result: res.data, formData } });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 ${darkMode ? 'bg-cosmic' : 'bg-cosmic-light'}`}>
      {/* Background orbs */}
      <div className="fixed top-1/3 left-0 w-80 h-80 rounded-full bg-gem-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-0 w-80 h-80 rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
              darkMode
                ? 'bg-gem-600/20 border border-gem-500/20'
                : 'bg-gem-100 border border-gem-200'
            }`}
          >
            <FaGem className={darkMode ? 'text-gem-400' : 'text-gem-600'} />
            <span className={`text-sm font-medium ${darkMode ? 'text-gem-300' : 'text-gem-700'}`}>
              Personalized Recommendation
            </span>
          </div>
          <h1
            className={`text-3xl md:text-4xl font-display font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Find Your <span className="gradient-text">Cosmic Gemstone</span>
          </h1>
          <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Fill in your details to receive a personalized gemstone recommendation
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className={`rounded-2xl p-6 md:p-8 space-y-8 ${
            darkMode ? 'glass-dark' : 'glass-light'
          }`}
        >
          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Name */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaUser className="text-gem-400" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your full name"
              className={`input-glass ${darkMode ? 'input-glass-dark' : 'input-glass-light'}`}
            />
          </div>

          {/* DOB and Birth Month */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <FaBirthdayCake className="text-gem-400" />
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className={`input-glass ${darkMode ? 'input-glass-dark' : 'input-glass-light'}`}
              />
            </div>
            <div>
              <label className={`flex items-center gap-2 text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <FaStar className="text-gold-400" />
                Birth Month
              </label>
              <select
                value={formData.birthMonth}
                onChange={(e) => handleChange('birthMonth', e.target.value)}
                className={`input-glass ${darkMode ? 'input-glass-dark' : 'input-glass-light'}`}
              >
                <option value="" className={darkMode ? 'bg-gem-950' : 'bg-white'}>Select month</option>
                {months.map((m) => (
                  <option key={m} value={m} className={darkMode ? 'bg-gem-950' : 'bg-white'}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Zodiac Sign */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-3 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaStar className="text-gem-400" />
              Zodiac Sign <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {zodiacSigns.map((sign) => (
                <motion.button
                  key={sign}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChange('zodiac', sign)}
                  className={`p-3 rounded-xl text-sm font-medium text-center transition-all duration-200 ${
                    formData.zodiac === sign
                      ? 'bg-gem-600 text-white shadow-glow'
                      : darkMode
                      ? 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                      : 'bg-white/70 text-gray-600 hover:bg-gem-50 border border-gem-100'
                  }`}
                >
                  {sign}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Personality Type */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-3 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaBrain className="text-gem-400" />
              Personality Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {personalityTypes.map((type) => (
                <motion.button
                  key={type.value}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChange('personalityType', type.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 ${
                    formData.personalityType === type.value
                      ? 'bg-gem-600 text-white shadow-glow'
                      : darkMode
                      ? 'bg-white/5 hover:bg-white/10 border border-white/5'
                      : 'bg-white/70 hover:bg-gem-50 border border-gem-100'
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <p className={`text-sm font-semibold ${
                      formData.personalityType === type.value
                        ? 'text-white'
                        : darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {type.value}
                    </p>
                    <p className={`text-xs ${
                      formData.personalityType === type.value
                        ? 'text-white/70'
                        : darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {type.desc}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div>
            <label className={`flex items-center gap-2 text-sm font-medium mb-3 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <FaBullseye className="text-gold-400" />
              Goal <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {goals.map((g) => (
                <motion.button
                  key={g.value}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChange('goal', g.value)}
                  className={`relative overflow-hidden p-4 rounded-xl text-center transition-all duration-200 ${
                    formData.goal === g.value
                      ? 'bg-gem-600 text-white shadow-glow'
                      : darkMode
                      ? 'bg-white/5 hover:bg-white/10 border border-white/5'
                      : 'bg-white/70 hover:bg-gem-50 border border-gem-100'
                  }`}
                >
                  <div className="text-2xl mb-1">{g.icon}</div>
                  <p className={`text-sm font-semibold ${
                    formData.goal === g.value
                      ? 'text-white'
                      : darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {g.value}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`w-full btn-primary !py-4 !text-base flex items-center justify-center gap-3 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Consulting the Stars...
              </>
            ) : (
              <>
                <FaGem />
                Get My Gemstone
                <FaArrowRight />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

export default RecommendForm;
