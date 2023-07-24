import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useMatch, Outlet, useParams } from "react-router-dom";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

type InfoData = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  tags: object;
  team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
};

type PriceData = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
};

type RouteParams = {
  coinId: string;
};

export default function CoinDetail() {
  const { coinId } = useParams<RouteParams>();
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch("/coin/:coinId/price");
  const chartMatch = useMatch("/coin/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  const loading = infoLoading && tickersLoading;

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const price = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(price);
  //     setLoading(false);
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="p-6">
      <div className="text-5xl font-bold mb-8">CoinDetail</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ul className="text-xl font-bold">
            <li className="py-4 border-b first:border-t">
              <span className="mr-2">Rank:</span>
              <span>{infoData?.rank}</span>
            </li>
            <li className="py-4 border-b">
              <span className="mr-2">Symbol:</span>
              <span>{infoData?.symbol}</span>
            </li>
            <li className="py-4 border-b">
              <span className="mr-2">Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </li>
            <li className="py-4 border-b">
              <span>{infoData?.description}</span>
            </li>
            <li className="py-4 border-b">
              <span className="mr-2">Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </li>
            <li className="py-4 border-b">
              <span className="mr-2">Max Suply:</span>
              <span>{tickersData?.max_supply}</span>
            </li>
          </ul>
          <div className="flex justify-between text-center my-6 gap-2">
            <Link
              to="chart"
              className={`flex-1 ${
                chartMatch ? "bg-blue-300" : "bg-orange-200"
              }`}
            >
              chart
            </Link>
            <Link
              to="price"
              className={`flex-1 ${
                priceMatch ? "bg-blue-300" : "bg-orange-200"
              }`}
            >
              price
            </Link>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
