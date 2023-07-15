import {
  createChart,
  ColorType,
  PriceScaleMode,
  CrosshairMode,
} from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import './DetailsGraph.css';

export default function DetailGraph(props) {
  let {
    data,
    colors: {
      backgroundColor = 'black',
      lineColor = 'green',
      textColor = 'white',
      areaTopColor = 'black',
      areaBottomColor = 'black',
    } = {},
  } = props;

  const [currentPrice, setCurrentPrice] = useState(null);

  const chartContainerRef = useRef();
  const seriesRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 340,
      rightPriceScale: {
        visible: true,
        borderVisible: false,
      },
      timeScale: {
        visible: true,
        borderVisible: false,
      },
      grid: {
        vertLines: {
          color: 'rgba(0, 0, 0, 0)',
        },
        horzLines: {
          color: 'rgba(0, 0, 0, 0)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          style: 0,
          visible: true,
          width: 1,
          color: 'white',
        },
        horzLine: {
          visible: false,
        },
      },
    });

    chartRef.current.applyOptions({
      priceScale: { mode: PriceScaleMode.Logarithmic },
    });
    chartRef.current.timeScale().fitContent();
    seriesRef.current = chartRef.current.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      priceLineVisible: false,
    });
    seriesRef.current.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        handleScroll: false,
        handleScale: false,
        handleMouseWheel: false,
      });
    }
  }, [data]);


  return (
    <div className="chart-container-div">
      <div ref={chartContainerRef} />
    </div>
  );
}
