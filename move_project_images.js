const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const filesToMove = [
    'loanflow.png',
    'mcp.png',
    'gighub.png',
    'sahayak.png',
    'tasknext.png',
    'usl chatbot.png',
    'handsmen.png'
];

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

filesToMove.forEach(file => {
    try {
        if (fs.existsSync(file)) {
            const destPath = path.join(publicDir, file);
            // Move file (rename)
            fs.renameSync(file, destPath);
            console.log(`Moved: ${file}`);
        } else {
            console.log(`Not found: ${file}`);
        }
    } catch (e) {
        console.log(`Error moving ${file}:`, e.message);
    }
});
