<script setup lang="ts">
    const route = useRoute()

    const slugPath = computed(() => {
        const s = route.params.slug
        return '/' + (Array.isArray(s) ? s.join('/') : s ?? '')
    })

    const contentPath = computed(() => `/projects${slugPath.value}`)

    const { data: page } = await useAsyncData(
        () => `project:${contentPath.value}`,
        () => queryCollection('projects').path(contentPath.value).first(),
        { watch: [contentPath] }
    )

    if (!page.value) {
        throw createError({ statusCode: 404, statusMessage: 'Project not found' })
    }

    const hasDemo = computed(() => !!page.value?.links?.demo)
    const hasRepo = computed(() => !!page.value?.links?.repo)
</script>

<template>
    <main class="min-h-screen bg-slate-950 text-slate-100">
        <div class="canvas-bg" />

        <div class="relative mx-auto max-w-4xl px-4 py-8 md:py-12">
            <header class="mb-10">
                <div class="mb-8">
                    <NuxtLink
                        to="/projects"
                        class="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 underline underline-offset-4"
                    >
                        <Icon name="heroicons:arrow-left" class="h-4 w-4" />
                    </NuxtLink>
                </div>

                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Projets
                </p>

                <div class="mt-2 flex items-start justify-between gap-6">
                    <div class="min-w-0">
                        <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
                            {{ page?.title }}
                        </h1>
                        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
                            <span v-if="page?.date" class="inline-flex items-center gap-2">
                                <span class="size-1.5 rounded-full bg-slate-600/60" />
                                {{ page.date }}
                            </span>
                        </div>

                        <p v-if="page?.description" class="mt-4 text-sm text-slate-300/90">
                            {{ page.description }}
                        </p>
                    </div>

                    <div class="shrink-0 flex flex-col items-end gap-2">
                        <NuxtLink
                            v-if="hasDemo"
                            :to="page!.links!.demo"
                            external
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2
                                    text-xs text-slate-200 transition hover:border-sky-400/60 hover:text-sky-200"
                        >
                            <Icon name="heroicons:arrow-top-right-on-square" class="h-4 w-4" />
                        </NuxtLink>

                        <NuxtLink
                            v-if="hasRepo"
                            :to="page!.links!.repo"
                            external
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2
                                    text-xs text-slate-200 transition hover:border-emerald-400/60 hover:text-emerald-200"
                        >
                            <Icon name="mdi:github" class="h-4 w-4" />
                        </NuxtLink>
                    </div>
                </div>

                <div v-if="page?.techs?.length" class="mt-6 flex flex-wrap gap-2">
                    <span
                        v-for="tech in page.techs"
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
