const fs = require("fs")
const path = require("path")
const express = require("express")
const multer = require("multer");
const axios = require("axios")
const http = require("http")
const cors = require("cors")
const { Client, Events, GatewayIntentBits } = require("discord.js");
require('dotenv').config()

// Helper functions
function randstr(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

if(!fs.existsSync("./uploads")){
	fs.mkdirSync("uploads")
}

// Discord
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
	restRequestTimeout: 120000,
})

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		return interaction.reply('Pong!');
	}
});

client.login(process.env.TOKEN);


// Express
const app = express()

app.use(cors())

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.get("/", (req, res) => {
	res.send("Server Running")
})

// test message
app.get("/send/:message", (req, res) => {
	client.channels.cache.get(process.env.CHANNEL_ID).send(req.params.message)
	res.send(req.params.message)
})

app.post("/upload", upload.single('upload'), async (req, res) => {
	const channel = await client.channels.cache.get(process.env.CHANNEL_ID)

	const randname = randstr(30)

	// const chunkSize = 26214400;
	const chunkSize = 10485760;
	const chunks = [];

	for (let i = 0; i < req.file.size; i += chunkSize) {
		const chunk = req.file.buffer.slice(i, i + chunkSize);
		chunks.push(chunk);
	}

	const files = []
	chunks.map((i,index) => {
		fs.writeFileSync(`./uploads/${randname}-${index}`, i)
		files.push(`./uploads/${randname}-${index}`)
	})

	const schema = new Object()
	const ids = {}

	let index = 0
	for(const i of files){
		const data = await channel.send({
			files: [i]
		})
		ids[index] = data.id
		index = index + 1
	}

	schema.ids = ids
	schema.fileName = req.file.originalname
	schema.randName = randname
	schema.noOfFiles = files.length

	await axios.post(`${process.env.POCKETBASE_LINK}/api/collections/files/records`,schema)

	res.status(200).send("done")
	files.map((i, index) => {
		fs.unlinkSync(i)
	})
})

app.get("/files", async (req, res) => {
	const response = await axios.get(`${process.env.POCKETBASE_LINK}/api/collections/files/records`)
	res.send(response.data)
})

app.get("/get_file", async (req, res) => {
	const channel = await client.channels.cache.get(process.env.CHANNEL_ID)
	const file = req.query.search
	const fileDetails = await axios.get(`${process.env.POCKETBASE_LINK}/api/collections/files/records`,{
		params: {
			filter: `randName = '${file}'`
		}
	})

	for(let i=0; i<fileDetails.data.items[0].noOfFiles; i++){
		const message = await channel.messages.fetch(fileDetails.data.items[0].ids[`${i}`])
		console.log(message.attachments)
		const attachmentUrl = message.attachments.entries().next().value[1].attachment
		try{
			const response = await axios.get(attachmentUrl, {responseType: "arraybuffer"})
			const fileData = Buffer.from(response.data, "binary")
			fs.appendFileSync(`./uploads/${fileDetails.data.items[0].fileName}`, fileData)
		}catch(err){
			console.log(err)
		}
	}

	res.sendFile(path.join(__dirname,"uploads",fileDetails.data.items[0].fileName),() => {
		fs.unlinkSync(`./uploads/${fileDetails.data.items[0].fileName}`)
	})
})

app.delete("/delete_file", async (req, res) => {
	const channel = await client.channels.cache.get(process.env.CHANNEL_ID)

	const file = req.query.randstr
	const fileDetails = await axios.get(`${process.env.POCKETBASE_LINK}/api/collections/files/records`,{
		params: {
			filter: `randName = '${file}'`
		}
	})
	const file_id = fileDetails.data.items[0].id

	const message_ids = fileDetails.data.items[0].ids

	for(let i=0; i<fileDetails.data.items[0].noOfFiles; i++){
		const message = await channel.messages.delete(message_ids[`${i}`])
	}

	const response = await axios.delete(`${process.env.POCKETBASE_LINK}/api/collections/files/records/${file_id}`)
	res.send("done")
})

app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})

