import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import Loading from "./Loading";

interface PriceProps {
  coinId: string;
}
interface IData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const priceData = data?.map((price) => {
    return {
      x: new Date(price.time_close),
      y: [price.open, price.high, price.low, price.close],
    };
  });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: priceData ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            yaxis: {
              show: false,
            },
            grid: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
}
export default Price;
