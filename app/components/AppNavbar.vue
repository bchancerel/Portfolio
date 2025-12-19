<script setup lang="ts">
    const route = useRoute()
    const open = ref(false)

    type NavLink = {
        to: string
        label: string
        icon: string
    }

    const links: NavLink[] = [
        { label: 'Projets', to: '/projects', icon: 'heroicons:squares-2x2' },
        { label: 'Expériences', to: '/experiences', icon: 'heroicons:briefcase' },
        { label: 'À propos', to: '/about', icon: 'heroicons:information-circle' },
        { label: 'Contact', to: '/contact', icon: 'heroicons:envelope' },
    ]

    const isActive = (to: string) =>
    route.path === to || route.path.startsWith(to + '/')

    const navItems = computed(() => {
        const center = {
            kind: 'logo' as const,
            to: '/',
            label: 'Accueil',
        }

        const left = links.slice(0, 2).map((l) => ({ kind: 'link' as const, ...l }))
        const right = links.slice(2, 4).map((l) => ({ kind: 'link' as const, ...l }))

        return [...left, center, ...right]
    })

    watch(
        () => route.path,
        () => (open.value = false)
    )
</script>

<template>
    <header class="sticky top-0 z-50">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/90 to-transparent"/>

        <nav class="relative mx-auto px-4 md:px-6 pt-4">
            <div
                class="relative flex w-full md:w-fit md:mx-auto items-center
                justify-between md:justify-center
                rounded-2xl border border-slate-800/80
                bg-slate-950/60 px-3 md:px-4 py-2
                backdrop-blur-md canvas-card-shadow"
            >
                <div class="flex items-center gap-1">
                    <button
                        type="button"
                        class="md:hidden inline-flex items-center justify-center
                        rounded-xl border border-slate-800/80
                        bg-slate-950/40 px-3 py-2 text-slate-200 transition
                        hover:border-sky-400/60 hover:text-sky-200"
                        :aria-expanded="open"
                        aria-label="Ouvrir le menu"
                        @click="open = !open"
                    >
                        <span class="relative block h-5 w-5">
                            <Icon
                                name="heroicons:bars-3"
                                class="absolute inset-0 h-5 w-5 transition-all duration-300 ease-out"
                                :class="open
                                ? 'opacity-0 rotate-180 scale-75'
                                : 'opacity-100 rotate-0 scale-100'"
                            />
                            <Icon
                                name="heroicons:x-mark"
                                class="absolute inset-0 h-5 w-5 transition-all duration-300 ease-out"
                                :class="open
                                ? 'opacity-100 rotate-0 scale-100'
                                : 'opacity-0 -rotate-180 scale-75'"
                            />
                        </span>
                    </button>

                    <div class="hidden md:flex items-center justify-center gap-4 px-2">
                        <div v-for="item in navItems" :key="item.kind + ('to' in item ? item.to : '')" >
                            <NuxtLink
                                v-if="item.kind === 'link'"
                                :to="item.to"
                                class="group relative inline-flex items-center justify-center
                                rounded-xl p-2.5 transition"
                                :class="isActive(item.to)
                                ? 'text-sky-300'
                                : 'text-slate-300 hover:text-sky-200'"
                                :aria-label="item.label"
                                :title="item.label"
                            >
                                <span
                                    class="absolute inset-0 rounded-xl transition"
                                    :class="isActive(item.to)
                                        ? 'bg-sky-400/10 ring-1 ring-sky-400/20'
                                        : 'opacity-0 group-hover:opacity-100 bg-slate-900/40'"
                                />
                                <Icon :name="item.icon" class="relative z-10 h-6 w-6" />
                            </NuxtLink>

                            <NuxtLink
                                v-else
                                to="/"
                                aria-label="Accueil"
                                title="Accueil"
                                class="group relative inline-flex items-center
                                justify-center mx-10"
                            >
                                <span class="absolute -inset-2 rounded-full bg-sky-400/20 blur-md opacity-50 animate-ping [animation-duration:2.4s]"/>

                                <span
                                    class="relative flex items-center justify-center
                                        rounded-full bg-slate-950/40 p-2.5
                                        backdrop-blur
                                        shadow-[0_0_0_1px_rgba(56,189,248,0.12),0_10px_30px_-14px_rgba(56,189,248,0.45)]
                                        transition-transform duration-300
                                        group-hover:scale-105
                                        animate-[breathe_3s_ease-in-out_infinite]"
                                >
                                    <img
                                        src="/images/Logo-Bleu.webp"
                                        alt="Web Ben Creations"
                                        class="h-11 w-auto opacity-95"
                                    >
                                </span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="md:hidden w-[44px]" />
            </div>

            <div
                class="md:hidden mt-2 overflow-hidden rounded-2xl
                    border border-slate-800/80 bg-slate-950/60
                    backdrop-blur-md canvas-card-shadow
                    transition-[max-height,opacity,transform] duration-300"
                :class="open
                    ? 'max-h-96 opacity-100 translate-y-0'
                    : 'max-h-0 opacity-0 -translate-y-1'"
            >
                <div class="p-2">
                    <!-- HOME (mobile only) -->
                    <NuxtLink
                        to="/"
                        class="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition
                        hover:bg-slate-900/40 text-slate-200"
                        :class="isActive('/') ? 'bg-sky-400/10 text-sky-200 ring-1 ring-sky-400/20' : ''"
                    >
                        <span class="inline-flex items-center gap-2">
                            <span class="relative inline-flex items-center justify-center">
                                <span class="absolute -inset-2 rounded-full bg-sky-400/20 blur-md opacity-40" />
                                <img
                                    src="/images/Logo-Bleu.webp"
                                    alt="Accueil"
                                    class="relative h-6 w-auto opacity-95"
                                >
                            </span>
                            <span>Accueil</span>
                        </span>

                        <Icon name="heroicons:arrow-right" class="h-4 w-4 text-slate-400" />
                    </NuxtLink>

                    <div class="my-2 h-px bg-slate-800/80" />

                    <NuxtLink
                        v-for="link in links"
                        :key="link.to"
                        :to="link.to"
                        class="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition"
                        :class="isActive(link.to)
                        ? 'bg-sky-400/10 text-sky-200 ring-1 ring-sky-400/20'
                        : 'text-slate-200 hover:bg-slate-900/40'"
                    >
                        <span class="inline-flex items-center gap-2">
                            <Icon :name="link.icon" class="h-5 w-5" />
                            <span>{{ link.label }}</span>
                        </span>
                        <Icon name="heroicons:arrow-right" class="h-4 w-4 text-slate-400" />
                    </NuxtLink>
                </div>
            </div>
        </nav>
    </header>
</template>
