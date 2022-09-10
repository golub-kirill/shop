import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import css from "./Slider.module.css";

export const Slider = ({isHidden}) => {
	const slider = useRef(null);
	const [sliderWidth, setSliderWidth] = React.useState(0);
	const [sliderOffset, setSliderOffset] = React.useState(0);
	const maxSliderWidth = sliderWidth * 7;

	const sliderClasses = classNames(css.slider__wrapper, {
		[css.slider_hidden]: isHidden,
	})


	// Every time slider width changes, set slide width;
	useEffect(() => {
		setSliderWidth(slider.current.offsetWidth);
		document.querySelectorAll(".slide").forEach((item) => {
			item.style.width = sliderWidth + "px";
		});
	}, [sliderWidth]);

	
	function moveLeft() {
		sliderOffset < 0
			? setSliderOffset(sliderOffset + sliderWidth)
			: setSliderOffset(0); // Start position
	}

	function moveRight() {
		sliderOffset > -maxSliderWidth + sliderWidth
			? setSliderOffset(sliderOffset - sliderWidth)
			: setSliderOffset(-maxSliderWidth + sliderWidth); //Final position
	}

	return (
		<div className={sliderClasses} >
			<div className={css.slider} ref={slider}>
				<button
					className={css.slider__buttonLeft}
					onClick={() => moveLeft()}>
					<img src="/img/svg/chevron.svg" alt="left" />
				</button>
				<div
					className={css.slider__line}
					style={{
						transform: `translateX(${sliderOffset}px)`,
					}}>
					<img
						className="slide"
						src="/img/slider/slide1.webp"
						alt="slide1"
					/>
					<img
						className="slide"
						src="/img/slider/slide2.png"	
						alt="slide2"
					/>
					<img
						className="slide"
						src="/img/slider/slide3.png"
						alt="slide3"
					/>
					<img
						className="slide"
						src="/img/slider/slide4.png"
						alt="slide4"
					/>
					<img
						className="slide"
						src="/img/slider/slide5.png"
						alt="slide5"
					/>
					<img
						className="slide"
						src="/img/slider/slide6.png"
						alt="slide6"
					/>
					<img
						className="slide"
						src="/img/slider/slide7.png"
						alt="slide7"
					/>
				</div>
				<button
					className={css.slider__buttonRight}
					onClick={() => moveRight()}>
					<img src="/img/svg/chevron.svg" alt="left" />
				</button>
			</div>
		</div>
	);
};
