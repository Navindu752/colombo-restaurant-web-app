//Common functions

function getCurrentDateFormatted() {
    // Get current date
    const today = new Date();
    // Get year, month, and day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    // Format date
    const formattedCurrentDate = `${year}-${month}-${day}`;
    return formattedCurrentDate;
}

function getDateFormate(date) {
    const today = new Date(date);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}


module.exports = {
    getCurrentDateFormatted,
    getDateFormate
}