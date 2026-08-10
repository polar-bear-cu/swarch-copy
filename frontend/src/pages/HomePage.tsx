import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "@/assets/vite.svg";
import heroImg from "@/assets/hero.png";

export default function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section>
        <div>
          <img src={heroImg} width="170" height="179" alt="" />
          <img src={reactLogo} alt="React logo" />
          <img src={viteLogo} alt="Vite logo" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-red-400">Get started</h1>
          <p>
            Edit <code>src/pages/HomePage.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </section>
    </>
  );
}
