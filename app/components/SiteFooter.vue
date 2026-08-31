<template>
  <footer class="border-t border-default">
    <div class="portfolio-container py-16 md:py-24">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <p class="eyebrow mb-6">
            Let’s make complex products feel clear.
          </p>
          <p class="editorial-display max-w-4xl text-[clamp(3.25rem,7vw,7rem)]">
            Available for the right conversation.
          </p>
        </div>
        <div class="flex flex-col justify-end gap-3 text-sm lg:col-span-3 lg:col-start-10">
          <a
            href="mailto:placeholder@example.com"
            class="border-b border-default py-3 transition-colors hover:border-primary"
          >Email <span class="float-right text-muted">Placeholder</span></a>
          <a
            href="#"
            aria-disabled="true"
            class="border-b border-default py-3 text-muted"
            @click.prevent
          >LinkedIn <span class="float-right">TODO</span></a>
          <a
            href="#"
            aria-disabled="true"
            class="border-b border-default py-3 text-muted"
            @click.prevent
          >Download CV <span class="float-right">TODO</span></a>
        </div>
      </div>
      <div class="mt-20 flex flex-col gap-3 border-t border-default pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} Name Placeholder</p>
        <p>Product design · Fintech · Research · Systems</p>
      </div>
    </div>
  </footer>
</template>
