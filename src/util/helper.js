const today = new Date();

const printDate = () => {
    console.log(`todays Current date is: ${today.getDate()}\n`);
}
module.exports.printDate = printDate;

const printMonth =()=>{
    console.log(`this is shows current month: ${today.getMonth()} \n`);

}
module.exports.printMonth = printMonth;

const getBatchInfo = () =>{
    console.log(`Radon, W3_D3, the topic for for today is Nodejs Module System, NPM, istall some package, some git commands to stash, git fetch etc. \n`);
}

module.exports.getBatchInfo = getBatchInfo
