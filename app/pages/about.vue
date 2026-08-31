<script setup lang="ts">
import { capabilityGroups, experience, outcomes, profile } from '~/data/profile'

useSeoMeta({
  title: `About — ${profile.name}`,
  description: `${profile.name} is a ${profile.title} specialising in fintech, investment and crypto platforms.`
})
</script>

<template>
  <div>
    <header class="portfolio-container grid gap-12 pb-20 pt-36 md:pt-48 lg:grid-cols-12 lg:pb-32">
      <p class="eyebrow lg:col-span-3">
        About · {{ profile.name }}
      </p>
      <div class="lg:col-span-8 lg:col-start-5">
        <h1 class="editorial-display text-[clamp(4rem,8vw,8.5rem)]">
          Turning complex financial systems into clear product experiences.
        </h1>
      </div>
    </header>

    <section class="border-t border-default py-[var(--portfolio-section)]">
      <div class="portfolio-container grid gap-12 lg:grid-cols-12">
        <div
          class="aspect-[4/5] border border-default bg-elevated lg:col-span-4"
          role="img"
          aria-label="Portrait to be provided"
        >
          <div class="grid size-full place-items-center">
            <span class="eyebrow">Portrait · TODO</span>
          </div>
        </div>
        <div class="space-y-8 lg:col-span-6 lg:col-start-7">
          <p class="text-2xl leading-relaxed md:text-3xl">
            {{ profile.positioning }}
          </p>
          <p class="max-w-2xl text-lg leading-relaxed text-muted">
            {{ profile.summary }}
          </p>
          <div class="grid gap-8 border-t border-default pt-8 sm:grid-cols-2">
            <div>
              <h2 class="eyebrow">
                Current focus
              </h2>
              <p class="mt-4 leading-relaxed">
                Fintech · Investment · Crypto platforms
              </p>
            </div>
            <div>
              <h2 class="eyebrow">
                Based in
              </h2>
              <p class="mt-4 leading-relaxed">
                {{ profile.location }}
              </p>
            </div>
            <div>
              <h2 class="eyebrow">
                Email
              </h2>
              <a
                :href="`mailto:${profile.email}`"
                class="mt-4 inline-block leading-relaxed underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
              >{{ profile.email }}</a>
            </div>
            <div>
              <h2 class="eyebrow">
                Phone
              </h2>
              <a
                :href="profile.phoneHref"
                class="mt-4 inline-block leading-relaxed underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
              >{{ profile.phone }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-t border-default py-[var(--portfolio-section)]">
      <div class="portfolio-container grid gap-10 lg:grid-cols-12">
        <p class="eyebrow lg:col-span-3">
          Experience
        </p>
        <ol class="divide-y divide-default border-y border-default lg:col-span-9">
          <li
            v-for="item in experience"
            :key="`${item.company}-${item.dates}`"
            class="grid gap-5 py-8 md:grid-cols-12 md:gap-7"
          >
            <div class="md:col-span-3">
              <p class="eyebrow">
                {{ item.dates }}
              </p>
              <p class="mt-2 text-sm text-muted">
                {{ item.engagement }}
              </p>
            </div>
            <div class="md:col-span-4">
              <h2 class="text-xl font-semibold tracking-[-.025em]">
                {{ item.company }}
              </h2>
              <p class="mt-2 text-sm text-muted">
                {{ item.role }}
              </p>
              <p class="mt-1 text-sm text-muted">
                {{ item.industry }}
              </p>
            </div>
            <p class="leading-relaxed text-muted md:col-span-5">
              {{ item.summary }}
            </p>
          </li>
        </ol>
      </div>
    </section>

    <section class="border-t border-default py-[var(--portfolio-section)]">
      <div class="portfolio-container grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="eyebrow">
            Selected outcomes
          </p>
          <p class="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Quantitative outcomes reported in the CV. Project attribution is preserved exactly as supplied.
          </p>
        </div>
        <dl class="grid border-l border-t border-default sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
          <div
            v-for="item in outcomes"
            :key="`${item.value}-${item.label}`"
            class="border-b border-r border-default p-6 md:p-8"
          >
            <dt class="editorial-display text-5xl text-accent md:text-6xl">
              {{ item.value }}
            </dt>
            <dd class="mt-5 font-semibold">
              {{ item.label }}
            </dd>
            <dd class="mt-2 text-sm leading-relaxed text-muted">
              {{ item.detail }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="border-t border-default py-[var(--portfolio-section)]">
      <div class="portfolio-container grid gap-10 lg:grid-cols-12">
        <p class="eyebrow lg:col-span-3">
          Capabilities & tools
        </p>
        <dl class="divide-y divide-default border-y border-default lg:col-span-9">
          <div
            v-for="item in capabilityGroups"
            :key="item.label"
            class="grid gap-3 py-6 md:grid-cols-12 md:gap-7"
          >
            <dt class="font-semibold md:col-span-4">
              {{ item.label }}
            </dt>
            <dd class="leading-relaxed text-muted md:col-span-8">
              {{ item.value }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="border-t border-default py-[var(--portfolio-section)]">
      <div class="portfolio-container grid gap-10 lg:grid-cols-12">
        <p class="eyebrow lg:col-span-3">
          Education
        </p>
        <div class="grid gap-10 md:grid-cols-2 lg:col-span-9">
          <div>
            <h2 class="text-xl font-semibold tracking-[-.025em]">
              Bachelor of Accounting
            </h2>
            <p class="mt-3 leading-relaxed text-muted">
              Islamic Azad University Tehran · 2011—2014
            </p>
          </div>
          <div>
            <h2 class="text-xl font-semibold tracking-[-.025em]">
              Continued learning
            </h2>
            <p class="mt-3 leading-relaxed text-muted">
              Google UX Cert · NN/g · IxDF
            </p>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              Specific course titles and completion dates: TODO
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
