function FileUploadModal({id}){
	return(
		<dialog id={id} className="modal">
			<div className="modal-box">
				<form encType="multipart/form-data" className="flex flex-col items-center justify-center gap-8">
					<input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
					<div className="flex gap-4">
						<button className="btn btn-error">Cancel</button>
						<input type="submit" className="btn btn-primary" value="Upload"/>
					</div>
				</form>
			</div>
		</dialog>
	)
}

export default FileUploadModal
