const utils = {};

utils.numberWithCommas = (num) => {
	// make number have commas and round to 2 decimal places
	return num
		.toFixed(2)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

utils.capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

utils.reduceString = (string) => {
	// reduce string to elipses plus the last 5 characters
	return "..." + string.slice(-5);
};

utils.randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export default utils;
