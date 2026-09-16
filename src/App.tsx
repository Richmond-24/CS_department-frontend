import React from 'react'
import { ArrowLeft, ArrowRight, Bell, BookOpenText, House, Info, Newspaper, X } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import Stats from './components/statisticsPage'
import Programmes from './components/Academics'
import About from './components/about'
import AboutOverview from './about/About'
import OverviewPage from './components/OverviewPage'
import SpotlightSection from './components/SpotlightSection'
import Eligibility from './components/Eligibility'
import CareerProspects from './components/CareerProspects'
import ProgrammesPage from './programs/ProgrammesPage'
import PeoplePage from './People/PeoplePage'
import PersonProfile from './People/PersonProfile'
import ResourcesPage from './Resources/ResourcesPage'
import NewsPage from './News/NewsPage'
import ContactPage from './Contact/ContactPage'
import ResearchPage from './Research/ResearchPage'
import EligibilityChecker from './components/EligibilityChecker'

function DropdownLoader({ label }: { label: string }) {
  return (
    <div className="route-loader" aria-live="polite" aria-label={`${label} loading`}>
      <div className="route-loader__spinner" aria-hidden="true" />
      <p className="route-loader__label">Loading {label}...</p>
    </div>
  )
}

function PageBackButton({ activeRoute }: { activeRoute: string }) {
  const showBackButton = activeRoute !== '#home'

  if (!showBackButton) {
    return null
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    window.location.hash = '#home'
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-[#dfefff] bg-white/80 px-3.5 py-2.5 text-sm font-semibold text-[#203b82] shadow-[0_12px_30px_rgba(8,11,80,0.14)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-95 md:left-6 md:top-6"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf7ff] text-[#203b82] shadow-[0_6px_14px_rgba(32,59,130,0.12)]">
        <ArrowLeft size={15} strokeWidth={2.3} />
      </span>
      <span className="hidden sm:inline">Back</span>
    </button>
  )
}

// Helper function for subtle pop sound
const playNotificationSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Soft "pop" sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Ignore audio errors
  }
};

function NewsPrompt({
  onNavigate,
}: {
  onNavigate: (route: string, label: string) => void
}) {
  const [visible, setVisible] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    const promptShownKey = 'department_newsletter_prompt_shown'
    const hasShownThisSession = window.sessionStorage.getItem(promptShownKey) === 'true'

    if (hasShownThisSession) {
      return undefined
    }

    // Show prompt after 3 seconds once per browser session
    const timeout = window.setTimeout(() => {
      setVisible(true)
      window.sessionStorage.setItem(promptShownKey, 'true')
      playNotificationSound()
    }, 3000)

    return () => window.clearTimeout(timeout)
  }, [])

  const handleView = () => {
    setVisible(false)
    setTimeout(() => {
      onNavigate('#news', 'News & Media')
    }, 300)
  }

  const handleClose = () => {
    setVisible(false)
  }

  if (!mounted || !visible) {
    return null
  }

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-[#080b50]/10 backdrop-blur-[2px] transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* 
         Centered Modal Card 
         - Mobile: Bottom centered (safe area)
         - Desktop: Top centered but pushed down (top-32) to avoid header
      */}
      <div
        className={`
          fixed left-1/2 z-[70] w-[90vw] max-w-[420px] -translate-x-1/2
          transform rounded-3xl border border-white/60 bg-white/95 p-0
          shadow-[0_25px_50px_-12px_rgba(8,11,80,0.25)] backdrop-blur-2xl
          transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          
          /* Mobile Positioning */
          bottom-24 sm:bottom-auto
          
          /* Desktop Positioning: Pushed down from top */
          md:top-32 lg:top-40
          
          /* Animation State */
          ${visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'}
        `}
      >
        {/* Decorative Gradient Top Bar */}
        <div className="h-2 w-full rounded-t-3xl bg-gradient-to-r from-[#0798d2] via-[#203b82] to-[#0798d2]" />

        <div className="p-6 sm:p-8 relative overflow-hidden">
          {/* Background Glow Effect */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-[#0798d2]/10 blur-3xl" />

          {/* Header Section */}
          <div className="relative mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eaf7ff] text-[#203b82] shadow-inner">
                <Newspaper size={28} strokeWidth={2} />
                {/* Animated Bell Icon */}
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#0798d2] text-white shadow-md animate-bounce">
                   <Bell size={12} fill="currentColor" />
                </div>
              </div>
              <div>
                <span className="inline-block rounded-full bg-[#0798d2]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0798d2]">
                  Just In
                </span>
                <h3 className="mt-1 text-lg font-bold leading-tight text-[#080b50]">
                  Department Newsletter
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close newsletter prompt"
              className="group flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all hover:bg-slate-200 hover:text-slate-600 hover:rotate-90"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Content Body */}
          <p className="mb-8 text-sm leading-relaxed text-slate-600 relative z-10">
            Stay ahead with the latest breakthroughs, student achievements, and upcoming events. 
            Don't miss out on what's happening in Computer Science & Informatics.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row relative z-10">
            <button
              type="button"
              onClick={handleView}
              className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#080b50] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#080b50]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Read Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0798d2] to-[#203b82] opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            
            <button
              type="button"
              onClick={handleClose}
              className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function MobileBottomNav({
  activeRoute,
  onNavigate,
}: {
  activeRoute: string
  onNavigate: (route: string, label: string) => void
}) {
  const items = [
    { route: '#home', label: 'Home', icon: House },
    { route: '#about', label: 'About', icon: Info },
    { route: '#resources', label: 'Resources', icon: BookOpenText },
  ]

  const isActive = (route: string) => {
    if (route === '#resources') {
      return activeRoute === '#resources' || activeRoute.startsWith('#resources')
    }

    return activeRoute === route
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/90 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2 shadow-[0_-10px_30px_rgba(8,11,80,0.08)] backdrop-blur-xl md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 px-4">
        {items.map(({ route, label, icon: Icon }) => {
          const active = isActive(route)

          return (
            <button
              key={route}
              type="button"
              onClick={() => onNavigate(route, label)}
              aria-label={label}
              className={`group relative flex flex-col items-center justify-center rounded-[24px] px-2 py-2.5 transition-all duration-250 ease-out active:scale-95 ${
                active
                  ? 'bg-[#eaf7ff] text-[#203b82] shadow-[0_12px_26px_rgba(11,155,215,0.18)]'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-[#203b82]'
              }`}
            >
              <span
                className={`mb-1.5 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-250 ease-out ${
                  active
                    ? 'border-[#cfeeff] bg-white text-[#203b82] shadow-[0_6px_16px_rgba(32,59,130,0.12)]'
                    : 'border-transparent bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-[#203b82]'
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={2.2}
                  className={`transition-all duration-250 ease-out ${
                    active ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'
                  }`}
                />
              </span>
              <span className="text-[11px] font-semibold tracking-[-0.02em] transition-all duration-250 ease-out">
                {label}
              </span>

              {active && (
                <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#0798d2] shadow-[0_0_0_4px_rgba(7,152,210,0.12)] animate-[pulse_1.5s_ease-in-out_infinite]" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function App() {
  const [activeRoute, setActiveRoute] = React.useState<string>(() => window.location.hash || '#home')
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingLabel, setLoadingLabel] = React.useState('Home')

  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveRoute(window.location.hash || '#home')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const openSection = React.useCallback((route: string, label: string) => {
    setLoadingLabel(label)
    setIsLoading(true)

    if (window.location.hash !== route) {
      window.location.hash = route
    }

    window.setTimeout(() => {
      setActiveRoute(route)
      setIsLoading(false)
    }, 700)
  }, [])

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activeRoute])

  const programmePath =
    activeRoute === '#undergraduate'
      ? '/undergraduate'
      : activeRoute === '#postgraduate'
        ? '/postgraduate'
        : '/programmes'

  const peoplePath =
    activeRoute === '#people/teaching'
      ? '/people/teaching'
      : activeRoute === '#people/non-teaching'
        ? '/people/non-teaching'
        : activeRoute === '#people/executives'
          ? '/people/executives'
          : activeRoute === '#people/alumni'
            ? '/people/alumni'
            : '/people'

  const resourcesPath =
    activeRoute === '#resources/student-resources'
      ? '/resources/student-resources'
      : activeRoute === '#resources/calendar'
        ? '/resources/calendar'
        : activeRoute === '#resources/handbook'
          ? '/resources/handbook'
          : activeRoute === '#resources/courses'
            ? '/resources/courses'
            : activeRoute === '#resources/internship'
              ? '/resources/internship'
              : '/resources'

  const newsPath = activeRoute === '#media' ? '/media' : '/news'

  const renderPage = () => {
    switch (activeRoute) {
      case '#home':
        return (
          <>
            <HomePage />
            <Stats />
            <About />
            <Programmes />
            <Eligibility />
            <CareerProspects />
            <OverviewPage />
            <SpotlightSection />
          </>
        )
      case '#about':
        return <AboutOverview />
      case '#research':
        return <ResearchPage />
      case '#undergraduate':
      case '#postgraduate':
      case '#programmes':
        return <ProgrammesPage currentPath={programmePath} />
      case '#people':
      case '#people/teaching':
      case '#people/non-teaching':
      case '#people/executives':
      case '#people/alumni':
        return <PeoplePage currentPath={peoplePath} />
      case '#resources':
      case '#resources/student-resources':
      case '#resources/calendar':
      case '#resources/handbook':
      case '#resources/courses':
      case '#resources/internship':
        return <ResourcesPage currentPath={resourcesPath} />
      case '#news':
      case '#media':
      case '#gallery':
      case '#events':
      case '#announcements':
        return <NewsPage currentPath={newsPath} />
      case '#contact':
      case '#apply':
        return <ContactPage />
      case '#careers':
        return <CareerProspects />
      case '#executives':
        return <PeoplePage currentPath="/people/executives" />
      case '#eligibility-checker':
        return <EligibilityChecker />
      default:
        if (activeRoute.startsWith('#people/') && activeRoute.split('/').length === 2) {
          return <PersonProfile />
        }

        return (
          <>
            <HomePage />
            <Stats />
            <About />
            <Programmes />
            <Eligibility />
            <CareerProspects />
            <OverviewPage />
            <SpotlightSection />
          </>
        )
    }
  }

  React.useEffect(() => {
    const pageElements = document.querySelectorAll('.page-shell > *')

    if (!pageElements.length) {
      return
    }

    pageElements.forEach((element, index) => {
      element.classList.add('scroll-reveal')
      element.setAttribute('style', `transition-delay: ${index * 80}ms;`)

      requestAnimationFrame(() => {
        if (element.getBoundingClientRect().top < window.innerHeight + 120) {
          element.classList.add('is-visible')
        }
      })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    )

    pageElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [activeRoute, isLoading])

  const renderedPage = renderPage()

  return (
    <>
      <Header onNavigate={openSection} activeRoute={activeRoute} />
      <PageBackButton activeRoute={activeRoute} />
      
      {/* Redesigned News Prompt */}
      <NewsPrompt onNavigate={openSection} />
      
      {isLoading ? (
        <DropdownLoader label={loadingLabel} />
      ) : (
        <div className="page-shell pb-[92px] md:pb-0">{renderedPage}</div>
      )}
      <Footer />
      <MobileBottomNav activeRoute={activeRoute} onNavigate={openSection} />
    </>
  )
}

export default App