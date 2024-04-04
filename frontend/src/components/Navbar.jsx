import {useState} from "react"
import FileUploadModal from "./FileUploadModal"

function Navbar({setFiles}){
	const [loading, setLoading] = useState(false)

	return(
		<>
			<FileUploadModal id="upload" setFiles={setFiles} setLoading={setLoading}/>
			<div className="navbar bg-base-300">
				<div className="flex-1">
					<a className="btn btn-ghost text-xl">Discord Storage</a>
				</div>
				<div className="flex-none">
					<button className="btn btn-primary btn-square" onClick={() => {
						if(!loading){
							document.getElementById("upload").showModal()
						}
					}}>
						{!loading && <svg className="h-5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve"> <g id="UPLOAD_1_" enableBackground="new    "> <g id="UPLOAD"> <g> <path d="M23,24c0.885,0,1.681-0.384,2.23-0.993l0,0L29,18.818V37c0,1.657,1.343,3,3,3s3-1.343,3-3l0,0V18.818l3.77,4.189l0,0&#10;&#9;&#9;&#9;&#9;C39.318,23.617,40.115,24,41,24c1.657,0,3-1.343,3-3c0-0.772-0.292-1.475-0.77-2.007l0,0l-9-10l0,0C33.682,8.384,32.885,8,32,8&#10;&#9;&#9;&#9;&#9;s-1.681,0.384-2.23,0.993l0,0l-9,10l0,0C20.292,19.525,20,20.228,20,21C20,22.657,21.343,24,23,24z M55,35c-1.657,0-3,1.343-3,3&#10;&#9;&#9;&#9;&#9;v12H12V38c0-1.657-1.343-3-3-3s-3,1.343-3,3v15c0,1.657,1.343,3,3,3h46c1.657,0,3-1.343,3-3V38C58,36.343,56.657,35,55,35z"/> </g> </g> </g> </svg>}
						{loading && <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve"> <path fill="#000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"> <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite" /> </path> </svg>}
					</button>
				</div>
			</div>
		</>
	)
}

export default Navbar
