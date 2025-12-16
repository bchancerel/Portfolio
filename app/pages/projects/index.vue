<script setup lang="ts">
    import type { Collections } from '@nuxt/content'

    const { data: items } = await useAsyncData<Collections['projects'][]>(
        'projects-list',
        async () => {
            const res = await queryCollection('projects').all()
            return res.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
        }
    )

    const projects = computed(() => items.value ?? [])

    const toProject = (proj: Collections['projects']) => {
        const p = proj?.path ?? ''
        if (p.startsWith('/projects')) return p
        if (p.startsWith('/')) return `/projects${p}`
        return `/projects/${p}`
    }
</script>

<template>
    <main class="min-h-screen bg-slate-950 text-slate-100">
        <div class="canvas-bg" />

        <div class="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
            <header class="mb-10 text-center">
                <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
                    Projets
                </h1>
                <p class="mt-2 text-sm text-slate-400">
                    Une liste de mes projests personnels et professionnels récents.
                </p>
            </header>

            <section class="grid gap-6 md:grid-cols-2">
                <NuxtLink
                    v-for="pro in projects"
                    :key="pro.id"
                    :to="toProject(pro)"
                    class="group block"
                >
                    <article
                        class="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/70
                            transition hover:-translate-y-1 hover:border-sky-400/80 canvas-card-shadow"
                    >
                        <div class="flex items-center justify-between gap-3 border-b border-slate-800/60 px-4 py-3">
                            <div class="flex items-center gap-2">
                                <span class="size-2.5 rounded-full bg-slate-600/60 transition group-hover:bg-red-400/90" />
                                <span class="size-2.5 rounded-full bg-slate-600/60 transition group-hover:bg-amber-300/90" />
                                <span class="size-2.5 rounded-full bg-slate-600/60 transition group-hover:bg-emerald-400/90" />
                            </div>

                            <div
                                class="hidden sm:flex items-center gap-2 rounded-full border border-slate-800/70
                                    bg-slate-950/60 px-3 py-1 text-[11px] text-slate-400"
                            >
                                <span class="inline-block size-1.5 rounded-full bg-slate-500/60" />
                                <span class="truncate max-w-[260px]">
                                    {{ pro.links?.demo || pro.links?.repo || 'project://preview' }}
                                </span>
                            </div>

                            <span v-if="pro.date" class="text-[11px] text-slate-500">
                                {{ pro.date }}
                            </span>
                        </div>

                        <div class="relative aspect-[16/9] overflow-hidden bg-slate-900/40">
                            <img
                                v-if="pro.images"
                                :src="pro.images"
                                :alt="`Aperçu ${pro.title}`"
                                class="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                                loading="lazy"
                            >
                            <div v-else class="flex h-full w-full items-center justify-center text-sm text-slate-500">
                                Pas d'aperçu (mais le projet existe, promis)
                            </div>

                            <div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"/>

                            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                                <div class="rounded-xl border border-slate-800/70 bg-slate-950/60 px-3 py-2 backdrop-blur">
                                    <p class="text-sm font-semibold text-slate-50">
                                        {{ pro.title }}
                                    </p>
                                    <p v-if="pro.date" class="text-[11px] text-slate-400">
                                        {{ pro.date }}
                                    </p>
                                </div>

                                <div class="flex size-9 items-center justify-center rounded-xl border border-slate-800/70 bg-slate-950/60 text-slate-300 transition group-hover:text-sky-300 backdrop-blur" aria-hidden="true">
                                    →
                                </div>
                            </div>
                        </div>

                        <div class="p-5">
                            <div class="flex items-start justify-between gap-4">
                                <div class="min-w-0">
                                    <p v-if="pro.description" class="line-clamp-2 text-sm text-slate-400">
                                        {{ pro.description }}
                                    </p>
                                </div>
                            </div>

                            <div v-if="pro.techs?.length" class="mt-4 flex flex-wrap gap-2">
                                <span
                                    v-for="tech in pro.techs.slice(0, 6)"
                                    :key="tech"
                                    class="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-300"
                                >
                                    {{ tech }}
                                </span>

                                <span
                                    v-if="pro.techs.length > 6"
                                    class="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-400"
                                >
                                    +{{ pro.techs.length - 6 }}
                                </span>
                            </div>

                            <div class="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                                <span v-if="pro.links?.demo" class="inline-flex items-center gap-1">
                                <span class="size-1.5 rounded-full bg-slate-500/60 transition group-hover:bg-sky-300/90" />
                                    Demo
                                </span>

                                <span v-if="pro.links?.repo" class="inline-flex items-center gap-1">
                                <span class="size-1.5 rounded-full bg-slate-500/60 transition group-hover:bg-emerald-300/90" />
                                    Repo
                                </span>

                                <span class="ml-auto text-sky-400 underline underline-offset-4 transition group-hover:text-sky-300">
                                    Voir le détail →
                                </span>
                            </div>
                        </div>
                    </article>
                </NuxtLink>
            </section>
        </div>
    </main>
</template>
