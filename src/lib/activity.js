const DAY_MS = 24 * 60 * 60 * 1000

function startOfLocalDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function dateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function addDays(date, amount) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function addMonths(date, amount) {
  const next = new Date(date)
  next.setMonth(next.getMonth() + amount)
  return next
}

function isValidDate(value) {
  const date = new Date(value)
  return Number.isFinite(date.getTime())
}

export function normalizeSolvedAt(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.entries(value).reduce((acc, [problemId, solvedAt]) => {
    if (typeof problemId === 'string' && problemId && typeof solvedAt === 'string' && isValidDate(solvedAt)) {
      acc[problemId] = solvedAt
    }
    return acc
  }, {})
}

export function buildActivityStats(solvedAtByProblem = {}) {
  const solvedAt = normalizeSolvedAt(solvedAtByProblem)
  const today = startOfLocalDay()
  const todayKey = dateKey(today)
  const dayCounts = Object.values(solvedAt).reduce((acc, solvedAtValue) => {
    const solvedDate = startOfLocalDay(new Date(solvedAtValue))
    const key = dateKey(solvedDate)
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const weekSeries = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(today, index - 6)
    const key = dateKey(day)
    return {
      key,
      label: day.toLocaleDateString(undefined, { weekday: 'short' }),
      count: dayCounts[key] || 0,
    }
  })

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const weeksInMonth = Math.ceil((monthStart.getDay() + (nextMonthStart - monthStart) / DAY_MS) / 7)
  const monthSeries = Array.from({ length: weeksInMonth }, (_, index) => {
    const rangeStart = addDays(monthStart, index * 7 - monthStart.getDay())
    const rangeEnd = addDays(rangeStart, 6)
    const count = Object.entries(dayCounts).reduce((sum, [key, value]) => {
      const day = startOfLocalDay(new Date(`${key}T00:00:00`))
      return day >= rangeStart && day <= rangeEnd && day < nextMonthStart && day >= monthStart ? sum + value : sum
    }, 0)
    return {
      key: `${today.getFullYear()}-${today.getMonth() + 1}-w${index + 1}`,
      label: `W${index + 1}`,
      count,
    }
  })

  const yearSeries = Array.from({ length: 12 }, (_, index) => {
    const month = addMonths(new Date(today.getFullYear(), today.getMonth(), 1), index - 11)
    const count = Object.entries(dayCounts).reduce((sum, [key, value]) => {
      const day = new Date(`${key}T00:00:00`)
      return day.getFullYear() === month.getFullYear() && day.getMonth() === month.getMonth() ? sum + value : sum
    }, 0)
    return {
      key: `${month.getFullYear()}-${month.getMonth() + 1}`,
      label: month.toLocaleDateString(undefined, { month: 'short' }),
      count,
    }
  })

  const monthlySolved = Object.entries(dayCounts).reduce((sum, [key, value]) => {
    const day = new Date(`${key}T00:00:00`)
    return day.getFullYear() === today.getFullYear() && day.getMonth() === today.getMonth() ? sum + value : sum
  }, 0)

  let currentStreak = 0
  for (let day = today; dayCounts[dateKey(day)]; day = addDays(day, -1)) {
    currentStreak += 1
  }

  let bestStreak = 0
  let runningStreak = 0
  const sortedKeys = Object.keys(dayCounts).sort()
  sortedKeys.forEach((key, index) => {
    if (index === 0) {
      runningStreak = 1
    } else {
      const previous = startOfLocalDay(new Date(`${sortedKeys[index - 1]}T00:00:00`))
      const current = startOfLocalDay(new Date(`${key}T00:00:00`))
      runningStreak = current - previous === DAY_MS ? runningStreak + 1 : 1
    }
    bestStreak = Math.max(bestStreak, runningStreak)
  })

  const weeklySolved = weekSeries.reduce((sum, item) => sum + item.count, 0)

  return {
    dayCounts,
    weeklySolved,
    monthlySolved,
    currentStreak,
    bestStreak,
    series: {
      week: weekSeries,
      month: monthSeries,
      year: yearSeries,
    },
    todayKey,
  }
}
