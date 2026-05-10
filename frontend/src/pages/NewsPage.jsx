import React, {useState, useEffect, useRef} from "react";
import api from '../services/api'

import NewsCard from "../components/NewsCard";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  // Grab the key from the env
  const API_KEY = import.meta.env.VITE_AA_KEY;

  useEffect(() => {
    if(hasFetched.current) return; 
    const fetchMarketNews = async () => {
      try {
        setLoading(true);
        // Using the News & Sentiment endpoint
        const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&sort=LATEST&limit=10&apikey=${API_KEY}`;
        
        const response = await api.get(url);
        console.log(response.data.feed)
        
        // Alpha Vantage returns data in a 'feed' array
        if (response.data.feed) {
          setNews(response.data.feed);
          hasFetched.current = true;
        }
      } catch (error) {
        console.error("Error fetching market news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketNews();
  }, [API_KEY]);

  if (loading) return <div className="p-8 text-white">Loading Market Intelligence...</div>;

  return (
  <div className="p-8 bg-[#0a1120] min-h-screen text-white">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-2">Market Intelligence</h1>
      <p className="text-[#94a3b8] mb-8">Real-time sentiment and news analysis</p>

      <div className="grid grid-cols-1 gap-6">
        {news.map((article, index) => (
          <div key={index} className="bg-[#0d172a] border border-[#1f293a] p-6 rounded-2xl hover:border-[#38bdf8]/50 transition-all flex flex-col gap-3">
            
            {/* Header: Source and Overall Sentiment */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-[#38bdf8] uppercase bg-[#38bdf8]/10 px-2 py-1 rounded">
                {article.source}
              </span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                article.overall_sentiment_label.includes('Bullish') 
                ? 'bg-green-500/10 text-green-500' 
                : article.overall_sentiment_label.includes('Bearish')
                ? 'bg-red-500/10 text-red-500'
                : 'bg-slate-500/10 text-slate-400'
              }`}>
                {article.overall_sentiment_label}
              </span>
            </div>
            
            {/* Title */}
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h2 className="text-xl font-bold hover:text-[#38bdf8] transition-colors cursor-pointer leading-tight">
                {article.title}
              </h2>
            </a>
            
            {/* Summary */}
            <p className="text-[#94a3b8] text-sm line-clamp-2">
              {article.summary}
            </p>

            {/* Ticker Section */}
            {article.ticker_sentiment && article.ticker_sentiment.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 pt-4 border-t border-[#1f293a]">
                {article.ticker_sentiment.slice(0, 5).map((t, tIndex) => (
                  <div 
                    key={tIndex} 
                    className="flex items-center gap-1.5 bg-[#1e293b] px-2 py-1 rounded-md border border-[#334155]"
                  >
                    <span className="text-[11px] font-bold text-white">${t.ticker}</span>
                    <span className={`text-[10px] font-medium ${
                      parseFloat(t.ticker_sentiment_score) > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {parseFloat(t.ticker_sentiment_score) > 0 ? '↑' : '↓'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
    );
};

export default NewsPage