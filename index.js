const createEmployeeRecord = (array) => {
    const person = {firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []}
    return person
}

const createEmployeeRecords = (arrayOfArrays) => {
    const arrayOfObjects = []
    arrayOfArrays.forEach(array => arrayOfObjects.push(createEmployeeRecord(array)))
    return arrayOfObjects
}

const createTimeInEvent = (employee, dateStamp) => {
    const arrayOfTime = dateStamp.split("")
    const date = arrayOfTime.slice(0, 10)
    const m = date.join("")
    const thing = arrayOfTime.slice(11, 15)
    const thingy = parseInt(thing.join(""), 10)
    // console.log(thingy)
    const timeInObject = {type: "TimeIn", hour: thingy, date: m}
    employee.timeInEvents.push(timeInObject)
    return employee
}

const createTimeOutEvent = (employee, dateStamp) => {
    const arrayOfTime = dateStamp.split("")
    const date = arrayOfTime.slice(0, 10)
    const m = date.join("")
    const thing = arrayOfTime.slice(11, 15)
    const thingy = parseInt(thing.join(""), 10)
    // console.log(thingy)
    const timeOutObject = {type: "TimeOut", hour: thingy, date: m}
    employee.timeOutEvents.push(timeOutObject)
    return employee
}

const hoursWorkedOnDate = (employee, dateStamp) => {
    const toe = employee.timeOutEvents
    const tie = employee.timeInEvents
    const o = toe.find(e => e.date == dateStamp)
    const i = tie.find(e => e.date == dateStamp)
    const hw = o.hour - i.hour
    return hw / 100
}
const wagesEarnedOnDate = (employee, date) => {
    const hours = hoursWorkedOnDate(employee, date)
    const money = hours * employee.payPerHour
    return money
}

const allWagesFor = (employee) => {
    const dw = []
    let th = 0
    employee.timeInEvents.forEach(tie => dw.push(tie))
    dw.forEach(d => th += wagesEarnedOnDate(employee, d.date))
    return th
}

const calculatePayroll = (arrayOfEmployees) => {
    let payroll = 0
    arrayOfEmployees.forEach(e => payroll += allWagesFor(e))
    return payroll
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    const match = srcArray.find(employee => employee.firstName == firstName)
    return match
}