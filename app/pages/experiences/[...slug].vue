<script setup lang="ts">
    const route = useRoute()

    const { data: page } = await useAsyncData(route.path, () =>
        queryCollection('experiences').path(route.path).first()
    )

    if (!page.value) {
        throw createError({ statusCode: 404, statusMessage: 'Experience not found' })
    }

    const metaline = computed(() => {
        const parts = [page.value?.company, page.value?.location, page.value?.duration].filter(Boolean)
        return parts.join(' · ')
    })

    const dateline = computed(() => {
        const start = page.value?.startDate
        const end = page.value?.endDate
        if (!start && !end) return ''
        return `${start ?? '-'} — ${end ?? 'Present'}`
    })

</script>

<template>

    <main class="min-h-screen bg-slate-950 text-slate-100">
        <div class="canvas-bg" />

        <div class="relative mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header class="mb-10">
                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Expériences</p>

                <h1 class="mt-2 text-3xl font-semibold tracking-tight md:text-4xl"> {{ page?.title }} </h1>

                <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                    <span v-if="metaline"> {{ metaline }} </span>
                    <span v-if="metaline && dateline" class="text-slate-600"> · </span>
                    <span v-if="dateline"> {{ dateline }} </span>
                </div>

                <div v-if="page?.stack?.length" class="mt-4 flex flex-wrap gap-2">
                    <span
                        v-for="tech in page?.stack"
                        :key="tech"
                        class="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-300"
                    >
                      {{ tech }}
                    </span>
                </div>
            </header>

            <section class="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-5 md:p-7 canvas-card-show">
                <div class="prose prove-invert max-w-none prose-headings:font-semibold">
                    <ContentRenderer v-if="page" :value="page" />
                </div>
            </section>

            <div class="mt-8">
                <NuxtLink 
                    to="/experiences"
                    class="text-sm text-sky-400 hover:text-sky-300 underline underline-offset-4"
                ><Icon name="heroicons:arrow-left" class="h-4 w-4" /></NuxtLink>
            </div>
        </div>
    </main>
</template>