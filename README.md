# Discord Storage
A webapp that allows you to use discord as cloud storage

### Use At Your Own Risk: Using discord for storage is against the platform's TOS. This is made purely for educational purposes.

![discord storage](./preview/webapp.png)

## Instructions
1. Create a new application at https://discord.com/developers
2. Enable all intents under the bot section.
3. Add the bot to a server with adminstrator perms.
4. Download and extract pocketbase from https://pocketbase.io/ to your working directory.
5. Run pocketbase with `./pocketbase serve`.
6. Clone this repo.
7. Rename the `.env.template` file in the `backend` directory to `.env` and fill all the fields in the file.
8. Run `npm i` in both `frontend` and `backend` directories.
9. Run `node commands.js` in the `backend` directory.
10. Run `npm start` in the `backend` directory.
11. Run `npm run dev` in the `frontend` directory.
12. Navigate to http://localhost:5173 on your browser.
