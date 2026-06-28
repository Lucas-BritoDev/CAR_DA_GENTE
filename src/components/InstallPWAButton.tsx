import { useState } from 'react'
import { usePWAInstall } from '../hooks/usePWAInstall'
import { IOSInstallModal } from './IOSInstallModal'

export function InstallPWAButton() {
  const { isInstalled, isIOS, canPromptNative, promptInstall } = usePWAInstall()
  const [showIOSModal, setShowIOSModal] = useState(false)

  if (isInstalled) return null

  const handleClick = async () => {
    if (canPromptNative) {
      const outcome = await promptInstall()
      if (outcome === 'unavailable') setShowIOSModal(true) // fallback defensivo
      return
    }
    // iOS ou navegador sem prompt nativo (ex.: Firefox desktop)
    setShowIOSModal(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Instalar aplicativo"
        className="pwa-install-button fixed right-6 z-[9990] flex items-center gap-2 rounded-full bg-[#168821] px-4 py-3 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ bottom: '150px' }}
      >
        <img src="/logo.png" alt="" className="h-5 w-auto" />
        <span className="text-sm font-semibold">Instalar app</span>
      </button>

      {showIOSModal && (
        <IOSInstallModal isIOS={isIOS} onClose={() => setShowIOSModal(false)} />
      )}
    </>
  )
}
