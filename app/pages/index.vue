<script setup lang="ts">
const auth = useAuth()

// simple computed
const isLoggedIn = computed(() => !!auth.accessToken.value)

const logout = async () => {
  // OPTIONAL: nanti bisa panggil API logout
  auth.accessToken.value = null
  navigateTo('/login')
}
</script>

<template>
  <main class="container">
    <!-- BELUM LOGIN -->
    <section v-if="!isLoggedIn" class="guest">
      <h1>Welcome to Inovasi Online</h1>
      <p>Platform event & vendor management</p>

      <div class="actions">
        <NuxtLink to="/login">
          <button>Login</button>
        </NuxtLink>

        <NuxtLink to="/register">
          <button class="secondary">Register</button>
        </NuxtLink>
      </div>
    </section>

    <!-- SUDAH LOGIN -->
    <section v-else class="user">
      <h1>Welcome back 👋</h1>
      <p>You are logged in.</p>

      <div class="actions">
        <button @click="logout">Logout</button>
        <!-- nanti bisa ke dashboard -->
        <!-- <NuxtLink to="/dashboard"><button>Dashboard</button></NuxtLink> -->
      </div>
    </section>
  </main>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

button {
  padding: 0.75rem 1.25rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

button.secondary {
  background: #eee;
}
</style>
