<script setup lang="ts">
    const { data: page } = await useAsyncData('mentionsLegales', () =>
        queryCollection('mentionsLegales').first()
    )

    useHead({
        title: `Benjamin Chancerel | Mentions Légales`,
    })
</script>

<template>
    <main class="min-h-screen bg-slate-950 text-slate-100">
        <div class="canvas-bg"/>
        <div class="relative mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">
            <section v-if="page" class="mb-16 border-y border-slate-800/80 bg-slate-950/60 px-0 py-8 md:px-6">
                <div class="prose prose-invert max-w-none prose-headings:font-semibold prose-h2:text-lg px-4 md:px-0">
                    <ContentRenderer :value="page" />
                </div>
            </section>
        </div>
    </main>
</template>