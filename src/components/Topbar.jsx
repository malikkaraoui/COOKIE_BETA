import { useResizablePanel } from '../hooks/useResizablePanel'

export default function Topbar() {
  const { size: height, isResizing, startResizing } = useResizablePanel({
    min: 60,
    max: 250,
    initial: 150,
    axis: 'y', // on redimensionne sur l’axe vertical
  })

  return (
    <>
      <header className="topbar" style={{ height }}>
        TAP BAR
      </header>

      <div
        className={`topbar-resizer ${isResizing ? 'is-resizing' : ''}`}
        onMouseDown={startResizing}
      />
    </>
  )
}
