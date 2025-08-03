import Navbar from "./components/Navbar"
import Manager from "./components/Manager"
import Footer from "./components/Footer"

function App() {

  return (
    <>
 
      <Navbar />
      <div className="min-h-[87vh]">  {/* to keep the footer at bottom*/}
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
