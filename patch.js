const fs = require('fs');
let html = fs.readFileSync('nolan.html', 'utf8');

const replacements = [
    { old: 'IMG_1780', f: 'The_Dark_Butt', alt: 'The Dark Butt' },
    { old: 'IMG_1788', f: 'Harvey_Two_Butt', alt: 'Harvey Two-Butt' },
    { old: 'IMG_1789', f: 'Butt_Bane', alt: 'Butt-Bane' },
    { old: 'IMG_1790', f: 'Doc_Butto', alt: 'Doc Butto' },
    { old: 'IMG_1791', f: 'The_Scare_Butt', alt: 'Scare Butt' },
    {
        old: 'IMG_1792', f: 'Ras_al_Butt', alt: 'Ra\\'s al Butt' },
    { old: 'IMG_1793', f: 'The_Butt_dler', alt: 'The Butt-dler' },
    { old: 'IMG_1794', f: 'Poison_Butt_vy', alt: 'Poison Butt-vy' },
    { old: 'IMG_1795', f: 'Mr_Freeze_Butt', alt: 'Mr Freeze Butt' }
];

replacements.forEach(r => {
    let altMatch = r.alt.replace(/\'/g, "\\'");
    let regex = new RegExp('<img class="variant-img" src="\\.\\/assets\\/batman\\/' + r.old + '\\.PNG"[\\s\\S]*?alt="' + altMatch + '">', 'gi');
    html = html.replace(regex, '<img class="variant-img" src="./assets/batman/' + r.f + '/1.png" data-folder="' + r.f + '" alt="' + r.alt + '">');
});

fs.writeFileSync('nolan.html', html);
