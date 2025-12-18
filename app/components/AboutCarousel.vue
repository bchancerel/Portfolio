<script setup lang="ts">
    import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

    type Slide = {
        key: string
        title: string
        items: string[]
    }

    const props = defineProps<{
        about?: {
            stack_dev?: string[]
            stack_qa?: string[]
            languages?: string[]
            outils?: string[]
        } | null
    }>()

    const slides = computed<Slide[]>(() => {
        const a = props.about
        if (!a) return []

        return [
            { key: 'stack_dev', title: 'Stack dev', items: a.stack_dev ?? [] },
            { key: 'stack_qa', title: 'Stack QA', items: a.stack_qa ?? [] },
            { key: 'languages', title: 'Langages', items: a.languages ?? [] },
            { key: 'outils', title: 'Outils', items: a.outils ?? [] },
        ].filter(s => s.items.length > 0)
    })

    const slidesLoop = computed(() =>
        [...slides.value, ...slides.value].map((s, i) => ({ ...s, _loopKey: i }))
    )

    const duration = computed(() => Math.max(12, slides.value.length * 4))

    const trackRef = ref<HTMLElement | null>(null)
    let ro: ResizeObserver | null = null

    onMounted(() => {
        const el = trackRef.value
        if (!el) return

        const update = () => {
            const distance = el.scrollWidth / 2
            el.style.setProperty('--marquee-distance', `${distance}px`)
    }

    update()
        ro = new ResizeObserver(update)
        ro.observe(el)
    })

    onBeforeUnmount(() => {
        ro?.disconnect()
    })
</script>

<template>
    <section v-if="slidesLoop.length" class="my-2 mx-auto max-w-4xl">
        <div class="relative px-12 pt-6">
            <div class="carousel-mask overflow-hidden rounded-2xl py-6 mx-6 md:mx-8 max-w-4xl">
                <div
                    ref="trackRef"
                    class="carousel-track flex flex-nowrap gap-6 will-change-transform w-max"
                    :style="{ '--duration': `${duration}s` }"
                >
                    <article
                        v-for="slide in slidesLoop"
                        :key="slide.key + '-' + slide._loopKey"
                        class="shrink-0 w-[320px] md:w-[420px]"
                    >
                        <div class="rounded-2xl border border-slate-800/80 bg-slate-950/60 backdrop-blur p-6 md:p-7 transition hover:-translate-y-1 hover:border-sky-400/60">
                            <div class="flex items-start justify-between gap-4">
                                <h2 class="text-xl font-semibold tracking-tight text-slate-100">
                                    {{ slide.title }}
                                </h2>
                            </div>

                            <div class="mt-4 flex flex-wrap gap-2">
                                <span
                                    v-for="item in slide.items"
                                    :key="item"
                                    class="rounded-full border border-slate-800/70 bg-slate-900/50 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-300"
                                >
                                    {{ item }}
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>