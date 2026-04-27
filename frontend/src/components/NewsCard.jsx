import React from "react";

const NewsCard = ({ article }) => (
  <div className="bg-[#0d172a] border border-[#1f293a] p-5 rounded-2xl mb-4 hover:border-[#38bdf8]/50 transition-all">
    <div className="flex justify-between items-start mb-2">
      <span className="text-xs font-bold px-2 py-1 bg-[#38bdf8]/10 text-[#38bdf8] rounded uppercase">
        {article.source}
      </span>
      <span className={`text-xs font-bold ${article.overall_sentiment_label.includes('Bullish') ? 'text-green-500' : 'text-red-500'}`}>
        {article.overall_sentiment_label}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
      <a href={article.url} target="_blank" rel="noreferrer" className="hover:underline">
        {article.title}
      </a>
    </h3>
    <p className="text-[#94a3b8] text-sm line-clamp-2 mb-4">
      {article.summary}
    </p>
    <div className="flex gap-2">
      {article.ticker_sentiment.slice(0, 3).map(t => (
        <span key={t.ticker} className="text-[10px] bg-[#1f293a] text-white px-2 py-1 rounded">
          ${t.ticker}
        </span>
      ))}
    </div>
  </div>
);

export default NewsCard