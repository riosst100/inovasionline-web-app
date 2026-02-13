<template>
  <div style="padding:20px">
    <h3>TWA postMessage test</h3>

    <button @click="send">
      Send to Android
    </button>

    <pre style="margin-top:12px">{{ logs.join('\n') }}</pre>
  </div>
</template>

<script>
export default {

  data () {
    return {
      logs: []
    }
  },

  mounted () {
    // PENTING: ini hanya jalan di client
    window.addEventListener('message', this.onMessage)
  },

  beforeDestroy () {
    window.removeEventListener('message', this.onMessage)
  },

  methods: {

    onMessage (event) {
      // pesan balasan dari Android masuk ke sini
      this.logs.push('from android: ' + event.data)
    },

    send () {

      const payload = {
        type: 'PING',
        from: 'nuxt'
      }

      window.postMessage(
        JSON.stringify(payload),
        '*'
      )

      this.logs.push('sent to android')
    }

  }
}
</script>
