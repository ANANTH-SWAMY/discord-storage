import { useState } from "react"
import axios from "axios"

import { successToast, errorToast } from "../scripts/toasts"

function FileUploadModal({id, setFiles, setLoading}){
	const [file, setFile] = useState()

	const handleSubmit = async () => {
		setLoading(true)
		var formData = new FormData();
		var imagefile = document.querySelector('#file');
		formData.append("upload", file);
		const reponse = await axios.post('http://localhost:5000/upload', formData, {
			headers: {
			  'Content-Type': 'multipart/form-data'
			}
		})
		setLoading(false)
		if(reponse.data === "done"){
			const response = await axios.get("http://127.0.0.1:8090/api/collections/files/records")
			setFiles(response.data.items)
			successToast("Uploaded")
		}else{
			errorToast("Error uploading")
		}
	}

	return(
		<dialog id={id} className="modal">
			<div className="modal-box">
				<form method="dialog" className="flex flex-col items-center justify-center gap-8">
					<input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs outline-none" onChange={(e) => {setFile(e.target.files[0])}}/>
					<div className="flex gap-4">
						<button className="btn btn-error">Cancel</button>
						<button className="btn btn-primary" onClick={handleSubmit}>Upload</button>
					</div>
				</form>
			</div>
		</dialog>
	)
}

export default FileUploadModal
