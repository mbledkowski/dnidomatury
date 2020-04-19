const getTimersValues = require('./PagesController/rendertime')

let cache_getTimersValues = [, , ,],
  cachedate_getTimersValues = [0, 0, 0, 0]

exports.index = (req, res, next) => {
  console.log(req.params.unit)
  let unit = (req.params.unit === 'miesiace' || req.params.unit === 'miesiące') ?
    3 :
    req.params.unit === 'dni' ?
      2 :
      req.params.unit === 'godziny' ?
        1 :
        req.params.unit === 'minuty' ?
          0 :
          2

  //do not update values more often then after 1 second
  if (Date.now() - cachedate_getTimersValues[unit] > 1000) {
    cachedate_getTimersValues[unit] = Date.now()
    cache_getTimersValues[unit] = getTimersValues.default(unit)
  }

  const unitNames = {
    3: "miesięcy",
    2: "dni",
    1: "godzin",
    0: "minut"
  }

  let variables = {
    title: `Odliczanie ${unitNames[unit]} do matury - dnidomatury.pl`,
    startDate: '4 maja',
    startYear: '2020',
    endDate: '22 maja',
    schoolEndDate: '24 kwietnia',
    links: {
      ig: 'mbledkowski',
      linkedin: 'mbledkowski',
      github: 'mmble'
    },
    unit: unit,
    initialTimersValues: cache_getTimersValues[unit]
  }

  res.render('index', variables)
}