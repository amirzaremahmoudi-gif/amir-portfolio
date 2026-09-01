import { localizedPortfolio, type PortfolioLocale } from '~/data/profile'

export function usePortfolioContent() {
  const { locale } = useI18n()
  const activeLocale = computed<PortfolioLocale>(() => locale.value === 'fa' ? 'fa' : 'en')
  const content = computed(() => localizedPortfolio[activeLocale.value])

  return {
    activeLocale,
    profile: computed(() => content.value.profile),
    expertise: computed(() => content.value.expertise),
    outcomes: computed(() => content.value.outcomes),
    experience: computed(() => content.value.experience),
    capabilityGroups: computed(() => content.value.capabilityGroups)
  }
}
