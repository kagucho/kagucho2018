/*
  Copyright (C) 2017 Kagucho <kagucho.net@gmail.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import image0 from './IMG_20170531_115202.jpg';
import image1 from './IMG_20170531_133446.jpg';
import image2 from './IMG_20170624_152953.jpg';
import image3 from './IMG_20170702_131522.jpg';
import image4 from './logo250c.png';

const path = require('path');
const presets = [];

[
  {image: image0, color: 0xb1c2da},
  {image: image1, color: 0xfffdc1},
  {image: image2, color: 0xe6e4de},
  {image: image3, color: 0xe3ff96},
  {image: image4, color: 0xffffff},
].forEach(({image, color }) => {
  const imagePath = path.join('renderer', image);

  for (const mode of [0, 1, 3]) {
    presets.push({image: imagePath, spectrum: { color, mode }});
  }
});

export default presets;
