const fs = require('fs');
const selection = require('../public/font-icon/selection.json');
let iconNameData = selection.icons.reduce(
  (pre, cur) => ({ ...pre, [cur.properties.name]: `${cur.properties.name}` }),
  {}
);
fs.writeFileSync('src/components/cubes/Icon/iconSet.json', JSON.stringify(iconNameData));
console.log('iconSet.json maked');
