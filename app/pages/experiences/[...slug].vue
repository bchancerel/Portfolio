<script setup lang="ts">
    const route = useRoute()

    const slugPath = computed(() => {
        const s = route.params.slug
        return '/' + (Array.isArray(s) ? s.join('/') : s ?? '')
    })

    const contentPath = computed(() => `/experiences${slugPath.value}`)

    const { data: page } = await useAsyncData(
        () => `experience:${contentPath.value}`,
        () => queryCollection('experiences').path(contentPath.value).first(),
        { watch: [contentPath] }
    )

    if (!page.value) {
        throw createError({ statusCode: 404, statusMessage: 'Experience not found' })
    }

    const metaline = computed(() => {
        const parts = [page.value?.company, page.value?.location, page.value?.duration].filter(Boolean)
        return parts.join(' · ')
    })

</script>

<template>
    <main class="min-h-screen bg-slate-950 text-slate-100">
        <div class="canvas-bg" />

        <div class="relative mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header class="mb-10">
                <div class="mb-8">
                    <NuxtLink 
                        to="/experiences"
                        class="text-sm text-sky-400 hover:text-sky-300 underline underline-offset-4"
                    ><Icon name="heroicons:arrow-left" class="h-4 w-4" /></NuxtLink>
                </div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Expériences</p>

                <div class="mt-2 flex items-start justify-between gap-6">
                    <div class="min-w-0">
                        <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
                            {{ page?.title }}
                        </h1>

                        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                            <span v-if="metaline">{{ metaline }}</span>
                        </div>
                    </div>

                    <div
                        v-if="page?.logo"
                        class="shrink-0 size-16 md:size-20 rounded-full
                                border border-slate-800/80
                                bg-slate-950/60
                                overflow-hidden"
                    >
                        <img
                            :src="page.logo"
                            :alt="page?.company ? `Logo ${page.company}` : 'Logo entreprise'"
                            class="h-full w-full object-cover"
                            loading="lazy"
                        >
                    </div>
                </div>

                <div v-if="page?.stack?.length" class="mt-4 flex flex-wrap gap-2">
                    <span
                        v-for="tech in page.stack"
                        :key="tech"
                        class="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-300"
                    >
                      {{ tech }}
                    </span>
                </div>
            </header>

            <section class="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 md:p-7 canvas-card-show">
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
                    <ContentRenderer v-if="page" :value="page" />
                </div>
            </section>
        </div>
    </main>
</template>