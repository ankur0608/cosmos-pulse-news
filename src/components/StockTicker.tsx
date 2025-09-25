import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker = () => {
  const stocks: Stock[] = [
    { symbol: "SENSEX", name: "BSE Sensex", price: 65847.49, change: 234.12, changePercent: 0.36 },
    { symbol: "NIFTY", name: "NSE Nifty", price: 19674.25, change: -87.65, changePercent: -0.44 },
    { symbol: "RELIANCE", name: "Reliance Industries", price: 2456.30, change: 45.20, changePercent: 1.87 },
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3687.80, change: -23.45, changePercent: -0.63 },
    { symbol: "INFY", name: "Infosys", price: 1534.75, change: 18.90, changePercent: 1.25 },
    { symbol: "HDFC", name: "HDFC Bank", price: 1678.45, change: 12.30, changePercent: 0.74 }
  ];

  return (
    <Card className="border-news-border">
      <CardHeader className="pb-3">
        <CardTitle className="font-serif text-lg text-foreground flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-live-indicator" />
          Live Markets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stocks.slice(0, 4).map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded transition-colors">
              <div className="flex-1">
                <div className="font-medium text-sm">{stock.symbol}</div>
                <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">₹{stock.price.toLocaleString()}</div>
                <div className={`text-xs flex items-center ${
                  stock.change >= 0 ? 'text-live-indicator' : 'text-primary'
                }`}>
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scrolling ticker */}
        <div className="mt-4 pt-3 border-t border-news-border overflow-hidden">
          <div className="animate-scroll whitespace-nowrap">
            {stocks.map((stock, index) => (
              <span key={index} className="inline-block mr-8 text-sm">
                <span className="font-medium">{stock.symbol}</span>
                <span className="ml-2">₹{stock.price.toLocaleString()}</span>
                <span className={`ml-1 ${stock.change >= 0 ? 'text-live-indicator' : 'text-primary'}`}>
                  ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                </span>
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockTicker;