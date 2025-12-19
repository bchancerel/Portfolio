<script setup lang="ts">
    const year = new Date().getFullYear()
</script>

<template>
    <footer class="relative">
        <div class="mx-auto max-w-6xl px-4 md:px-6">
            <div class="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
        </div>

        <div class="mx-auto max-w-6xl px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p class="text-center md:text-left">
                © {{ year }} <span class="text-slate-300">Web Ben Creations</span>.
                Tous droits réservés.
            </p>

            <nav class="flex items-center gap-4">
                <NuxtLink
                    to="/mentions-legales"
                    class="hover:text-sky-300 transition"
                >
                    Mentions légales
                </NuxtLink>
            </nav>
        </div>
    </footer>
</template>
