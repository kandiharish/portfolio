const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const filesToMove = [
    'codeclash cert.pdf',
    'cdacqbit.jpg',
    'Hack2skill-Certificate.png',
    'Harish Kandi Oracle Certificate.pdf',
    'nationbuilding.pdf',
    'kaggle python coder.jpg',
    'salesforce internship cert.png',
    'yhills internship cert.jpg'
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
