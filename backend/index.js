const fs = require("fs")
const path = require("path")
const express = require("express")
const multer = require('multer');
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

// Discord
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
	restRequestTimeout: 60000,
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

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, './uploads')
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, file.originalname)
// 	}
// })

// const upload = multer({ storage: storage })

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

app.get("/send_file", (req, res) => {
	res.sendFile(path.join(__dirname, "/send_file.html"))
})

app.post("/upload", upload.single('upload'), async (req, res) => {
	const channel = client.channels.cache.get(process.env.CHANNEL_ID)

	const randname = randstr(30)

	const chunkSize = 26214400;
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

	console.log(files)

	const schema = new Object()
	const ids = {}

	await Promise.all(files.map(async (i, index) => {
		const data = await channel.send({
			files: [i]
		})
		console.log(data.id)
		ids[Number(index)] = data.id
	}))

	schema.ids = ids
	schema.fileName = req.file.originalname
	schema.randName = randname
	schema.noOfFiles = files.length
	console.log(schema)

	res.send("done")
})

app.listen(process.env.PORT, () => {
	console.log(`Server running on http://localhost:${process.env.PORT}`)
})

