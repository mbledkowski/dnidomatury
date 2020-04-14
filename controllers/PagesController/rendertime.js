const countdown = require('./countdown.js')

let firstExamDate = new Date('4 May 2020')

const wordForms = [{
  3: 'miesiąc',
  2: 'dzień',
  1: 'godzina',
  0: 'minuta',
  4: 'sekunda'
}, {
  3: 'miesiące',
  2: 'dni',
  1: 'godziny',
  0: 'minuty',
  4: 'sekundy'
}, {
  3: "miesięcy",
  2: "dni",
  1: "godzin",
  0: "minut",
  4: "sekund"
}]

const allUnits = [countdown.MONTHS, countdown.DAYS, countdown.HOURS, countdown.MINUTES, countdown.SECONDS]

const getUnits = num => {
  let tempUnits = (num === 3) ?
    allUnits :
    (num === 2) ?
    allUnits.slice(1) :
    (num === 1) ?
    allUnits.slice(2) :
    (num === 0) ?
    allUnits.slice(3) : []

  return tempUnits.reduce((a, b) => a + b, 0)
}

const chooseWordForm = (num, type) => {
  /* if equal to 1 - first form
  if higher than 21 or less than 5, and last digit is a value between 1 - 5 exclusive - second form
  other - third form
  */
  return (num === 1) ?
    wordForms[0][type] :
    ((num > 21 || num < 5) && (num % 10 > 1 && num % 10 < 5)) ?
    wordForms[1][type] :
    wordForms[2][type]
}

const getTimersValues = (num) => {
  let units = getUnits(num)

  let timeto = countdown(firstExamDate, null, units, 3) // time to exam, from the current time, units, maximum 3 of them
  let mainUnit, subUnits

  //let keys = ["months", "days", "hours", "minutes", "seconds"]

  switch (num) {
    case 3:
      mainUnit = `${timeto["months"]} ${chooseWordForm(timeto["months"], 3)}`
      subUnits = `${timeto["days"]} ${chooseWordForm(timeto["days"], 2)} i ${timeto["hours"]} ${chooseWordForm(timeto["hours"], 1)}`
      break
    case 2:
      mainUnit = `${timeto["days"]} ${chooseWordForm(timeto["days"], 2)}`
      subUnits = `${timeto["hours"]} ${chooseWordForm(timeto["hours"], 1)} i ${timeto["minutes"]} ${chooseWordForm(timeto["minutes"], 0)}`
      break
    case 1:
      mainUnit = `${timeto["hours"]} ${chooseWordForm(timeto["hours"], 1)}`
      subUnits = `${timeto["minutes"]} ${chooseWordForm(timeto["minutes"], 0)} i ${timeto["seconds"]} ${chooseWordForm(timeto["seconds"], 4)}`
      break
    case 0:
      mainUnit = `${timeto["minutes"]} ${chooseWordForm(timeto["minutes"], 0)}`
      subUnits = `${timeto["seconds"]} ${chooseWordForm(timeto["seconds"], 4)}`
      break
  }
  return [mainUnit, subUnits]
}

module.exports.default = getTimersValues