/**
 * EXEMPLE : Composant de démonstration des hooks drag & drop
 * 
 * Ce fichier montre comment réutiliser useDraggable et useDropZone
 * dans un contexte différent (liste de tâches)
 * 
 * NE PAS UTILISER EN PRODUCTION - JUSTE POUR RÉFÉRENCE
 */

import { useState } from 'react'
import { useDraggable } from '../hooks/useDraggable'
import { useDropZone } from '../hooks/useDropZone'

// Exemple 1 : Item draggable simple
function DraggableTask({ task, onComplete }) {
  const { dragHandlers, dragProps } = useDraggable(true)

  return (
    <div
      style={{
        padding: '12px',
        margin: '8px 0',
        background: '#1e293b',
        borderRadius: '8px',
        ...dragProps
      }}
      {...dragHandlers}
      onDragStart={(e) => dragHandlers.onDragStart(e, task.id)}
    >
      <h4>{task.title}</h4>
      <p style={{ fontSize: 14, color: '#94a3b8' }}>{task.description}</p>
      <button onClick={() => onComplete(task.id)}>✓ Terminer</button>
    </div>
  )
}

// Exemple 2 : Zone de drop avec feedback
function TaskDropZone({ title, onDrop, color = '#22c55e' }) {
  const [count, setCount] = useState(0)
  const [isPulsing, setIsPulsing] = useState(false)

  const { isActive, dropHandlers, dropProps } = useDropZone(
    (taskId) => {
      onDrop(taskId)
      setCount(prev => prev + 1)
    },
    {
      enabled: true,
      onEnter: () => setIsPulsing(true),
      onLeave: () => setIsPulsing(false)
    }
  )

  return (
    <div
      style={{
        padding: '16px',
        minHeight: '120px',
        borderRadius: '12px',
        ...dropProps,
        background: isActive ? `rgba(${color}, 0.2)` : '#0f172a',
        border: isActive ? `2px dashed ${color}` : '2px solid #334155',
        animation: isPulsing ? 'pulse 1s infinite' : 'none'
      }}
      {...dropHandlers}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: 12, color: '#64748b' }}>
        {count} tâche{count > 1 ? 's' : ''} déposée{count > 1 ? 's' : ''}
      </p>
    </div>
  )
}

// Exemple 3 : Application complète avec drag & drop
export function TaskBoardExample() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Tâche 1', description: 'À faire', status: 'todo' },
    { id: '2', title: 'Tâche 2', description: 'En cours', status: 'doing' },
    { id: '3', title: 'Tâche 3', description: 'Terminé', status: 'done' }
  ])

  const moveTask = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ))
  }

  const completeTask = (taskId) => {
    moveTask(taskId, 'done')
  }

  return (
    <div style={{ display: 'flex', gap: 16, padding: 20 }}>
      {/* Colonne TODO */}
      <div style={{ flex: 1 }}>
        <TaskDropZone 
          title="À faire" 
          onDrop={(taskId) => moveTask(taskId, 'todo')}
          color="#3b82f6"
        />
        {tasks.filter(t => t.status === 'todo').map(task => (
          <DraggableTask key={task.id} task={task} onComplete={completeTask} />
        ))}
      </div>

      {/* Colonne DOING */}
      <div style={{ flex: 1 }}>
        <TaskDropZone 
          title="En cours" 
          onDrop={(taskId) => moveTask(taskId, 'doing')}
          color="#f59e0b"
        />
        {tasks.filter(t => t.status === 'doing').map(task => (
          <DraggableTask key={task.id} task={task} onComplete={completeTask} />
        ))}
      </div>

      {/* Colonne DONE */}
      <div style={{ flex: 1 }}>
        <TaskDropZone 
          title="Terminé" 
          onDrop={(taskId) => moveTask(taskId, 'done')}
          color="#22c55e"
        />
        {tasks.filter(t => t.status === 'done').map(task => (
          <DraggableTask key={task.id} task={task} onComplete={completeTask} />
        ))}
      </div>
    </div>
  )
}

// CSS à ajouter dans index.css pour l'animation pulse
/*
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
*/
