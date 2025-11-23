/**
 * Hook pour rendre un élément draggable (glissable)
 * Gère l'état visuel pendant le drag
 * 
 * @param {boolean} enabled - Activer/désactiver le drag
 * @returns {Object} { isDragging, dragHandlers, dragProps }
 * 
 * @example
 * const { isDragging, dragHandlers } = useDraggable(true)
 * <div {...dragHandlers} style={{ opacity: isDragging ? 0.5 : 1 }}>
 *   Drag me!
 * </div>
 */

import { useState } from 'react'

export function useDraggable(enabled = true) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e, data) => {
    if (!enabled) return
    
    e.dataTransfer.effectAllowed = 'copy'
    e.dataTransfer.setData('text/plain', data)
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  return {
    isDragging,
    dragHandlers: {
      draggable: enabled,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd
    },
    // Props CSS recommandés pour feedback visuel
    dragProps: {
      opacity: isDragging ? 0.5 : 1,
      cursor: enabled ? 'grab' : 'default',
      transform: isDragging ? 'scale(0.95)' : 'scale(1)',
      transition: 'all 0.2s ease'
    }
  }
}
