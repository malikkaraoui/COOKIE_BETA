import { useResizablePanel } from '../hooks/useResizablePanel'

export default function Sidebar() {
  const { size: width, isResizing, startResizing } = useResizablePanel({
    min: 110,
    max: 420,
    initial: 200,
    axis: 'x', // on redimensionne sur l’axe horizontal
  })

  return (
    <>
      <nav className="sidebar" style={{ width }}>
        NAVIGATION
      </nav>

      <div
        className={`sidebar-resizer ${isResizing ? 'is-resizing' : ''}`}
        onMouseDown={startResizing}
      />
    </>
  )
}
