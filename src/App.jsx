import './App.css' 
import Projects from './components/Projects/Projects'

function App() {
  return (
    <>
      <h1>Projects</h1>
      <div className="react">
        <h3>(powered by React )</h3>
        <svg width="4%" height="4%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="uwu-hidden mt-4 mb-3 text-brand dark:text-brand-dark w-24 lg:w-28 self-center text-sm me-0 flex origin-center transition-all ease-in-out"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" stroke-width="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
      </div>
        <p className="mob"><b>NOTE: View on mobile device too</b></p>
      <div className="main">
        <Projects />
      </div>
    </>
  )
}

export default App
