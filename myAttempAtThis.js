
function createEmployeeRecord(){
    return {
        firstName: this[0],
        familyName: this[1],
        title: this[2],
        payPerHour: this[3],
        timeInEvents:[],
        timeOutEvents:[],
    }
}
/*
let arrJuliusCaesar = ["Julius", "Caesar", "General", 1000];
console.log(createEmployeeRecord.apply(arrJuliusCaesar))
*/


function createEmployeeRecords(){
    return this.map(element => createEmployeeRecord(element))
};
/*
let arrJCMA = [["Julius", "Caesar", "General", 1000],["Marcus", "Antonius", "Commander", 100]]
console.log(createEmployeeRecords.apply(arrJCMA));
*/


function createTimeInEvent(dateStamp){
    let newTimeInEvent = {
        type: "TimeIn",
        date: dateStamp.slice(0, 10),
        time: dateStamp.slice(12)
    };
    this["timeInEvents"].push(newTimeInEvent);
    return this;
};
/*
let dateStamp = "0044-03-15 0900"
objJuliusCaesar = {firstName: "Julius", familyName: "Caesar", title: "General", payPerHour: 1000, timeInEvents:[], timeOutEvents:[]}
console.log(createTimeInEvent.apply(objJuliusCaesar, [dateStamp]))
*/


function createTimeOutEvent(dateStamp){
    let newTimeOutEvent = {
        type: "TimeOut",
        date: dateStamp.slice(0, 10),
        time: dateStamp.slice(12)
    };
    this["timeOutEvents"].push(newTimeOutEvent);
    return this;
};
/*
let dateStamp = "0044-03-15 1100"
objJuliusCaesar = {firstName: "Julius", familyName: "Caesar", title: "General", payPerHour: 1000, timeInEvents:[], timeOutEvents:[]}
console.log(createTimeOutEvent.apply(objJuliusCaesar, [dateStamp]))
*/


function hoursWorkedOnDate(workDate){
    let inTimeEventObj = this["timeInEvents"].find(element => (element["date"] == workDate));
    let outTimeEventObj = this["timeOutEvents"].find(element => (element["date"] == workDate));
    return outTimeEventObj["hour"]/100 - inTimeEventObj["hour"]/100
};
/*
workDate = '0044-03-15';
objJuliusCaesar = {
    firstName: "Julius", 
    familyName: "Caesar", 
    title: "General", 
    payPerHour: 1000, 
    timeInEvents:[{type: "TimeIn", date: '0044-03-14', hour: 1600}, {type: "TimeIn", date: '0044-03-15', hour: 0900}], 
    timeOutEvents:[{type: "TimeOutn", date: '0044-03-14', hour: 1700}, {type: "TimeOut", date: '0044-03-15', hour: 1100}]
}
console.log(hoursWorkedOnDate.apply(objJuliusCaesar, [workDate]))
*/


function wagesEarnedOnDate(workDate){
    return hoursWorkedOnDate.apply(objJuliusCaesar, [workDate]) * this["payPerHour"]
}
/*
workDate = '0044-03-15';
objJuliusCaesar = {
    firstName: "Julius", 
    familyName: "Caesar", 
    title: "General", 
    payPerHour: 1000, 
    timeInEvents:[{type: "TimeIn", date: '0044-03-14', hour: 1600}, {type: "TimeIn", date: '0044-03-15', hour: 0900}], 
    timeOutEvents:[{type: "TimeOutn", date: '0044-03-14', hour: 1700}, {type: "TimeOut", date: '0044-03-15', hour: 1100}]
}
console.log(wagesEarnedOnDate.apply(objJuliusCaesar, [workDate]))
*/


function findEmployeeByFirstName(firstName){
    return this.find(element => (element["0"]) == firstName)
};
/*
let arrJCMA = [["Julius", "Caesar", "General", 1000],["Marcus", "Antonius", "Commander", 100]]
console.log(findEmployeeByFirstName.apply(arrJCMA, ["Julius"]))
*/

/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
*/

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (element) {
        return element.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
