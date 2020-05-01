'use strict'

import countdown from './countdown.js'

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

let changeUnits = (element, num, event) => {
  event.preventDefault()
  mainUnitType = num //it is manditory because "setInterval" is using this value, and otherwise timer would continue showing values coresponding to mainTypeUnit

  document.querySelector(".checked").classList.remove("checked")
  element.classList.add("checked")

  document.title = `Ile ${wordForms[2][num]} zostało do matury ${choosenYear} - DniDoMatury.pl`

  if (num !== 2 && choosenYear !== 2020) {
    history.pushState({}, "", `/${wordForms[1][num]}/${choosenYear}`)
  } else if (num !== 2) {
    history.pushState({}, "", `/${wordForms[1][num]}`)
  } else if (choosenYear !== 2020) {
    history.pushState({}, "", `/${choosenYear}`)
  } else {
    history.pushState({}, "", "/")
  }

  getTimersValues(num, getUnits(num))
  setTimer()
}

let changeYear = (year, num) => {
  choosenYear = year
  document.title = `Ile ${wordForms[2][num]} zostało do matury ${choosenYear} - DniDoMatury.pl`
  if (num !== 2 && choosenYear !== 2020) {
    history.pushState({}, "", `/${wordForms[1][num]}/${choosenYear}`)
  } else if (num !== 2) {
    history.pushState({}, "", `/${wordForms[1][num]}`)
  } else if (choosenYear !== 2020) {
    history.pushState({}, "", `/${choosenYear}`)
  } else {
    history.pushState({}, "", "/")
  }
  setTimer()
  let startDate = (year === 2020) ? " 8 czerwca" : " 4 maja"
  let endDate = (year === 2020) ? " 29 czerwca" : " 22 maja"
  document.querySelector('body > main > article > h2:nth-child(1) > b:nth-child(1)').innerHTML = startDate
  document.querySelector('body > main > article > h2:nth-child(1) > b:nth-child(2)').innerHTML = endDate
  document.querySelector('body > main > #timer > h2').innerHTML = `Do matury ${choosenYear} zostało:`
  if (choosenYear === 2020) {
    document.querySelectorAll('body > header > nav > a')[0].href = `/miesiące`
    document.querySelectorAll('body > header > nav > a')[1].href = `/`
    document.querySelectorAll('body > header > nav > a')[2].href = `/godziny`
    document.querySelectorAll('body > header > nav > a')[3].href = `/minuty`
  } else {
    document.querySelectorAll('body > header > nav > a')[0].href = `/miesiące/${choosenYear}`
    document.querySelectorAll('body > header > nav > a')[1].href = `/${choosenYear}`
    document.querySelectorAll('body > header > nav > a')[2].href = `/godziny/${choosenYear}`
    document.querySelectorAll('body > header > nav > a')[3].href = `/minuty/${choosenYear}`
  }
}

document.querySelector('#months').addEventListener("click", (event) => changeUnits(document.querySelector('#months'), 3, event))
document.querySelector('#days').addEventListener("click", (event) => changeUnits(document.querySelector('#days'), 2, event))
document.querySelector('#hours').addEventListener("click", (event) => changeUnits(document.querySelector('#hours'), 1, event))
document.querySelector('#minutes').addEventListener("click", (event) => changeUnits(document.querySelector('#minutes'), 0, event))

document.getElementById('year-select').addEventListener("change", () => changeYear(parseInt(document.getElementById('year-select').value, 10), mainUnitType))


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

/* getUnits - contains array of all posible unit types
tempUnits - contains units that are needed right now, and the smaller ones (the smaller units do not make a change, because timeto function that shows up later here only cares about first three of them)
every countdown.unitname have corresponding numeric value */

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

let previousCountdown = [,]
const mainUnitDOM = document.querySelector('#timer > #mainUnit')
const subUnitsDOM = document.querySelector('#timer > #subUnits')

const setTimer = (val) => {
  let currentCountdown = getTimersValues(mainUnitType, getUnits(mainUnitType)) //, 0)

  if (previousCountdown[1] !== currentCountdown[1]) {
    let subUnits = currentCountdown[1]

    subUnitsDOM.innerHTML = subUnits
    subUnitsDOM.setAttribute("value", subUnits)
  }
  if (previousCountdown[0] !== currentCountdown[0]) {
    let mainUnit = currentCountdown[0]

    mainUnitDOM.innerHTML = mainUnit
    mainUnitDOM.setAttribute("value", mainUnit)
  }

  previousCountdown = currentCountdown

}

const getTimersValues = (num, units) => {
  let timeto = countdown(firstExamDate[choosenYear], null, units, 3) // time to exam, from the current time, units, maximum 3 of them
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

/* modes
months - 3
days - 2
hours - 1
minutes - 0
seconds - 4
*/

setTimer()

setInterval(() => {
  setTimer()
}, 1000)
