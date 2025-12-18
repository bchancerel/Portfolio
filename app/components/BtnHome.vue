<template>
    <NuxtLink 
        to="/experiences"
        class="
            group relative overflow-hidden
            rounded-full bg-sky-500 px-4 py-2
            font-medium text-slate-950
            shadow-sm
            transition-all duration-300 ease-out
            hover:-translate-y-0.5
            hover:bg-sky-400
            hover:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.8)]
            active:translate-y-0
        "
    >
        <span class="relative z-10">Mes Expériences</span>

        <span
            class="
                pointer-events-none absolute inset-0
                opacity-0 blur-xl
                transition-opacity duration-300
                group-hover:opacity-100
                bg-sky-400/40
            "
        />
    </NuxtLink>

    <NuxtLink 
        to="/contact" 
        class="
            group relative overflow-hidden
            rounded-full border border-slate-700/80
            px-4 py-2
            font-medium text-slate-200
            transition-all duration-300 ease-out
            hover:-translate-y-0.5
            hover:border-sky-400
            hover:text-sky-300
        "
    >
        <span class="relative z-10">Me contacter</span>

        <span
            class="
                absolute inset-0 -translate-x-full
                bg-sky-400/10
                transition-transform duration-300
                group-hover:translate-x-0
            "
        />
    </NuxtLink>
</template>