// articleUtils.js

export const filterArticlesByDateRange = (articles, dateRange) => {
  const currentDate = new Date()

  switch (dateRange) {
    case 'today':
      return articles.filter(article => article.date === currentDate.toISOString().split('T')[0])
    case 'last_week':
      const lastWeekDate = new Date(currentDate)
      lastWeekDate.setDate(currentDate.getDate() - 7)

      return articles.filter(article => new Date(article.date) > lastWeekDate)
    case 'last_month':
      const lastMonthDate = new Date(currentDate)
      lastMonthDate.setMonth(currentDate.getMonth() - 1)

      return articles.filter(article => new Date(article.date) > lastMonthDate)
    case 'last_three_months':
      const lastThreeMonthsDate = new Date(currentDate)
      lastThreeMonthsDate.setMonth(currentDate.getMonth() - 3)

      return articles.filter(article => new Date(article.date) > lastThreeMonthsDate)
    default:
      return articles
  }
}

export const countArticlesByCompany = articles => {
  const articleCounts = {}

  articles.forEach(article => {
    const { company } = article
    if (articleCounts[company]) {
      articleCounts[company]++
    } else {
      articleCounts[company] = 1
    }
  })

  return Object.keys(articleCounts).map(company => ({
    company,
    articleCount: articleCounts[company]
  }))
}

export const calculateShareOfVoice = articles => {
  const articleCounts = countArticlesByCompany(articles)
  const totalArticles = articles.length

  const shareOfVoiceData = articleCounts.map(({ company, articleCount }) => ({
    company,
    shareOfVoice: (articleCount / totalArticles) * 100
  }))

  return shareOfVoiceData
}
