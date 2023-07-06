import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function Graph (props) {

    let {
		data,
		colors: {
			backgroundColor = 'black',
			lineColor = 'red',
			textColor = 'white',
			areaTopColor = 'green',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;
	console.log("data", data )

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
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
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
