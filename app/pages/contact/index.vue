<script setup lang="ts">
    import type { Collections } from '@nuxt/content'

    const { data: contact } = await useAsyncData<Collections['contact'] | null>(
        'contact-page',
        () => queryCollection('contact').first()
    )

    if (!contact.value) {
        throw createError({ statusCode: 404, statusMessage: 'Contact not found' })
    }

    useHead({
        title: `Benjamin Chancerel | Contact`,
    })
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

            <BtnContact :contact="contact" />
        </div>
    </main>
</template>
