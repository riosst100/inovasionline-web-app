<template>
  <div class="page">

    <h1>Send Push Notification</h1>

    <form @submit.prevent="submit">

      <!-- <div class="field">
        <label>User ID (target)</label>
        <input
          v-model="form.userId"
          placeholder="clxxxxxxx"
          required
        />
      </div> -->

      <div class="field">
        <label>Title</label>
        <input
          v-model="form.title"
          placeholder="Judul notifikasi"
          required
        />
      </div>

      <div class="field">
        <label>Body</label>
        <textarea
          v-model="form.body"
          rows="3"
          placeholder="Isi notifikasi"
          required
        />
      </div>

      <div class="field">
        <label>Data (JSON, optional)</label>
        <textarea
          v-model="rawData"
          rows="4"
          placeholder='{"type":"order","orderId":"123"}'
        />
      </div>

      <button :disabled="loading">
        {{ loading ? "Sending..." : "Send Push" }}
      </button>

    </form>

    <pre v-if="result" class="result">{{ result }}</pre>
    <p v-if="error" class="error">{{ error }}</p>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const config = useRuntimeConfig()
const auth = useAuth()

const form = ref({
  title: "Test Push",
  body: "Ini push dari Nuxt"
})

const rawData = ref("")
const loading = ref(false)
const error = ref("")
const result = ref("")

function getUserIdFromJwt(token: string) {
  try {
    const payload = token.split(".")[1]
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    return JSON.parse(decoded).id
  } catch {
    return null
  }
}

async function submit() {
  error.value = ""
  result.value = ""

  let data: any = undefined

  if (rawData.value.trim()) {
    try {
      data = JSON.parse(rawData.value)
    } catch {
      error.value = "Data harus JSON valid"
      return
    }
  }

  if (auth.authLoading.value) {
    await auth.refresh()
  }

  const accessToken = auth.accessToken.value

  if (!accessToken) {
    error.value = "Access token tidak ditemukan"
    return
  }

  const myUserId = getUserIdFromJwt(accessToken)

  if (!myUserId) {
    error.value = "Gagal ambil user id dari token"
    return
  }

  loading.value = true

  try {
    const res = await $fetch<{
      success: boolean
      messageId: string
    }>(`${config.public.backendUrl}/auth/push/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: {
        userId: myUserId,
        title: form.value.title,
        body: form.value.body,
        data
      }
    })

    result.value = JSON.stringify(res, null, 2)
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || "Gagal kirim push"
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page {
  max-width: 520px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

h1 {
  margin-bottom: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
}

label {
  font-size: 13px;
  margin-bottom: 4px;
}

input,
textarea {
  padding: 8px;
  font-size: 14px;
}

button {
  margin-top: 8px;
  padding: 10px 16px;
  cursor: pointer;
}

.result {
  margin-top: 16px;
  background: #f5f5f5;
  padding: 12px;
  font-size: 12px;
  white-space: pre-wrap;
}

.error {
  margin-top: 12px;
  color: red;
}
</style>
