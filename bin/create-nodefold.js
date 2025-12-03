#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
  console.log("\n🟢 Welcome to Nodefold Project Generator!\n");

  const projectName = (await ask("Project name: ")).trim();
  rl.close();

  if (!projectName) {
    console.error("❌ Project name is required.");
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.join(__dirname, "../template");

  if (fs.existsSync(targetDir)) {
    console.error("❌ Folder already exists.");
    process.exit(1);
  }

  fs.mkdirSync(targetDir);
  console.log(`\n📁 Creating project folder: ${projectName}`);

  // Copy template files
  function copyRecursive(src, dest) {
    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
      fs.mkdirSync(dest);
      for (const file of fs.readdirSync(src)) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        copyRecursive(srcPath, destPath);
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  copyRecursive(templateDir, targetDir);

  console.log("📦 Project scaffold created!");
  console.log(`
Next steps:

  cd ${projectName}
  npm install
  npm run start

✨ Happy coding!
`);
})();

