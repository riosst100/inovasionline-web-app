export default defineNuxtPlugin((nuxtApp) => {
  const pageLoading = useState('page-loading', () => false)

  nuxtApp.hook('page:start', () => {
    pageLoading.value = true
  })

  nuxtApp.hook('page:finish', () => {
    pageLoading.value = false
  })
})
