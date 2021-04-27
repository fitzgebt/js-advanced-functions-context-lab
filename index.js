/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(col) {
    return {
        firstName: col[0],
        familyName: col[1],
        title: col[2],
        payPerHour: col[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

let createEmployeeRecords = function(empData) {
    return empData.map(function(col) {
        return createEmployeeRecord(col)
    })
};

let createTimeInEvent = function(dateTime) {
    let [date, time] = dateTime.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(time, 10)
    })
    return this
};

let createTimeOutEvent = function(dateTime) {
    let [date, time] = dateTime.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(time, 10)
    })
    return this
};

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(function(employee) {
        return employee.date === date
    })
    let timeOut = this.timeOutEvents.find(function(employee) {
        return employee.date === date
    })
    return ((timeOut.hour - timeIn.hour) / 100)
};

let wagesEarnedOnDate = function(date) {
    let hrs = hoursWorkedOnDate.call(this, date)
    return hrs * this.payPerHour
};

let calculatePayroll = function (empArr) {
    return empArr.reduce(function(memo, record) {
        return memo + allWagesFor.call(record)
    }, 0)
};

let findEmployeeByFirstName = function(arr, name) {
    return arr.find(function(record){
        return record.firstName === name
    })
};