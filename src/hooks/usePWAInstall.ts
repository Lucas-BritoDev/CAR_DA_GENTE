import { useEffect, useState, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const INSTALLED_FLAG = 'pwa_installed'

function getIsStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    (navigator as any).standalone === true
  )
}

function getIsIOS(): boolean {
  const ua = window.navigator.userAgent.toLowerCase()
  const isIOSDevice = /iphone|ipad|ipod/.test(ua)
  // iPadOS 13+ se identifica como Mac com touch
  const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  return isIOSDevice || isIPadOS
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState<boolean>(
    () => getIsStandalone() || localStorage.getItem(INSTALLED_FLAG) === 'true'
  )
  const isIOS = getIsIOS()

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault() // impede o mini-infobar nativo
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => {
      localStorage.setItem(INSTALLED_FLAG, 'true')
      setIsInstalled(true)
      setDeferredPrompt(null)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)

    // se abriu já em standalone, marca instalado
    if (getIsStandalone()) {
      localStorage.setItem(INSTALLED_FLAG, 'true')
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  // dispara o prompt nativo (Chromium). Retorna o desfecho.
  const promptInstall = useCallback(async (): Promise<
    'accepted' | 'dismissed' | 'unavailable'
  > => {
    if (!deferredPrompt) return 'unavailable'
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      localStorage.setItem(INSTALLED_FLAG, 'true')
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
    return outcome
  }, [deferredPrompt])

  return {
    isInstalled,
    isIOS,
    canPromptNative: !!deferredPrompt, // true só em Chromium instalável
    promptInstall
  }
}
