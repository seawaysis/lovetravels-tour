function formatMoney(amount) {
    // Check if the amount is a number
    if (isNaN(amount)) {
        throw new Error("Input must be a number");
    }
    
    // Convert the number to a string and split it into whole and decimal parts
    const parts = Math.abs(amount).toFixed(2).split(".");
    const wholePart = parts[0];
    const decimalPart = parts[1];

    // Add commas as thousands separators
    const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted whole part and the decimal part
    const result = (amount < 0 ? "-" : "") + formattedWholePart + "." + decimalPart;

    return result;
}

export default formatMoney;