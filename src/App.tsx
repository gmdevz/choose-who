import { useState } from "react";

function App() {
  const [isTouching, setIsTouching] = useState(false);

  const [position, setPosition] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  const handlePointerDown = (event) => {
    setIsTouching(true);
    setPosition({ x: event.clientX, y: event.clientY });
    console.log(event.clientX, event.clientY);
  };

  const handlePointerUp = () => {
    setIsTouching(false);
  };

  return (
    <main
      className="relative min-h-dvh bg-slate-950 text-white flex flex-col items-center justify-center "
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {!isTouching && <h1 className="text-5xl font-bold">Choose Who</h1>}
      {isTouching && (
        <div
          className="absolute w-32 h-32 bg-pink-500 rounded-full "
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`,
            transform: "translate(-50%,-50%)",
          }}
        ></div>
      )}
    </main>
  );
}

export default App;
