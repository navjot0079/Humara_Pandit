import { HiSearch, HiX } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const zodiacSigns = [
  'All', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const colors = [
  'All', 'Red', 'Green', 'Blue', 'Purple', 'White', 'Yellow', 'Golden',
  'Pink', 'Brown-Gold', 'Multicolor',
];

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedZodiac,
  onZodiacChange,
  selectedColor,
  onColorChange,
}) => {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <HiSearch
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`}
        />
        <input
          type="text"
          placeholder="Search gemstones..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`input-glass pl-11 pr-10 ${
            darkMode ? 'input-glass-dark' : 'input-glass-light'
          }`}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <HiX />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Zodiac Filter */}
        <div className="flex-1">
          <label
            className={`block text-xs font-medium uppercase tracking-wider mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Zodiac Sign
          </label>
          <select
            value={selectedZodiac}
            onChange={(e) => onZodiacChange(e.target.value)}
            className={`input-glass ${
              darkMode ? 'input-glass-dark' : 'input-glass-light'
            }`}
          >
            {zodiacSigns.map((sign) => (
              <option key={sign} value={sign === 'All' ? '' : sign} className={darkMode ? 'bg-gem-950' : 'bg-white'}>
                {sign}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div className="flex-1">
          <label
            className={`block text-xs font-medium uppercase tracking-wider mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Color
          </label>
          <select
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className={`input-glass ${
              darkMode ? 'input-glass-dark' : 'input-glass-light'
            }`}
          >
            {colors.map((color) => (
              <option key={color} value={color === 'All' ? '' : color} className={darkMode ? 'bg-gem-950' : 'bg-white'}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
