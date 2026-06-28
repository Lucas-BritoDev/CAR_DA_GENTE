import React, { useEffect, useRef } from 'react'

interface IOSInstallModalProps {
  isIOS: boolean
  onClose: () => void
}

export function IOSInstallModal({ isIOS, onClose }: IOSInstallModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    modalRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[1000002] flex items-end justify-center bg-black/60 sm:items-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white p-6 rounded-t-2xl sm:rounded-2xl shadow-xl animate-fade-in outline-none"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Instalar Aplicativo
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {isIOS ? (
          <div className="space-y-4 text-gray-700">
            <p>Para instalar o CAR DA GENTE no seu iPhone/iPad:</p>
            <ol className="list-decimal pl-5 space-y-3 font-medium">
              <li>
                Toque no ícone de <strong>Compartilhar</strong> (o quadrado com uma seta para cima) na barra do Safari.
              </li>
              <li>
                Role para baixo e toque em <strong>Adicionar à Tela de Início</strong>.
              </li>
              <li>
                Confirme tocando em <strong>Adicionar</strong> no canto superior direito.
              </li>
            </ol>
          </div>
        ) : (
          <div className="space-y-4 text-gray-700">
            <p>
              Seu navegador atual não suporta a instalação automática do nosso PWA.
            </p>
            <p>
              Você pode tentar instalar acessando o menu do seu navegador e procurando por <strong>Instalar aplicativo</strong> ou <strong>Adicionar à tela inicial</strong>.
            </p>
            <p className="text-sm bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100">
              Dica: A instalação automática funciona melhor no Chrome, Edge ou Brave.
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl transition"
        >
          Entendi
        </button>
      </div>
    </div>
  )
}
