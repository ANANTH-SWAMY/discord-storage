# Discord Storage
A webapp that allows you to use discord as cloud storage

> [!CAUTION]
> Use At Your Own Risk: Using Discord for storage is against the platform's TOS. This is made purely for educational purposes.

![discord storage](./preview/webapp.png)

## Instructions
1. Create a new application at https://discord.com/developers
2. Enable all intents under the bot section.
3. Add the bot to a server with adminstrator perms.
4. Clone this repo.
5. Run `./pocketbase serve` in the `pocketbase` directory, navigate to http://127.0.0.1/_/ and login. (Download the executable from https://pocketbase.io/docs/ into the pocketbase directory)
6. Rename the `.env.template` file in the `backend` directory to `.env` and fill all the fields in the file.
7. Run `npm i` in both `frontend` and `backend` directories.
8. Run `node commands.js` in the `backend` directory.
9. Run `npm start` in the `backend` directory.
10. Run `npm run dev` in the `frontend` directory.
11. Navigate to http://localhost:5173 on your browser.
