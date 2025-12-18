<script setup lang="ts">
    import type { Collections } from '@nuxt/content'

    const { data: contact } = await useAsyncData<Collections['contact'] | null>(
        'contact-page',
        () => queryCollection('contact').first()
    )

    if (!contact.value) {
        throw createError({ statusCode: 404, statusMessage: 'Contact not found' })
    }
</script>

<template>
    <main class="min-h-screen bg-slate-950 text-slate-100">
        <div class="canvas-bg" />

        <div class="relative mx-auto max-w-4xl px-4 py-24">
            <header class="mb-16 text-center">
                <h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
                    {{ contact?.title }}
                </h1>

                <p class="mt-4 text-slate-400 md:text-lg">
                    {{ contact?.subtitle }}
                </p>
            </header>

            <section class="grid gap-6 md:grid-cols-3">
                <a
                    :href="`mailto:${contact?.email}`"
                    class="group relative rounded-2xl border border-slate-800/80
                            bg-slate-950/60 p-8 text-center
                            transition hover:-translate-y-1 hover:border-sky-400/60"
                >
                    <Icon name="mdi:email-outline" class="mx-auto h-8 w-8 text-sky-400" />
                    <h2 class="mt-4 text-lg font-semibold">Par mail</h2>
                    <p class="mt-2 text-sm text-slate-400">
                        Réponse rapide, discussion posée
                    </p>
                </a>

                <a
                    v-if="contact?.links?.github"
                    :href="contact.links.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group relative rounded-2xl border border-slate-800/80
                            bg-slate-950/60 p-8 text-center
                            transition hover:-translate-y-1 hover:border-emerald-400/60"
                >
                    <Icon name="mdi:github" class="mx-auto h-8 w-8 text-emerald-400" />
                    <h2 class="mt-4 text-lg font-semibold">GitHub</h2>
                    <p class="mt-2 text-sm text-slate-400">
                        Code, projets, contributions
                    </p>
                </a>

                <a
                    v-if="contact?.links?.linkedin"
                    :href="contact.links.linkedin"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group relative rounded-2xl border border-slate-800/80
                        bg-slate-950/60 p-8 text-center
                        transition hover:-translate-y-1 hover:border-sky-400/60"
                >
                    <Icon name="mdi:linkedin" class="mx-auto h-8 w-8 text-sky-400" />
                    <h2 class="mt-4 text-lg font-semibold">LinkedIn</h2>
                    <p class="mt-2 text-sm text-slate-400">
                        Pro, opportunités, réseau
                    </p>
                </a>
            </section>
        </div>
    </main>
</template>
