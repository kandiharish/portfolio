const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const filesToMove = [
    'decentralised.png',
    'medbot.png'
];

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

filesToMove.forEach(file => {
    try {
        if (fs.existsSync(file)) {
            const destPath = path.join(publicDir, file);
            // Move file (or copy if safer, but user provided files so move is fine)
            fs.renameSync(file, destPath);
            console.log(`Moved: ${file}`);
        } else {
            console.log(`Not found: ${file}`);
        }
    } catch (e) {
        console.log(`Error moving ${file}:`, e.message);
    }
});
