// On importe les hooks React dont on a besoin

// axis: 'x' → on utilise e.clientX (largeur, sidebar)
// axis: 'y' → on utilise e.clientY (hauteur, topbar)

import { useState, useEffect } from 'react'

export function useResizablePanel({
  min = 80,
  max = 200,
  initial = 100,
  axis = 'y', // 'x' = largeur, 'y' = hauteur
} = {}) {
  const [size, setSize] = useState(initial)
  const [isResizing, setIsResizing] = useState(false)

  useEffect(() => {
    function handleMouseMove(e) {
      if (!isResizing) return

      const position = axis === 'x' ? e.clientX : e.clientY

      const newSize = Math.min(max, Math.max(min, position))
      setSize(newSize)
    }

    function handleMouseUp() {
      if (isResizing) setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, min, max, axis])

  const startResizing = () => setIsResizing(true)

  return {
    size,
    isResizing,
    startResizing,
  }
}
