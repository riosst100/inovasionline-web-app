<template>
  <div id="google-btn"></div>
</template>

<script setup>
onMounted(() => {
  /* global google */
  google.accounts.id.initialize({
    client_id: '418700195085-onl0on3kj8g5f3gk3f2mq888b2c0b0mm.apps.googleusercontent.com',
    callback: handleCredentialResponse
  })

  google.accounts.id.renderButton(
    document.getElementById('google-btn'),
    {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      shape: 'rectangular'
    }
  )
})

const handleCredentialResponse = async (response) => {
  // ini ID Token JWT dari Google
  const idToken = response.credential

  await $fetch('http://localhost:4000/auth/google', {
    method: 'POST',
    body: { token: idToken }
  })
}
</script>
