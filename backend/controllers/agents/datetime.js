const today = () => {
    const today = new Date().toLocaleString('th-TH')

    const formatData = (input) => {
        if (input > 9) {
            return input;
        } else return `0${input}`;
    };
    
    const arr = today.split(' ') // dd/mm/yyyy hh:ii:ss
    const getDate = arr[0].split('/') 
    const format = {
        thai: `${formatData(getDate[2])}-${formatData(getDate[1])}-${formatData(getDate[0])} ${arr[1]}`
    }

    return  format.thai;
}
const countDay = (arrDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(arrDate.startDate);
    const secondDate = new Date(arrDate.endDate);

    return Math.round(Math.abs((firstDate - secondDate) / oneDay))+1;
}
module.exports = {
    today,
    countDay
};