import React, { useEffect, useState } from "react";

const GridBackground = ({ children }: { children: React.ReactNode }) => {
	const [itemsCount, setItemsCount] = useState(500);

	useEffect(() => {
		const calculateItems = () => {
			const container = document.querySelector(".grid-container");
			if (container) {
				const width = container.clientWidth;
				const height = container.clientHeight;
				const itemWidth = 40;
				const itemHeight = 40;

				const columns = Math.ceil(width / itemWidth);
				const rows = Math.ceil(height / itemHeight);
				setItemsCount(columns * rows);
			}
		};

		calculateItems();
		window.addEventListener("resize", calculateItems);
		return () => window.removeEventListener("resize", calculateItems);
	}, []);

	return (
		<div className="relative w-full h-[20rem] overflow-hidden">
			<div className="grid-container absolute inset-0 grid grid-cols-[repeat(auto-fill,2.5rem)] auto-rows-[2.5rem] opacity-50">
				{Array.from({ length: itemsCount }).map((_, index) => (
					<div
						key={index}
						className={`border-[0.1px] dark:border-white/10
              ${index % 2 === 0 ? "rounded-[1px] bg-neutral-100 dark:bg-neutral-800 shadow-[0px_0px_0px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_0px_3px_rgba(0,0,0,0.2)_inset]" : "bg-neutral-100 dark:bg-neutral-800"}
            `}
					/>
				))}
			</div>

			<div
				className="absolute inset-0 pointer-events-none hidden dark:block"
				style={{
					background:
						"radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
				}}
			></div>

			{/* Content Layer */}
			<div className="relative z-10 w-full h-full flex items-center justify-center">
				{children}
			</div>
		</div>
	);
};

export default GridBackground;
