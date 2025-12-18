<script setup lang="ts">
    useHead({
        title: `Benjamin Chancerel | Expériences`,
    })
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

            <ExperiencesPreview />
        </div>
    </main>
</template>
