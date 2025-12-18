<script setup lang="ts">
    import type { Collections } from '@nuxt/content'

    const props = withDefaults(defineProps<{
        limit?: number
        title?: string
        subtitle?: string
        class?: string
    }>(), {
        limit: 2,
        title: 'Derniers projets',
        subtitle: 'Un avant-goût, sans spoiler',
        class: '',
    })

    const { data: items } = await useAsyncData<Collections['projects'][]>(
        `latest-projects-preview-${props.limit}`,
        async () => {
            const res = await queryCollection('projects').all()
            return res.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
        }
    )

    const latestProjects = computed(() => (items.value ?? []).slice(0, props.limit))

    const toProject = (proj: Collections['projects']) => {
        const p = proj?.path ?? ''
        if (p.startsWith('/projects')) return p
        if (p.startsWith('/')) return `/projects${p}`
        return `/projects/${p}`
    }

    const cover = (pro: Collections['projects']) => {
        const img: string | string[] | undefined = (pro as { images?: string | string[] }).images
        if (Array.isArray(img)) return img[0]
        return img
    }
</script>

<template>
    <section v-if="latestProjects.length" :class="['mt-10', props.class]">
        <div class="mb-4 flex items-end justify-between gap-4">
            <div>
                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {{ props.title }}
                </p>
                <h2 class="mt-1 text-lg font-semibold text-slate-100">
                    {{ props.subtitle }}
                </h2>
            </div>

            <NuxtLink
                to="/projects"
                class="inline-flex items-center gap-1 text-xs text-sky-400 underline underline-offset-4 transition hover:text-sky-300"
            >
                Voir tout
                <Icon name="heroicons:arrow-right" class="h-4 w-4" />
            </NuxtLink>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
            <NuxtLink
                v-for="pro in latestProjects"
                :key="pro.id"
                :to="toProject(pro)"
                class="group block"
            >
                <article
                class="overflow-hidden rounded-2xl border border-slate-800/80
                        bg-slate-950/70 transition hover:-translate-y-1
                        hover:border-sky-400/80 canvas-card-shadow"
                >
                    <div class="relative aspect-[16/9] overflow-hidden bg-slate-900/40">
                        <img
                            v-if="cover(pro)"
                            :src="cover(pro)"
                            :alt="`Aperçu ${pro.title}`"
                            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                        >

                        <div class="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"/>

                        <div class="absolute bottom-3 left-3 right-3 flex justify-between">
                            <div class="rounded-xl border border-slate-800/70 bg-slate-950/60 px-3 py-2 backdrop-blur">
                                <p class="text-sm font-semibold text-slate-50">{{ pro.title }}</p>
                                <p v-if="pro.date" class="text-[11px] text-slate-400">{{ pro.date }}</p>
                            </div>

                            <div class="flex size-9 items-center justify-center rounded-xl border border-slate-800/70 bg-slate-950/60 text-slate-300 transition group-hover:text-sky-300" aria-hidden="true">
                                <Icon name="heroicons:arrow-right" class="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div class="p-5">
                        <p v-if="pro.description" class="line-clamp-2 text-sm text-slate-400">
                            {{ pro.description }}
                        </p>

                        <div v-if="pro.techs?.length" class="mt-4 flex flex-wrap gap-2">
                            <span
                                v-for="tech in pro.techs.slice(0, 5)"
                                :key="tech"
                                class="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-300"
                            >
                                {{ tech }}
                            </span>
                        </div>
                    </div>
                </article>
            </NuxtLink>
        </div>
    </section>
</template>
