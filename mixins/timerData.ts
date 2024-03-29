export default {
  async asyncData({ $content, params, error }) {
    const currentDate = new Date()
    const currentYear =
      currentDate.getMonth() >= 6
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear()
    const slug = params.slug || 'data/' + currentYear
    const data = await $content(slug)
      .fetch()
      .catch((_err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      data,
    }
  },
}
