const todayThai = () => {
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
const today = () => {
    return new Date().toString().replace(/T/, ':').replace(/\.\w*/, '')
}
const datetimeForImg = () => {
    //return new Date().toLocaleString('th-TH')
    return new Date().toString().replace(/T/, ':').replace(/\.\w*/, '')
}
module.exports = {
    today,
    datetimeForImg
};