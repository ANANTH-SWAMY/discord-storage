import Card from "./Card"

function FileSection({files, setFiles}){
	return(
		<div className="flex items-center justify-center flex-wrap gap-8 w-full grow">
			{files.map((i, index) => {
				return(
					<Card fileName={i.fileName} randName={i.randName} setFiles={setFiles} key={index}/>
				)
			})}
		</div>
	)
}

export default FileSection
