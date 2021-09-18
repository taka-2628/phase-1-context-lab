// Process an Array of employee info into an Object of employee info
function createEmployeeRecord(emp){
    return {
        firstName: emp["0"],
        familyName: emp["1"],
        title: emp["2"],
        payPerHour: emp["3"],
        timeInEvents: [],
        timeOutEvents: []
    }
}
/* // Variables and function call / console.log for the function above (Comment out variables & function calls for other functions)
let arrJuliusCaesar = ["Julius", "Caesar", "General", 1000];
console.log(createEmployeeRecord(arrJuliusCaesar))
//=> {firstName: 'Julius', familyName: 'Caesar', title: 'General', payPerHour: 1000, timeInEvents:[], timeOutEvents[]}
*/ 


// Process an Array of Arrays into an Array of employee records (Objects)
//      send each element (array) in the Array to createEmployeeRecord() as an argument 
//      return new Array that contains employee records (Objects) returned by createEmployeeRecord()
function createEmployeeRecords(empsArr){
    return empsArr.map(element => createEmployeeRecord(element))
};
/* // Variables and function call / console.log for the function above (Comment out variables & function calls for other functions)
let arrJCMA = [["Julius", "Caesar", "General", 1000],["Marcus", "Antonius", "Commander", 100]]
console.log(createEmployeeRecords(arrJCMA));
/* =>
[
    {firstName: 'Julius', familyName: 'Caesar', title: 'General', payPerHour: 1000, timeInEvents:[], timeOutEvents[]},
    {firstName: 'Marcus', familyName: 'Antonius', title: 'Commander', payPerHour: 100, timeInEvents:[], timeOutEvents[]}
]
*/


// Adds a timeIn event Object to an employee's record (Object) of timeInEvents when provided an employee record and Date/Time String 
// Returns the updated record (Object)
function createTimeInEvent(dateStamp){
    let dateArr = dateStamp.split(' ');
    // console.log(dateArr) => ['0044-03-15', '0900']
    let newTimeInEvent = {
        type: "TimeIn",
        date: dateArr["0"],
        hour: parseInt(dateArr["1"]),
    };
    this["timeInEvents"].push(newTimeInEvent);
    return this;
};
/* // Variables and function call / console.log for the function above (Comment out variables & function calls for other functions)
let dateStamp = "0044-03-15 0900"
objJuliusCaesar = {firstName: "Julius", familyName: "Caesar", title: "General", payPerHour: 1000, timeInEvents:[], timeOutEvents:[]}
console.log(createTimeInEvent.apply(objJuliusCaesar, [dateStamp]))
/* => 
{firstName: "Julius", familyName: "Caesar", title: "General", payPerHour: 1000, timeInEvents:[{type: 'TimeIn', date: '0044-03-15', hour: 900}], timeOutEvents:[]}
*/

// Adds a timeOut event Object to an employee's record (Object) of timeOutEvents when provided an employee record and Date/Time String 
// Returns the updated record (Object)
function createTimeOutEvent(dateStamp){
    let dateArr = dateStamp.split(' ');
    // console.log(dateArr) => ['0044-03-15', '1100']
    let newTimeOutEvent = {
        type: "TimeOut",
        date: dateArr["0"],
        hour: parseInt(dateArr["1"])
    };
    this["timeOutEvents"].push(newTimeOutEvent);
    return this;
};
/* // Variables and function call / console.log for the function above (Comment out variables & function calls for other functions)
let dateStamp = "0044-03-15 1100"
objJuliusCaesar = {firstName: "Julius", familyName: "Caesar", title: "General", payPerHour: 1000, timeInEvents:[{type: 'TimeIn', date: '0044-03-15', hour: 900}], timeOutEvents:[]}
console.log(createTimeOutEvent.apply(objJuliusCaesar, [dateStamp]))
/* =>
{firstName: "Julius", familyName: "Caesar", title: "General", payPerHour: 1000, timeInEvents:[{type: 'TimeIn', date: '0044-03-15', hour: 900}], timeOutEvents:[{type: 'TimeOutn', date: '0044-03-15', hour: 1100}]}
*/

// Calculates the hours worked when given an employee record and a date string
function hoursWorkedOnDate(workDate){
    let inTimeEventObj = this["timeInEvents"].find(element => (element["date"] == workDate));
    let outTimeEventObj = this["timeOutEvents"].find(element => (element["date"] == workDate));
    return outTimeEventObj["hour"]/100 - inTimeEventObj["hour"]/100
};
/* // Variables and function call / console.log for the function above (Comment out variables & function calls for other functions)
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
//=> 2
*/


// Multiplies the hours worked by the employee's rate per hour
function wagesEarnedOnDate(workDate){
    return hoursWorkedOnDate.apply(this, [workDate]) * this["payPerHour"]
}
/* // Variables and function call / console.log for the function above (Comment out variables & function calls for other functions)
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
//=> 2000
*/

// ----------
/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
*/

// Aggregates all the dates' wages and adds them together when Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (element) {
        return element.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
// ----------


// Find an employee record (Object) when given a Array of employee records and a firstName string 
function findEmployeeByFirstName(collection, firstName){
    return collection.find(element => element["firstName"] == firstName);
};

let arrJCMA = [
    {firstName: "Julius", familyName: "Caesar", title: "General", payPerHour: 1000, timeInEvents: [], timeOutEvents: []},
    {firstName: "Julius", familyName: "Caesar", title: "General", payPerHour: 1000, timeInEvents: [], timeOutEvents: []}
]
/* // Variables and function call / console.log for the function above (Comment out variables & function calls for other functions)
console.log(findEmployeeByFirstName(arrJCMA, ["Julius"]))
//=> {firstName: "Julius", familyName: "Caesar", title: "General", payPerHour: 1000, timeInEvents: [], timeOutEvents: []}
*/


// Calcurates the sum of pay for all employees for all dates
function calculatePayroll(employees){
    let sumsOfWagesOfAllEmpArr = [];
    for (let employee of employees){
        sumsOfWagesOfAllEmpArr.push(allWagesFor.apply(employee))
    }
    return sumsOfWagesOfAllEmpArr.reduce(function(accumulator, currentValue){return accumulator + currentValue}, 0)
}
/* // Variables and function call / console.log for the function above (Comment out variables & function calls for other functions)
let employees = [
    {
        firstName: 'Rafiki', 
        familyName: '',
        title: 'Aide',
        payPerHour: 10, 
        timeInEvents: [{type: "TimeIn", date: '2019-01-01', hour: 0900}, {type: "TimeIn", date: '2019-01-02', hour: 1000}],
        timeOutEvents: [{type: "TimeOut", date: '2019-01-01', hour: 1300}, {type: "TimeOut", date: '2019-01-02', hour: 1300}]
    },
    {
        firstName: 'Simba', 
        familyName: '',
        title: 'King',
        payPerHour: 100, 
        timeInEvents: [{type: "TimeIn", date: '2019-01-11', hour: 0900}, {type: "TimeIn", date: '2019-01-12', hour: 1000}],
        timeOutEvents: [{type: "TimeOut", date: '2019-01-11', hour: 1300}, {type: "TimeOut", date: '2019-01-12', hour: 1300}]
    }
]
console.log(calculatePayroll(employees))
//=> 770
*/