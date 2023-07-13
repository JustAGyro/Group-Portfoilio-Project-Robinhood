import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function GraphWatchlist (props) {

    let {
		data,
        lineColor,
		colors: {
			backgroundColor = 'black',
			textColor = '#70e000',
			areaTopColor = 'black',
			areaBottomColor = 'black',
		} = {},
	} = props;

    const chartContainerRef = useRef();
    useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
					// crosshairMarkerVisible:false
				},
				// width: chartContainerRef.current.clientWidth,
				height: 40,
                width: 50,
                rightPriceScale: {
                    visible: false
                },
                timeScale: {
                    visible: false
                },
                grid: {
                    vertLines: {
                        visible: false
                    },
                    horzLines: {
                        visible: false
                    }
                },
				crosshair: {
					vertLine:{
						visible:false
					},
					horzLine: {
						visible: false
					},
					crosshairMarkerVisible: false
				},
				
                
            
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addAreaSeries({ lineColor, lineWidth: 1.5, topColor: areaTopColor, bottomColor: areaBottomColor });
            newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor,]
	);

    return (
		<div
			ref={chartContainerRef}
		/>
	);
}
