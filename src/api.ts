const DEFAULT_URL = 'https://api.coinpaprika.com/v1/'

export function fetchCoins() {
  return fetch(`${DEFAULT_URL}coins`).then((res) =>
      res.json()
    );
}

export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${DEFAULT_URL}coins/${coinId}`).then((res) => res.json());
}

export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${DEFAULT_URL}tickers/${coinId}`).then((res) => res.json());
}