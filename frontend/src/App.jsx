import Navbar from "./components/Navbar"
import FileSection from "./components/FileSection"

import {Toaster} from "react-hot-toast"
import axios from "axios"
import {useEffect, useState} from "react"

function App() {
	const [allFiles, setAllFiles] = useState([])

	useEffect(() => {
		const fetchFiles = async () => {
			const response = await axios.get("http://127.0.0.1:8090/api/collections/files/records")
			setAllFiles(response.data.items)
		}
		fetchFiles()
	},[])

	return(
		<div className="flex flex-col items-center justify-center gap-2">
			<Toaster/>
			<Navbar setFiles={setAllFiles}/>
			<FileSection files={allFiles} setFiles={setAllFiles}/>
		</div>
	)
}

export default App
