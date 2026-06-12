import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaHeart, FaHistory, FaGem, FaTrash, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { favoritesAPI, recommendAPI } from '../services/api';
import GemstoneCard from '../components/GemstoneCard';

const tabs = [
  { id: 'profile', label: 'Profile', icon: <FaUser /> },
  { id: 'favorites', label: 'Saved Gems', icon: <FaHeart /> },
  { id: 'history', label: 'History', icon: <FaHistory /> },
];

const Dashboard = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'favorites') fetchFavorites();
    if (activeTab === 'history') fetchHistory();
  }, [activeTab]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await favoritesAPI.getAll();
      setFavorites(res.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await recommendAPI.getHistory();
      setHistory(res.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (gemstoneId) => {
    try {
      await favoritesAPI.remove(gemstoneId);
      setFavorites((prev) => prev.filter((g) => g._id !== gemstoneId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 ${darkMode ? 'bg-cosmic' : 'bg-cosmic-light'}`}>
      {/* Background */}
      <div className="fixed top-1/4 right-0 w-80 h-80 rounded-full bg-gem-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className={`text-3xl md:text-4xl font-display font-bold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Your <span className="gradient-text">Dashboard</span>
          </h1>
          <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your profile, saved gemstones, and recommendation history
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`flex gap-2 p-1.5 rounded-xl mb-8 w-fit mx-auto ${
            darkMode ? 'bg-white/5' : 'bg-gem-50'
          }`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gem-600 text-white shadow-glow'
                  : darkMode
                  ? 'text-gray-400 hover:text-white hover:bg-white/5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-md mx-auto">
              <div className={`rounded-2xl p-8 text-center ${darkMode ? 'glass-dark' : 'glass-light'}`}>
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gem-500 to-gem-700 flex items-center justify-center mx-auto mb-5">
                  <span className="text-3xl font-display font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>

                <h2 className={`text-xl font-display font-bold mb-1 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {user?.name || 'User'}
                </h2>
                <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user?.email || 'user@example.com'}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`rounded-xl p-4 ${darkMode ? 'bg-white/5' : 'bg-gem-50'}`}>
                    <FaHeart className={`mx-auto mb-2 ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.favorites?.length || 0}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Saved Gems
                    </p>
                  </div>
                  <div className={`rounded-xl p-4 ${darkMode ? 'bg-white/5' : 'bg-gem-50'}`}>
                    <FaHistory className={`mx-auto mb-2 ${darkMode ? 'text-gem-400' : 'text-gem-500'}`} />
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user?.recommendationHistory?.length || 0}
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-400"></div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-20">
                  <FaHeart className={`text-5xl mx-auto mb-4 ${darkMode ? 'text-gem-700' : 'text-gem-200'}`} />
                  <p className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    No saved gemstones yet
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Browse the catalog and save your favorites!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((gem, index) => (
                    <div key={gem._id} className="relative">
                      <GemstoneCard gemstone={gem} index={index} />
                      <button
                        onClick={() => handleRemoveFavorite(gem._id)}
                        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all ${
                          darkMode
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-red-50 text-red-500 hover:bg-red-100'
                        }`}
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-400"></div>
                </div>
              ) : history.length === 0 ? (
                <div className="text-center py-20">
                  <FaHistory className={`text-5xl mx-auto mb-4 ${darkMode ? 'text-gem-700' : 'text-gem-200'}`} />
                  <p className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    No recommendation history
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Get your first recommendation to start tracking!
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-w-2xl mx-auto">
                  {history.map((rec, index) => (
                    <motion.div
                      key={rec._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`rounded-xl p-5 flex items-center gap-4 ${
                        darkMode ? 'glass-dark' : 'glass-light'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gem-500 to-gem-700 flex items-center justify-center flex-shrink-0">
                        <FaGem className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          {rec.gemstones?.map((gem, i) => (
                            <span
                              key={i}
                              className={`text-sm font-semibold ${
                                darkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {gem}{i < rec.gemstones.length - 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`text-xs flex items-center gap-1 ${
                            darkMode ? 'text-gem-300' : 'text-gem-600'
                          }`}>
                            <FaStar className="text-[10px]" />
                            {rec.zodiac}
                          </span>
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {rec.goal}
                          </span>
                        </div>
                      </div>
                      <div className={`text-xs flex items-center gap-1 flex-shrink-0 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        <FaCalendarAlt className="text-[10px]" />
                        {new Date(rec.createdAt).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
