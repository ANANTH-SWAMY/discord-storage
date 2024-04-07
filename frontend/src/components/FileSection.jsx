import Card from "./Card"

function FileSection({files, setFiles}){
	return(
		<div className="flex items-center justify-center flex-wrap gap-8 w-full grow">
			{files.length!=0 && files.map((i, index) => {
				return(
					<Card fileName={i.fileName} randName={i.randName} setFiles={setFiles} key={index}/>
				)
			})}

			{files.length==0 && <div className="text-4xl">No Files Found</div>}
		</div>
	)
}

export default FileSection
