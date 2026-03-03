export type Locale = 'en' | 'fr'

export interface Dictionary {
  // Global
  nav: {
    home: string
    services: string
    projects: string
    subsidiaries: string
    team: string
    careers: string
    media: string
    contact: string
    contactUs: string
  }
  footer: {
    tagline: string
    navigation: string
    copyright: string
    privacyPolicy: string
    termsOfService: string
  }
  // Hero
  hero: {
    badge: string
    tagline: string
    description: string
    discoverServices: string
    viewProjects: string
    scrollToExplore: string
  }
  // Stats
  stats: {
    sectors: string
    offices: string
    experts: string
    ambition: string
  }
  // Services Timeline
  servicesTimeline: {
    label: string
    title: string
    subtitle: string
    services: {
      step: string
      title: string
      description: string
    }[]
  }
  // Philosophy
  philosophy: {
    label: string
    lines: string[]
    description: string
    pillars: {
      title: string
      description: string
    }[]
  }
  // Social Commitment
  social: {
    headline: string[]
    subtitle: string
    marquee: string
    cards: {
      title: string
      description: string
    }[]
  }
  // Sectors Bento Grid
  sectors: {
    label: string
    title: string
    subtitle: string
    names: Record<string, string>
  }
  // Global Presence
  globalPresence: {
    label: string
    title: string
    subtitle: string
    offices: {
      type: string
    }[]
  }
  // Team Slider
  teamSlider: {
    label: string
    title: string
    subtitle: string
  }
  // CTA
  cta: {
    label: string
    title: string
    subtitle: string
    primaryBtn: string
    secondaryBtn: string
  }
  // Services Page
  servicesPage: {
    title: string
    subtitle: string
    bullets: string[]
    startProject: string
    ctaTitle: string
    ctaSubtitle: string
    step: string
  }
  // Projects Page
  projectsPage: {
    title: string
    subtitle: string
    all: string
    viewDetails: string
    statuses: {
      completed: string
      inProgress: string
      planning: string
    }
    projects: {
      title: string
      sector: string
    }[]
  }
  // Subsidiaries Page
  subsidiariesPage: {
    title: string
    subtitle: string
    descriptionTemplate: string
  }
  // Team Page
  teamPage: {
    title: string
    subtitle: string
  }
  // Careers Page
  careersPage: {
    title: string
    subtitle: string
    cultureTitle: string
    openPositions: string
    applyNow: string
    jobDescTemplate: string
    values: {
      title: string
      description: string
    }[]
  }
  // Contact Page
  contactPage: {
    title: string
    subtitle: string
    form: {
      fullName: string
      email: string
      phone: string
      company: string
      serviceOfInterest: string
      selectService: string
      message: string
      send: string
      sending: string
      messageSent: string
      weWillGetBack: string
      namePlaceholder: string
      emailPlaceholder: string
      phonePlaceholder: string
      companyPlaceholder: string
      messagePlaceholder: string
      serviceOptions: { value: string; label: string }[]
    }
    followUs: string
    validation: {
      nameRequired: string
      emailRequired: string
      serviceRequired: string
      messageRequired: string
    }
  }
  // Media Page
  mediaPage: {
    title: string
    subtitle: string
    readMore: string
    news: {
      title: string
      category: string
      excerpt: string
    }[]
  }
  // Common
  common: {
    home: string
    est: string
  }
}
