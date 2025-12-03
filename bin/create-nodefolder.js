#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const ask = (question) => {
    return new Promise(
        (resolve) => reader.question(question, resolve)
    );
}

// Read package.json (the one at the root of your CLI package)
const pkg = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../package.json"), "utf8")
);

function copyRecursive(src, dest) {
    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const file of fs.readdirSync(src)) {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            copyRecursive(srcPath, destPath);
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

(async () => {
    console.log('Welcome to nodefold: The Node Scaffolder');
    console.log(`\nVersion: ${pkg.version}`)

    const projectName = (await ask("Project Name: ")).trim();
    reader.close();

    if(!projectName){
        console.error("Project name is required.");
        process.exit(1);
    }
    
    const originalCwd = process.env.INIT_CWD || process.cwd();
    const targetDir = path.join(originalCwd, projectName);

    if (fs.existsSync(targetDir)){
        console.error(`Folder "${projectName}" already exists`);
        process.exit(1);
    }

    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`created directory: ${targetDir}`);

    const templateDir = path.join(__dirname, "../template");
    copyRecursive(templateDir, targetDir);

    console.log("📦 Template copied successfully!");
})();

