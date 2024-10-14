const adaptpickerDate = (rawDate) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}
const adaptRangepickerDate = (rawDate) => {
    const fillter = {
        fillStartDate : adaptpickerDate(rawDate[0]['$d']),
        fillStartTime : rawDate[0]['$d'].toString().split(' ')[4].slice(0,5),
        fillEndDate : adaptpickerDate(rawDate[1]['$d']),
        fillEndTime : rawDate[1]['$d'].toString().split(' ')[4].slice(0,5)
    }
    const getDate = {
        startDate : (fillter.fillStartDate+' '+fillter.fillStartTime).toString(),
        endDate : (fillter.fillEndDate+' '+fillter.fillEndTime).toString()
    }
    return getDate
}
const compareExpireCard = (arr) => {
    const currentDate = new Date();
    //const checkYear = currentDate.getFullYear().toString().slice(-2);
    //console.log(currentDate.getTime()+' '+new Date(`01-${currentDate.getMonth()}-${currentDate.getFullYear()}`).getTime()+' '+new Date(`01-${arr.eMonth}-${arr.eYear}`).getTime());
    const currentYear = new Date(`${currentDate.getFullYear()}-${parseInt(currentDate.getMonth())+1}`).getTime();
    const expireYear = new Date(`20${arr.eYear}-${arr.eMonth}`).getTime();
    return currentYear < expireYear ? true : false;
}
const configDate = {
    adaptRangepickerDate,
    adaptpickerDate,
    compareExpireCard
}
export default configDate