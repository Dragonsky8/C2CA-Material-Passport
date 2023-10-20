# C2CA Material Passport repository
## Introduction
C2CA Material Passport is a proof-of-concept application with the sole purpose to realize the idea of creating material passports for recycled products. This repository will contain the full-stack application to run the entire web application.

## Getting Started

### Step 1: Getting all the programs ready
In order to run the full-stack application, the following programs are required:
- Node.js
- Docker
- VS code
- GitKraken (if you don't want to use VS Code git)

Follow the installation documentation for further steps. However, the installation should be done with default settings. In other words, just leave all the checkboxes checked.

#### Note:
For Windows machine, there are additional steps required.
1. 

### Step 2: Setting up your local application
With your VS Code installed, you can now start importing this repository project onto your local machine.

1. Open VS Code and follow the steps, if you get a "first time use" popup.
2. At the left column, you see a toolbar. The 3rd icon says "Source control" when you hover above it. Click on this one.
3. On the left, you can select "Clone Repository".
4. Provide the Github URL of this project.
5. Select a folder in your file system to store this project. Common place to store this is in the /Documents folder
6. You should now get to see the complete project on your left side.
7. Open Docker on your Desktop

### Step 3: Using the terminal
Now that your project is loaded onto your local machine, it is time to setup a few scripts. This guide is written for MacOS and Linux.
1. Open a new Terminal
2. type 
```bash
npm install
# then
npm run build
# then
npm run start
``` 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## TODO list:
- Handle when a registered RFID chip gets linked to two products.
- Handle when registering new RawMaterials uses already-existing RFID chips
- Improve the data fields.
- Add audit trails as a nice markup
- Add audit table for other data tables
