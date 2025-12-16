<script setup lang="ts">
  const progress = ref(0)

  const update = () => {
    const doc = document.documentElement
    const scrollTop = window.scrollY || doc.scrollTop
    const max = (doc.scrollHeight - window.innerHeight) || 1
    progress.value = Math.min(1, Math.max(0, scrollTop / max))
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="scroll-indicator">
      <div class="scroll-indicator__bar" :style="{ transform: `scaleX(${progress})` }" />
    </div>

    <NuxtPage />

  </div>
</template>