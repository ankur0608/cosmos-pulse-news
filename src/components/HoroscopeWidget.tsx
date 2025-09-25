import { Stars, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ZodiacSign {
  name: string;
  dates: string;
  prediction: string;
  rating: number;
}

const HoroscopeWidget = () => {
  const zodiacSigns: ZodiacSign[] = [
    { name: "Aries", dates: "Mar 21 - Apr 19", prediction: "Today brings new opportunities in career. Trust your instincts.", rating: 4 },
    { name: "Taurus", dates: "Apr 20 - May 20", prediction: "Financial gains are on the horizon. Stay focused on your goals.", rating: 5 },
    { name: "Gemini", dates: "May 21 - Jun 20", prediction: "Communication is key today. Express yourself clearly.", rating: 3 },
    { name: "Cancer", dates: "Jun 21 - Jul 22", prediction: "Family matters take precedence. Spend quality time with loved ones.", rating: 4 },
    { name: "Leo", dates: "Jul 23 - Aug 22", prediction: "Your leadership skills shine bright today. Take charge.", rating: 5 },
    { name: "Virgo", dates: "Aug 23 - Sep 22", prediction: "Attention to detail pays off. Double-check important work.", rating: 3 }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Stars
            key={i}
            className={`h-3 w-3 ${
              i < rating ? 'text-accent fill-current' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="border-news-border">
      <CardHeader className="pb-3">
        <CardTitle className="font-serif text-lg text-foreground flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-accent" />
          Daily Horoscope
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {zodiacSigns.slice(0, 3).map((sign) => (
            <div key={sign.name} className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-sm">{sign.name}</h4>
                  <p className="text-xs text-muted-foreground">{sign.dates}</p>
                </div>
                {renderStars(sign.rating)}
              </div>
              <p className="text-sm text-foreground">{sign.prediction}</p>
            </div>
          ))}
          
          <div className="pt-2 border-t border-news-border">
            <div className="text-center">
              <Badge variant="outline" className="text-accent border-accent cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                View All Signs
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoroscopeWidget;