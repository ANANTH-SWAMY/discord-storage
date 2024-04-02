function Card(){
	return(
		<div className="card w-96 bg-base-300 shadow-xl">
			<div className="card-body">
				<h2 className="card-title">Title</h2>
				<div className="card-actions justify-end">
					<button className="btn btn-primary btn-square"><svg className="h-5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"> <g id="DOWNLOAD_1_" enable-background="new    "> <g id="DOWNLOAD"> <g> <path d="M20.77,29.007l9,10l0,0C30.319,39.616,31.115,40,32,40s1.68-0.384,2.23-0.993l0,0l9-10l0,0&#10;&#9;&#9;&#9;&#9;C43.708,28.475,44,27.772,44,27c0-1.657-1.343-3-3-3c-0.885,0-1.682,0.383-2.23,0.993l0,0L35,29.182V11c0-1.657-1.343-3-3-3&#10;&#9;&#9;&#9;&#9;s-3,1.343-3,3v18.182l-3.77-4.189l0,0C24.681,24.384,23.885,24,23,24c-1.657,0-3,1.343-3,3C20,27.772,20.292,28.475,20.77,29.007&#10;&#9;&#9;&#9;&#9;L20.77,29.007z M55,35c-1.657,0-3,1.343-3,3v12H12V38c0-1.657-1.343-3-3-3s-3,1.343-3,3v15c0,1.657,1.343,3,3,3h22.997&#10;&#9;&#9;&#9;&#9;c0.001,0,0.002,0,0.003,0s0.002,0,0.003,0H55c1.657,0,3-1.343,3-3V38C58,36.343,56.657,35,55,35z"/> </g> </g> </g> </svg></button>
				</div>
			</div>
		</div>
	)
}

export default Card
