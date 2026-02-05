const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const artifactDir = "C:\\Users\\kandi\\.gemini\\antigravity\\brain\\45d34363-ac7d-48c5-b74a-e41fe3efd9db";

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
    console.log('Created public directory');
}

// Move Resume
try {
    if (fs.existsSync('Harish Kandi Resume.pdf')) {
        fs.renameSync('Harish Kandi Resume.pdf', path.join(publicDir, 'resume.pdf'));
        console.log('Moved Resume');
    } else {
        console.log('Resume source not found in root');
    }
} catch (e) {
    console.log('Error moving resume:', e.message);
}

// Copy Picture
try {
    if (fs.existsSync('picture.png')) {
        fs.copyFileSync('picture.png', path.join(publicDir, 'picture.png'));
        console.log('Copied picture.png');
    }
} catch (e) {
    console.log('Error copying picture:', e.message);
}

// Copy Project Images
const projectImages = [
    { src: 'ai_teaching_assistant_dashboard_1769535817313.png', dest: 'project1.png' },
    { src: 'learning_path_generator_ui_1769535836492.png', dest: 'project2.png' },
    { src: 'blockchain_land_registry_app_1769535854931.png', dest: 'project3.png' },
    { src: 'medical_chatbot_interface_1769535873238.png', dest: 'project4.png' }
];

projectImages.forEach(img => {
    try {
        const srcPath = path.join(artifactDir, img.src);
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, path.join(publicDir, img.dest));
            console.log(`Copied ${img.dest}`);
        } else {
            console.log(`Source not found: ${img.src}`);
        }
    } catch (e) {
        console.log(`Error copying ${img.dest}:`, e.message);
    }
});

console.log('Asset move complete');
