import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/HomePage'
import Stats from './components/statisticsPage'
import About from './components/About'
import Programmes from './components/Academics'
import Eligibility from './components/Eligibility'
import OverviewPage from './components/OverviewPage'
import SpotlightSection from './components/SpotlightSection'
import ProgrammesPage from './programs/ProgrammesPage'
import PeoplePage from './People/PeoplePage'
import PersonProfile from './People/PersonProfile'
import ResourcesPage from './Resources/ResourcesPage'
import NewsPage from './News/NewsPage'
import ContactPage from './Contact/ContactPage'
import ResearchPage from './Research/ResearchPage'
import EligibilityChecker from './Elegibilty_Checker/home'

function DropdownLoader({ label }: { label: string }) {
  return (
    <div className="route-loader" aria-live="polite" aria-label={`${label} loading`}>
      <div className="route-loader__spinner" aria-hidden="true" />
      <p className="route-loader__label">Loading {label}...</p>
    </div>
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
            <Home />
            <Stats />
            <About />
            <Programmes />
            <Eligibility />
            <OverviewPage />
            <SpotlightSection />
          </>
        )
      case '#about':
        return <About />
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
        return <ContactPage />
      case '#eligibility-checker':
        return <EligibilityChecker />
      default:
        if (activeRoute.startsWith('#people/') && activeRoute.split('/').length === 2) {
          return <PersonProfile />
        }

        return (
          <>
            <Home />
            <Stats />
            <About />
            <Programmes />
            <Eligibility />
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
      {isLoading ? (
        <DropdownLoader label={loadingLabel} />
      ) : (
        <div className="page-shell">{renderedPage}</div>
      )}
      <Footer />
    </>
  )
}

export default App
