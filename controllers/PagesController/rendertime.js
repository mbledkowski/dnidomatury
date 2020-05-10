const countdown = require('./countdown-min.js')

let firstExamDate = {
  2020: new Date('8 June 2020 9:00 GMT+02:00'),
  2021: new Date('4 May 2021 9:00 GMT+02:00'),
  2022: new Date('4 May 2022 9:00 GMT+02:00'),
  2023: new Date('4 May 2023 9:00 GMT+02:00'),
  2024: new Date('4 May 2024 9:00 GMT+02:00')
}

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

const zostacForms = [{ 0: "został" }, { 0: "zostały" }, { 0: "zostało" }]

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

const chooseWordForm = (num, words, type) => {
  /* if equal to 1 - first form
  if higher than 21 or less than 5, and last digit is a value between 1 - 5 exclusive - second form
  other - third form
  */
  return (num === 1) ?
    words[0][type] :
    ((num > 21 || num < 5) && (num % 10 > 1 && num % 10 < 5)) ?
      words[1][type] :
      words[2][type]
}

const getTimersValues = (num, year) => {
  let units = getUnits(num)

  let timeto = countdown(firstExamDate[year], null, units, 3) // time to exam, from the current time, units, maximum 3 of them
  let mainUnit, subUnits, zostacForm

  //let keys = ["months", "days", "hours", "minutes", "seconds"]

  switch (num) {
    case 3:
      zostacForm = chooseWordForm(timeto["months"], zostacForms, 0)
      mainUnit = `${timeto["months"]} ${chooseWordForm(timeto["months"], wordForms, 3)} `
      subUnits = `${timeto["days"]} ${chooseWordForm(timeto["days"], wordForms, 2)} i ${timeto["hours"]} ${chooseWordForm(timeto["hours"], wordForms, 1)}`
      break
    case 2:
      zostacForm = chooseWordForm(timeto["days"], zostacForms, 0)
      mainUnit = `${timeto["days"]} ${chooseWordForm(timeto["days"], wordForms, 2)} `
      subUnits = `${timeto["hours"]} ${chooseWordForm(timeto["hours"], wordForms, 1)} i ${timeto["minutes"]} ${chooseWordForm(timeto["minutes"], wordForms, 0)}`
      break
    case 1:
      zostacForm = chooseWordForm(timeto["hours"], zostacForms, 0)
      mainUnit = `${timeto["hours"]} ${chooseWordForm(timeto["hours"], wordForms, 1)} `
      subUnits = `${timeto["minutes"]} ${chooseWordForm(timeto["minutes"], wordForms, 0)} i ${timeto["seconds"]} ${chooseWordForm(timeto["seconds"], wordForms, 4)}`
      break
    case 0:
      zostacForm = chooseWordForm(timeto["minutes"], zostacForms, 0)
      mainUnit = `${timeto["minutes"]} ${chooseWordForm(timeto["minutes"], wordForms, 0)} `
      subUnits = `${timeto["seconds"]} ${chooseWordForm(timeto["seconds"], wordForms, 4)}`
      break
  }
  return [mainUnit, subUnits, zostacForm]
}

module.exports.default = getTimersValues
