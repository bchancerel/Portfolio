<script setup lang="ts">
    import type { Collections } from '@nuxt/content'

    const { data: about } = await useAsyncData<Collections['about'] | null>(
        'about-page',
        () => queryCollection('about').first()
    )

    if (!about.value) {
        throw createError({ statusCode: 404, statusMessage: 'About not found' })
    }

    const isAvailable = computed(() => !!about.value?.available)

    useHead({
        title: `Benjamin Chancerel | À propos`,
    })
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
                            Mes projets <Icon name="mdi:arrow-right-circle-outline" class="h-4 w-4" />
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

            <AboutCarousel :about="about" />

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