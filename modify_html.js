const fs = require('fs');
let html = fs.readFileSync('nolan.html', 'utf8');

const replacements = [
    { old: 'IMG_1780.PNG', f: 'The_Dark_Butt', alt: 'The Dark Butt' },
    { old: 'IMG_1788.PNG', f: 'Harvey_Two_Butt', alt: 'Harvey Two-Butt' },
    { old: 'IMG_1789.PNG', f: 'Butt_Bane', alt: 'Butt-Bane' },
    { old: 'IMG_1790.PNG', f: 'Doc_Butto', alt: 'Doc Butto' },
    { old: 'IMG_1791.PNG', f: 'The_Scare_Butt', alt: 'Scare Butt' },
    { old: 'IMG_1792.PNG', f: 'Ras_al_Butt', alt: 'Ra\\'s al Butt' },
    { old: 'IMG_1793.PNG', f: 'The_Butt_dler', alt: 'The Butt-dler' },
    { old: 'IMG_1794.PNG', f: 'Poison_Butt_vy', alt: 'Poison Butt-vy' },
    { old: 'IMG_1795.PNG', f: 'Mr_Freeze_Butt', alt: 'Mr Freeze Butt' }
];

replacements.forEach(r => {
    let regex = new RegExp('class=\"variant-img\"[^>]+' + r.old + '.*?alt=\"[^\"]+\"', 'gis');
    html = html.replace(regex, 'class=\"variant-img\" src=\"./assets/batman/' + r.f + '/1.png\" data-folder=\"' + r.f + '\" alt=\"' + r.alt + '\"');
});

fs.writeFileSync('nolan.html', html);
