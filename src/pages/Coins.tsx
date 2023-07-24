import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchCoins } from "../api";

type CoinData = {
  id: string;
  name: string;
  symbol: string;
};

export default function Coins() {
  const queryFn = () => {
    return fetch(`https://api.coinpaprika.com/v1/coins`).then((res) =>
      res.json()
    );
  };

  const { isLoading, data } = useQuery<CoinData[]>("allCoins", fetchCoins);

  // const [isLoading, setLoading] = useState(true);
  // const [data, setCoins] = useState<CoinData[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
  //     const json = await response.json();
  //     setCoins(json);
  //     setLoading(false);
  //   })();
  // }, []);

  // https://api.coinpaprika.com/v1/coins
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="bold text-5xl">Coin</h1>
      </div>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="container">
          <ul>
            {data?.slice(0, 200).map((coin) => (
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
