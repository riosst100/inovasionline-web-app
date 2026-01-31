import { ref } from 'vue'

const isGlobalMuted = ref(true)

export const useVideoAudio = () => {
  return {
    isGlobalMuted
  }
}