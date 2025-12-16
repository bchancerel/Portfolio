<script setup lang="ts">
const { data: home } = await useAsyncData('home', () =>
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
        <div class="canvas-bg"/>
        <div class="relative mx-auto max-w-6xl px-4 md:px-6 py-10 md:py-14">

            <header class="mb-10 flex items-center justify-between">
                <img
                    src="/images/Logo-Bleu.webp"
                    alt="Web Ben Creations"
                    class="h-12 w-auto opacity-90 transition hover:opacity-100"
                >
            </header>


            <section v-if="home" id="about" class="mb-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] md:items-start">
                <div class="my-auto">
                    <h1 class="mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
                        <span class="block text-slate-300">Benjamin Chancerel —</span>
                        <span class="bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-300 bg-clip-text text-transparent">Développeur Front-end & QA</span>
                    </h1>

                    <p v-if="home.subtitle" class="mb-5 text-lg text-sky-200/90">
                        {{ home.subtitle }}
                    </p>

                    <p v-if="home.intro" class="mb-8 max-w-xl text-sm text-slate-300 md:text-base">
                        {{ home.intro }}
                    </p>

                    <div class="flex flex-wrap gap-3 text-xs md:text-sm">
                        <NuxtLink 
                            to="/experiences"
                            class="rounded-full bg-sky-500 px-4 py-2 font-medium text-slate-950 shadow-sm transition hover:bg-sky-400"
                        > Voir mes projets
                        </NuxtLink>
                        <a href="#contact" class="rounded-full border border-slate-700/80 px-4 py-2 font-medium text-slate-200 transition hover:border-sky-400 hover:text-sky-200">
                            Me contacter
                        </a>
                    </div>
                </div>

                <aside class="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5 text-sm canvas-card-shadow backdrop-blur-md">  
                    
                    <div class="mb-5 flex justify-center">
                        <div class="h-28 w-28 overflow-hidden rounded-full ring-1 ring-slate-700/60">
                            <img
                                src="/images/profile.webp"
                                alt="Photo de Benjamin Chancerel"
                                class="h-32 w-32 object-cover"
                            >
                        </div>
                    </div>

                    <div class="mb-4 flex items-center justify-between">
                        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">
                            Disponibilité
                        </p>
                        <span class="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                            Ouvert aux opportunités
                        </span>
                    </div>

                    <ul class="space-y-3 text-xs text-slate-200">
                        <li class="flex justify-between gap-4">
                            <span class="text-slate-500">Front-End</span>
                            <span class="text-right">Nuxt · Vue · Tailwind · React</span>
                        </li>
                        <li class="flex justify-between gap-4">
                            <span class="text-slate-500">QA autom</span>
                            <span class="text-right">SpecFlow · Reqnroll · CodeceptJS</span>
                        </li>
                           <li class="flex justify-between gap-4">
                            <span class="text-slate-500">Back-End </span>
                            <span class="text-right">Django · Symfony · C#</span>
                        </li>
                        <li class="flex justify-between gap-4">
                            <span class="text-slate-500">Basé à</span>
                            <span class="text-right">Bordeaux</span>
                        </li>
                    </ul>

                    <div class="mt-6 border-t border-slate-800 pt-4 text-xs text-slate-400">
                        <p>
                            Disponible pour des missions front-end ou QA, en freelance ou CDI.  
                            N'hésitez pas à me contacter pour en discuter !
                        </p>
                    </div>
                </aside>
            </section>

            <section v-if="home" class="mb-16 border-y border-slate-800/80 bg-slate-950/60 px-0 py-8 md:px-6">
                <div class="prose prose-invert max-w-none prose-headings:font-semibold prose-h2:text-lg">
                    <ContentRenderer :value="home" />
                </div>
            </section>

            <section id="contact" class="border-t border-slate-800/80 pt-8 text-sm text-slate-300">
                <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 class="mb-1 text-base font-semibold">On travaille ensemble ?</h2>
                        <p class="text-xs text-slate-400 md:text-sm">
                            Open aux missions front, refontes d'interfaces, et projets où la qualité compte
                            vraiment.
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-3 text-xs">
                        <a href="mailto:benjamin.chancerel@outlook.com" class="rounded-full bg-sky-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-sky-400">
                            M'écrire
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" class="rounded-full border border-slate-700/80 px-4 py-2 font-medium text-slate-200 transition hover:border-sky-400 hover:text-sky-200">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>
