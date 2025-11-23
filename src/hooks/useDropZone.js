/**
 * Hook pour créer une zone de drop (dépôt)
 * Gère l'état visuel et les callbacks
 * 
 * @param {Function} onDrop - Callback appelé avec les données droppées
 * @param {Object} options - Options: { enabled, onEnter, onLeave }
 * @returns {Object} { isActive, dropHandlers, dropProps }
 * 
 * @example
 * const { isActive, dropHandlers } = useDropZone((data) => {
 *   console.log('Dropped:', data)
 * })
 * <div {...dropHandlers} style={{ border: isActive ? '2px dashed green' : 'none' }}>
 *   Drop here!
 * </div>
 */

import { useState } from 'react'

export function useDropZone(onDrop, options = {}) {
  const {
    enabled = true,
    onEnter = null,
    onLeave = null
  } = options

  const [isActive, setIsActive] = useState(false)

  const handleDragOver = (e) => {
    if (!enabled) return
    
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    
    if (!isActive) {
      setIsActive(true)
      onEnter?.()
    }
  }

  const handleDragLeave = () => {
    if (!enabled) return
    
    setIsActive(false)
    onLeave?.()
  }

  const handleDrop = (e) => {
    if (!enabled) return
    
    e.preventDefault()
    const data = e.dataTransfer.getData('text/plain')
    
    setIsActive(false)
    onLeave?.()
    
    if (data && onDrop) {
      onDrop(data)
    }
  }

  return {
    isActive,
    dropHandlers: {
      onDragOver: enabled ? handleDragOver : undefined,
      onDragLeave: enabled ? handleDragLeave : undefined,
      onDrop: enabled ? handleDrop : undefined
    },
    // Props CSS recommandés pour feedback visuel
    dropProps: {
      background: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
      border: isActive ? '2px dashed #22c55e' : '2px solid transparent',
      transition: 'all 0.2s ease'
    }
  }
}
