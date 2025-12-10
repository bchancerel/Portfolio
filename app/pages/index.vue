<script setup lang="ts">
    const {data: home} = await useAsyncData('home', () =>
        queryCollection('content').path('/').first()
    )

    if (!home.value) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Home content not found',
            fatal: true
        })
    }

</script>

<template>
    <main class="min-h-screen bg-slate-950 text-slate-100">
        <div class="mx-auto max-w-5x1 px-4 py-12">

            <section v-if="home" class="mb-16">
                <h1 class="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                    {{ home.title }}
                </h1>

                <p class="mb-6 text-xl text-sky-400">
                    {{ home.subtitle }}
                </p>

                <p class="max-w-xl text-slate-300">
                    {{ home.intro }}
                </p>
            </section>

      <section v-if="home" class="prose prose-invert mb-20">
        <ContentRenderer :value="home" />
      </section>

    </div>
  </main>
</template>