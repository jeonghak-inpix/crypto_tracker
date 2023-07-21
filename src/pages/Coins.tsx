import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type CoinData = {
  id: string;
  name: string;
  symbol: string;
};

export default function Coins() {
  const [loading, setLoading] = useState(true);
  const [conis, setCoins] = useState<CoinData[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const json = await response.json();
      setCoins(json.slice(0, 300));
      setLoading(false);
    })();
  }, []);

  // https://api.coinpaprika.com/v1/coins
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="bold text-5xl">Coin</h1>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="container">
          <ul>
            {conis.map((coin) => (
              <li
                key={coin.id}
                className="p-4 border-b first:border-t hover:bg-gray-50"
              >
                <Link to={`${coin.id}?name=${coin.name}`} className="text-2xl">
                  <img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt=""
                    className="w-12 inline-block mr-2"
                    loading="lazy"
                  />
                  {coin.name} &rarr;
                </Link>
              </li>
            ))}
          </ul>
          {/* id, name, symbol */}
          {/*  */}
        </div>
      )}
    </div>
  );
}
