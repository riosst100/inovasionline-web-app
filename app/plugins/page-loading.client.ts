export default defineNuxtPlugin(() => {
  const pageLoading = useState('page-loading', () => false)

  const router = useRouter()

  router.beforeEach(() => {
    pageLoading.value = true
  })

  router.afterEach(() => {
    pageLoading.value = false
  })
})
