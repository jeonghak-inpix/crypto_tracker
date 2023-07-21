import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";

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

export default function CoinDetail() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const price = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(price);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <span>{info?.rank}</span>
            </li>
            <li className="py-4 border-b">
              <span className="mr-2">Symbol:</span>
              <span>{info?.symbol}</span>
            </li>
            <li className="py-4 border-b">
              <span className="mr-2">Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </li>
            <li className="py-4 border-b">
              <span>{info?.description}</span>
            </li>
            <li className="py-4 border-b">
              <span className="mr-2">Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </li>
            <li className="py-4 border-b">
              <span className="mr-2">Max Suply:</span>
              <span>{priceInfo?.max_supply}</span>
            </li>
          </ul>
          <div className="flex justify-between text-center">
            <Link to="chart" className="w-1/2">
              chart
            </Link>
            <Link to="price" className="w-1/2">
              price
            </Link>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
