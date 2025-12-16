<script setup lang="ts">
    import type { Collections } from '@nuxt/content'

    const { data: items } = await useAsyncData<Collections['experiences'][]>(
        'experiences-list',
        async () => {
            const res = await queryCollection('experiences').all()
            return res.sort((a, b) => (b.start ?? '').localeCompare(a.start ?? ''))
        }
    )

    const experiences = computed(() => items.value ?? [])

    const toExperience = (exp: Collections['experiences']) => {
        const p = exp?.path ?? ''
        if (p.startsWith('/experiences')) return p
        if (p.startsWith('/')) return `/experiences${p}`
        return `/experiences/${p}`
    }
</script>

<template>
    <main class="min-h-screen bg-slate-950 text-slate-100">
        <div class="canvas-bg" />

        <div class="relative mx-auto max-w-6xl px-4 py-8 md:py-12">
            <header class="mb-10 text-center">
                <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
                    Expériences
                </h1>
                <p class="mt-2 text-sm text-slate-400">
                    Un aperçu de mes expériences.
                </p>
            </header>

            <section class="grid gap-6 md:grid-cols-2">
                <NuxtLink
                    v-for="exp in experiences"
                    :key="exp.id"
                    :to="toExperience(exp)"
                    class="group rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 transition hover:-translate-y-1 hover:border-sky-400/80 hover:bg-slate-950 canvas-card-shadow"
                >
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <h2 class="text-lg font-semibold text-slate-50">
                                {{ exp.title }}
                            </h2>
                            <p class="mt-1 text-sm text-slate-400">
                                <span v-if="exp.company">{{ exp.company }}</span>
                                <span v-if="exp.company && exp.location"> · </span>
                                <span v-if="exp.location">{{ exp.location }}</span>
                            </p>
                        </div>

                        <p v-if="exp.duration" class="text-xs text-slate-500">
                            {{ exp.duration }}
                        </p>
                    </div>

                    <div v-if="exp.stack?.length" class="mt-4 flex flex-wrap gap-2">
                        <span
                            v-for="tech in exp.stack"
                            :key="tech"
                            class="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-300"
                        >
                            {{ tech }}
                        </span>
                    </div>

                    <div class="mt-5 text-xs font-medium text-sky-400 underline underline-offset-4 group-hover:text-sky-300">
                        Voir le détail →
                    </div>
                </NuxtLink>
            </section>
        </div>
    </main>
</template>
