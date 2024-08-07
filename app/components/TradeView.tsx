import { useEffect, useRef, useState } from 'react';
import { getKlines } from '../utils/httpClient';
import { ChartManager } from '../utils/ChartManager';
import { KLine } from '../utils/types';
import Loader from './common/Loader';

export function TradeView({ market }: { market: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const init = async () => {
    setIsLoading(true);
    let klineData: KLine[] = [];
    try {
      klineData = await getKlines(
        market,
        '1h',
        Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000),
        Math.floor(new Date().getTime() / 1000)
      );
    } catch (e) {
      console.log('error is: ', e);
    } finally {
      setIsLoading(false);
    }

    if (chartRef) {
      if (chartManagerRef.current) {
        chartManagerRef.current.destroy();
      }
      const chartManager = new ChartManager(
        chartRef.current,
        [
          ...klineData?.map((x) => ({
            close: parseFloat(x.close),
            high: parseFloat(x.high),
            low: parseFloat(x.low),
            open: parseFloat(x.open),
            timestamp: new Date(x.end),
          })),
        ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
        {
          background: '#0e0f14',
          color: 'white',
        }
      );
      //@ts-ignore
      chartManagerRef.current = chartManager;
    }
  };

  useEffect(() => {
    init();
  }, [market, chartRef]);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div
        ref={chartRef}
        style={{ height: '520px', width: '100%', marginTop: 4 }}
      ></div>
    </>
  );
}
