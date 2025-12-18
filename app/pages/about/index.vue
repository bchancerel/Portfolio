<script setup lang="ts">
    import type { Collections } from '@nuxt/content'
    import { onMounted, onBeforeUnmount } from 'vue'


    const { data: about } = await useAsyncData<Collections['about'] | null>(
        'about-page',
        () => queryCollection('about').first()
    )

    const slides = computed(() => ([
        { key: 'stack_dev', title: 'Stack dev', items: about.value?.stack_dev ?? [] },
        { key: 'stack_qa', title: 'Stack QA', items: about.value?.stack_qa ?? [] },
        { key: 'languages', title: 'Langages', items: about.value?.languages ?? [] },
        { key: 'outils', title: 'Outils', items: about.value?.outils ?? [] },
        ]).filter(s => s.items.length > 0))

    const index = ref(0)
    const isHovering = ref(false)

    const goTo = (i: number) => {
        const n = slides.value.length
        if (!n) return
        index.value = (i + n) % n
    }

    const next = () => goTo(index.value + 1)
    const prev = () => goTo(index.value - 1)

    let timer: ReturnType<typeof setInterval> | null = null

    onMounted(() => {
        timer = setInterval(() => {
            if (!isHovering.value) next()
        }, 7000)
    })

    onBeforeUnmount(() => {
        if (timer) clearInterval(timer)
    })

    if (!about.value) {
        throw createError({ statusCode: 404, statusMessage: 'About not found' })
    }

    const isAvailable = computed(() => !!about.value?.available)
</script>

<template>
    <main class="min-h-screen bg-slate-950 text-slate-100">
        <div class="canvas-bg" />

        <div class="relative mx-auto max-w-6xl px-4 py-10 md:py-14">

            <header class="mb-12 md:mb-16">

                <div class="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div class="max-w-3xl">
                        <h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
                            {{ about?.title }}
                        </h1>

                        <p v-if="about?.subtitle" class="mt-4 text-base text-slate-300/90 md:text-lg">
                            {{ about.subtitle }}
                        </p>

                        <div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                            <span v-if="about?.location" class="inline-flex items-center gap-2">
                                <Icon name="mdi:map-marker" class="h-4 w-4 text-sky-400" />
                                {{ about.location }}
                            </span>

                            <span
                                v-if="isAvailable!"
                                class="inline-flex items-center gap-2
                                        rounded-full px-3 py-1
                                        bg-emerald-400/5
                                        ring-1 ring-emerald-400/20
                                        animate-[status-breathe_4s_ease-in-out_infinite]"
                            >
                                <span class="relative flex size-3 items-center justify-center">
                                    <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-600/80" />
                                    <span class="relative size-1.5 inline-flex rounded-full bg-emerald-400/90"/>
                                </span>

                                <span class="text-emerald-400 text-sm font-medium">
                                    Ouvert aux opportunités
                                </span>
                            </span>
                        </div>
                    </div>

           
                    <div class="flex flex-wrap gap-2">
                        <NuxtLink
                            to="/projects"
                            class="inline-flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-2
                                    text-sm text-slate-200 transition hover:border-sky-400/60 hover:text-sky-200"
                        >
                            Mes projets →
                        </NuxtLink>

                        <NuxtLink
                            v-if="about?.links?.github"
                            :to="about.links.github"
                            external
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-2
                                    text-sm text-slate-200 transition hover:border-emerald-400/60 hover:text-emerald-200"
                        >
                            <Icon name="mdi:github" class="h-4 w-4" />
                        </NuxtLink>

                        <NuxtLink
                            v-if="about?.links?.linkedin"
                            :to="about.links.linkedin"
                            external
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-2
                                    text-sm text-slate-200 transition hover:border-sky-400/60 hover:text-sky-200"
                        >
                            <Icon name="mdi:linkedin" class="h-4 w-4" />
                        </NuxtLink>
                    </div>
                </div>
            </header>

            <section class="my-2 mx-auto max-w-4xl" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
                <div class="relative px-12 pt-6">
                    <div class="overflow-hidden rounded-2xl py-6 mx-6 md:mx-12 max-w-4xl">
                        <div class="flex transition-transform duration-700 ease-out will-change-transform md:mx-12" :style="{ transform: `translateX(-${index * 100}%)` }">
                            <article v-for="slide in slides" :key="slide.key" class="w-full shrink-0">
                                <div
                                    class="rounded-2xl border border-slate-800/80
                                        bg-slate-950/60 backdrop-blur
                                        p-6 md:p-7 mx-2 md:mx-12 max-w-4xl
                                        transition hover:-translate-y-1 hover:border-sky-400/60"
                                >
                                    <div class="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 class="text-xl font-semibold tracking-tight text-slate-100">
                                                {{ slide.title }}
                                            </h2>
                                        </div>

                                    </div>

                                    <div class="mt-4 flex flex-wrap gap-2">
                                        <span
                                            v-for="item in slide.items"
                                            :key="item"
                                            class="rounded-full border border-slate-800/70 bg-slate-900/50
                                                px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-300"
                                        >
                                            {{ item }}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>

                    <button
                        type="button"
                        class="absolute left-2 top-1/2 -translate-y-1/2
                                rounded-xl border border-slate-800/80 bg-slate-950/70 px-3 py-2
                                text-slate-200 transition hover:border-sky-400/60 hover:text-sky-200"
                        aria-label="Previous slide"
                        @click="prev"
                    >
                        <Icon name="mdi:chevron-left" class="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        class="absolute right-2 top-1/2 -translate-y-1/2
                                rounded-xl border border-slate-800/80 bg-slate-950/70 px-3 py-2
                                text-slate-200 transition hover:border-sky-400/60 hover:text-sky-200"
                        aria-label="Next slide"
                        @click="next"
                    >
                        <Icon name="mdi:chevron-right" class="h-4 w-4" />
                    </button>
                </div>

                <div class="mt-4 flex items-center justify-center gap-2">
                    <button
                        v-for="(_, i) in slides"
                        :key="i"
                        type="button"
                        class="h-2.5 w-2.5 rounded-full transition"
                        :class="i === index ? 'bg-sky-400' : 'bg-slate-700 hover:bg-slate-500'"
                        :aria-label="`Go to slide ${i + 1}`"
                        @click="goTo(i)"
                    />
                </div>
            </section>

            <section class="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 md:p-7 mt-10 canvas-card-show">
                <div 
                    class="prose prose-invert max-w-none
                            prose-headings:font-semibold
                            prose-h1:mt-0 prose-h1:mb-4
                            prose-h2:mt-8 prose-h2:mb-3
                            prose-p:leading-relaxed
                            prose-ul:pl-6 prose-ol:pl-6
                            prose-li:my-1
                            prose-strong:text-slate-100
                            prose-a:text-sky-300 prose-a:no-underline hover:prose-a:underline
                            prose-hr:border-slate-800"
                    >
                    <ContentRenderer v-if="about" :value="about" />
                </div>
            </section>
        </div>
    </main>
</template>