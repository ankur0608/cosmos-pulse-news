import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHoroscopes } from "@/store/horoscopeSlice";
import { RootState, AppDispatch } from "@/store";
import { Stars } from "lucide-react";

import AriesImg from "@/assets/Aries.png";
import TaurusImg from "@/assets/Taurus.png";
import GeminiImg from "@/assets/Gemini.png";
import CancerImg from "@/assets/Cancer.png";
import LeoImg from "@/assets/Leo.png";
import VirgoImg from "@/assets/Virgo.png";
import LibraImg from "@/assets/Libra.png";
import ScorpioImg from "@/assets/Scorpio.png";
import SagittariusImg from "@/assets/Sagittarius.png";
import CapricornImg from "@/assets/Capricorn.png";
import AquariusImg from "@/assets/Aquarius.png";
import PiscesImg from "@/assets/Pisces.png";

const zodiacImages: Record<string, any> = {
  aries: AriesImg,
  taurus: TaurusImg,
  gemini: GeminiImg,
  cancer: CancerImg,
  leo: LeoImg,
  virgo: VirgoImg,
  libra: LibraImg,
  scorpio: ScorpioImg,
  sagittarius: SagittariusImg,
  capricorn: CapricornImg,
  aquarius: AquariusImg,
  pisces: PiscesImg,
};

const ZodiacDetailPage = () => {
  const { sign } = useParams<{ sign?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { english, loading, error } = useSelector((state: RootState) => state.horoscope);

  useEffect(() => {
    if (Object.keys(english).length === 0) {
      dispatch(fetchHoroscopes());
    }
  }, [dispatch, english]);

  if (!sign) return <p className="text-center mt-20">Invalid zodiac sign.</p>;
  const lowerSign = sign.toLowerCase();
  const details = english[lowerSign];

  if (loading) return <p className="text-center mt-20 animate-pulse">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!details)
    return (
      <div className="text-center mt-20">
        <p>No horoscope found for {sign}</p>
        <button onClick={() => navigate("/horoscope")} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg">
          Back to zodiac list
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <button onClick={() => navigate("/horoscope")} className="text-purple-600 mb-6 font-medium hover:underline">
        &larr; Back
      </button>

      {zodiacImages[lowerSign] && (
        <div className="flex justify-center mb-6">
          <img src={zodiacImages[lowerSign]} alt={sign} className="h-32 w-32 object-contain" />
        </div>
      )}

      <h1 className="text-4xl font-bold text-purple-800 mb-6 capitalize">{sign} Daily Horoscope</h1>
      <p className="text-gray-700 mb-6 leading-relaxed">{details.horoscope}</p>

      <div className="mb-6">
        {Object.entries(details.ratings || {}).map(([category, rating]) => (
          <div key={category} className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700 capitalize">{category}</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Stars key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-purple-50 p-5 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-800">Lucky Number</h3>
          <p className="text-gray-600 mt-1">{details.luckyNumber || "-"}</p>
        </div>
        <div className="bg-purple-50 p-5 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-800">Lucky Color</h3>
          <p className="text-gray-600 mt-1">{details.luckyColor || "-"}</p>
        </div>
        <div className="bg-purple-50 p-5 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-800">Remedy</h3>
          <p className="text-gray-600 mt-1">{details.remedy || "-"}</p>
        </div>
      </div>
    </div>
  );
};

export default ZodiacDetailPage;
