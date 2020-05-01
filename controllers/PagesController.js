const getTimersValues = require('./PagesController/rendertime')

let cache_getTimersValues = [[, , , ,], [, , , ,], [, , , ,], [, , , ,]],
  cachedate_getTimersValues = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]

exports.index = (req, res, next) => {
  let unit = (req.params.unit === 'miesiace' || req.params.unit === 'miesiące') ?
    3 :
    req.params.unit === 'dni' ?
      2 :
      req.params.unit === 'godziny' ?
        1 :
        req.params.unit === 'minuty' ?
          0 :
          2
  let year = req.params.year ? req.params.year : 2020

  //do not update values more often then after 1 second
  if (Date.now() - cachedate_getTimersValues[unit][year % 5] > 1000) {
    cachedate_getTimersValues[unit][year % 5] = Date.now()
    cache_getTimersValues[unit][year % 5] = getTimersValues.default(unit, year)
  }
  const unitNames = {
    3: "miesięcy",
    2: "dni",
    1: "godzin",
    0: "minut"
  }

  let startDate = (year === 2020) ? "8 czerwca" : "4 maja"

  let endDate = (year === 2020) ? "29 czerwca" : "22 maja"

  let variables = {
    title: `Ile ${unitNames[unit]} zostało do matury ${year} - DniDoMatury.pl`,
    startDate: startDate,
    endDate: endDate,
    schoolEndDate: '24 kwietnia',
    links: {
      ig: 'mbledkowski',
      linkedin: 'mbledkowski',
      github: 'mmble/DniDoMatury_site'
    },
    unit: unit,
    year: year,
    initialTimersValues: cache_getTimersValues[unit][year % 5]
  }

  res.render('index', variables)
}
