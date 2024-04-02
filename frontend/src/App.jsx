import Navbar from "./components/Navbar"
import FileSection from "./components/FileSection"

function App() {
	return(
		<div className="flex flex-col items-center justify-center gap-2">
			<Navbar/>
			<FileSection/>
		</div>
	)
}

export default App
