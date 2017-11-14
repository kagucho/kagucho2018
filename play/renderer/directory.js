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

import AudioEntry from './entry/audio';
import ExecutableEntry from './entry/executable';
import DirectoryEntry from './entry/directory';
import DirectoryOpenerEntry from './entry/directory_opener';
import HtmlEntry from './entry/html';
import agpl3 from './license/agpl-3.0.html';
import electronLicense from './license/electron.html';
import apache2 from './license/apache-2.0.html';
import mithrilLicense from './license/mithril.html';
import photoSwipeLicense from './license/photoswipe.html';
import webpackLicense from './license/webpack.html';
import icon from '../icon.png';

const path = require('path');

export default new DirectoryEntry({
  title: '作品一覧',
  author: '神楽坂一丁目通信局',
  background: icon,
  entries: [
    new DirectoryEntry({
      title: '音楽',
      author: 'DTM部',
      entries: [
        new DirectoryOpenerEntry({
          title: 'フォルダを開く',
          src: path.join(__dirname, '../musics'),
        }),
        new AudioEntry({
          title: 'Ain\'t we got fun?',
          author: 'Billy Jones',
          src: path.join(__dirname,
                         '../musics/aint_we_got_fun_billy_jones1921.mp3'),
        }),
      ],
      icon: 'library_music',
      iconColor: '#e26',
    }),
    new DirectoryEntry({
      title: 'ゲーム',
      author: 'Prog部',
      entries: [
        new ExecutableEntry({
          title: '電卓',
          author: 'Microsoft',
          description: '攻撃デモでよく見るアレ',
          photos: [
            {
              src: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
              w: 561,
              h: 400,
            },
          ],
          src: 'calc',
        }),
      ],
      icon: 'library_books',
      iconColor: '#f90',
    }),
    new DirectoryEntry({
      title: 'ランチャーのライセンス',
      author: 'ランチャーとそれに含まれるサードパーティのソフトウェア',
      entries: [
        new HtmlEntry({
          title: 'ランチャー本体のライセンス',
          author: '神楽坂一丁目通信局',
          description: 'GNU Affero General Public License, version 3',
          src: path.join('renderer', agpl3),
        }),
        new HtmlEntry({
          title: 'Electron',
          author: 'GitHub, Inc.',
          description: 'MIT License',
          src: path.join('renderer', electronLicense),
        }),
        new HtmlEntry({
          title: 'Material design icons',
          author: 'Google, Inc.',
          description: 'Apache License, version 2.0',
          src: path.join('renderer', apache2),
        }),
        new HtmlEntry({
          title: 'PhotoSwipe',
          author: 'Dmitry Semenov',
          description: 'MIT License',
          src: path.join('renderer', photoSwipeLicense),
        }),
        new HtmlEntry({
          title: 'mithril.js',
          author: 'Leo Horie',
          description: 'MIT License',
          src: path.join('renderer', mithrilLicense),
        }),
        new HtmlEntry({
          title: 'musicvideo-generator',
          author: 'pixiv, Inc.',
          description: 'GNU Affero General Public License, version 3',
          src: path.join('renderer', agpl3),
        }),
        new HtmlEntry({
          title: 'webpack',
          author: 'JS Foundation and other contributors',
          description: 'MIT License',
          src: path.join('renderer', webpackLicense),
        }),
      ],
    }),
  ],
  icon: 'library_books',
  iconColor: '#29e',
});
