export const isClient = typeof window !== "undefined";

export const getArrayIntersection = <T>(...arrays: T[][]) => {
	return arrays.slice(1).reduce((acc, array) => {
		return acc.filter(value => array.includes(value));
	}, arrays[0]);
};

export const hexToRgba = (hex: string, opacity: number) => {
	// Ensure the hex string is valid
	if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
		throw new Error("Invalid hex color string");
	}

	// Remove the leading '#' if present
	hex = hex.slice(1);

	// If the hex code is in shorthand form (e.g., #03F), convert it to full form (e.g., #0033FF)
	if (hex.length === 3) {
		hex = hex
			.split("")
			.map(char => char + char)
			.join("");
	}

	// Convert hex to RGB
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// Ensure the opacity is between 0 and 1
	opacity = Math.max(0, Math.min(1, opacity));

	// Return the RGBA color
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
