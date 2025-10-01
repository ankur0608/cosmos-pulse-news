import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchHoroscopes } from "@/store/horoscopeSlice";
import { RootState, AppDispatch } from "@/store";

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

const zodiacImages: Record<string, string> = {
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

const HoroscopeWidget = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { english, loading, error } = useSelector(
    (state: RootState) => state.horoscope
  );

  useEffect(() => {
    if (Object.keys(english).length === 0) {
      dispatch(fetchHoroscopes());
    }
  }, [dispatch, english]);

  const renderContent = () => {
    if (loading)
      return (
        <p className="text-center text-sm text-muted-foreground py-5">
          Loading horoscopes...
        </p>
      );

    if (error)
      return (
        <div className="text-center text-sm text-destructive py-5 flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 mr-2" /> {error}
        </div>
      );

    const topSigns = Object.entries(english)
      .slice(0, 3)
      .map(([sign, details]) => ({
        name: sign.charAt(0).toUpperCase() + sign.slice(1),
        prediction: details.horoscope || "No prediction available.",
        image: zodiacImages[sign] || "",
      }));

    return (
      <div className="space-y-4">
        {topSigns.map((sign) => (
          <Link
            key={sign.name}
            to={`/horoscope/${sign.name.toLowerCase()}`}
            className="flex items-center space-x-4 p-3 rounded-md hover:bg-secondary transition-colors group"
          >
            <img
              src={sign.image}
              alt={sign.name}
              className="h-12 w-12 object-contain flex-shrink-0"
            />
            <div className="overflow-hidden">
              <h4 className="font-semibold text-foreground group-hover:text-primary">
                {sign.name}
              </h4>
              <p className="text-sm text-foreground mt-1 line-clamp-3">
                {sign.prediction}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="font-serif text-lg text-foreground flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary" /> Daily Horoscope
        </CardTitle>
        <p className="text-sm text-muted-foreground pt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </CardHeader>
      <CardContent>
        {renderContent()}
        <div className="pt-4 border-t border-border mt-4 text-center">
          <Link to="/horoscope">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors p-2"
            >
              View All Signs
            </Badge>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoroscopeWidget;
