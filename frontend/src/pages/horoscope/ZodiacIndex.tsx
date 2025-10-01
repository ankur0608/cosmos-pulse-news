import { Link } from "react-router-dom";

const signs = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

const ZodiacIndex = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">
        Select Your Zodiac Sign
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {signs.map((sign) => (
          <Link
            key={sign}
            to={`/horoscope/${sign}`}
            className="p-6 bg-purple-100 rounded-lg text-center hover:bg-purple-200 font-medium"
          >
            {sign.charAt(0).toUpperCase() + sign.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ZodiacIndex;
