const adaptRangepickerDate = (rawDate) => {
    const fillter = {
        fillStartDate : new Date(rawDate[0]['$d']).toISOString().split('T')[0],
        fillStartTime : rawDate[0]['$d'].toString().split(' ')[4].slice(0,5),
        fillEndDate : new Date(rawDate[1]['$d']).toISOString().split('T')[0],
        fillEndTime : rawDate[1]['$d'].toString().split(' ')[4].slice(0,5)
    }
    const getDate = {
        startDate : (fillter.fillStartDate+' '+fillter.fillStartTime).toString(),
        endDate : (fillter.fillEndDate+' '+fillter.fillEndTime).toString()
    }
    return getDate
}
const adaptpickerDate = (rawDate) => {
    return rawDate ? new Date(rawDate['$d']).toISOString().split('T')[0].toString() : null
}
const configDate = {
    adaptRangepickerDate,
    adaptpickerDate
}
export default configDate