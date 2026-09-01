import { useRef, useState } from 'react'

type Finger = {
  id: number
  x: number
  y: number
}

function App() {
  const [fingers, setFingers] = useState<Finger[]>([])
  const activeFingers = useRef(new Map<number, Finger>())

  const updateFingers = () => {
    setFingers(Array.from(activeFingers.current.values()))
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (activeFingers.current.size >= 2) return

    const finger: Finger = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    }

    activeFingers.current.set(event.pointerId, finger)
    updateFingers()
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const finger = activeFingers.current.get(event.pointerId)

    if (!finger) return

    finger.x = event.clientX
    finger.y = event.clientY

    updateFingers()
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    activeFingers.current.delete(event.pointerId)
    updateFingers()
  }

  const handlePointerCancel = (event: React.PointerEvent<HTMLElement>) => {
    activeFingers.current.delete(event.pointerId)
    updateFingers()
  }

  return (
    <main
      className="min-h-dvh bg-slate-950 text-white flex flex-col items-center justify-center px-6 select-none"
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div className="text-center">
        <p className="text-sm font-medium tracking-[0.3em] uppercase text-slate-400">
          A little help deciding
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-tight">
          Choose Who
        </h1>

        <p className="mt-4 text-base text-slate-400">
          Who gets to choose?
        </p>
      </div>

      <div className="mt-16 w-full max-w-sm text-center">
        <p className="text-2xl font-bold">
          {fingers.length} {fingers.length === 1 ? 'finger' : 'fingers'}
        </p>

        <p className="mt-2 text-sm text-slate-400">
          {fingers.length === 0
            ? 'Put your fingers on the screen'
            : fingers.length === 1
              ? 'Waiting for another player...'
              : 'Both players detected!'}
        </p>

        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
          {fingers.map((finger) => (
            <div
              key={finger.id}
              className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg"
              style={{
                left: finger.x,
                top: finger.y,
              }}
            >
              👆
            </div>
          ))}
        </div>
      </div>

      <p className="absolute bottom-6 text-xs text-slate-600">
        Two fingers. One choice.
      </p>
    </main>
  )
}

export default App
