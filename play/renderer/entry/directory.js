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

import m from 'mithril';
import 'material-design-icons/iconfont/material-icons.css';

class DirectoryEntry {
  constructor({title, author, entries, background, icon, iconColor}) {
    this.title = title;
    this.author = author;
    this.entries = entries;

    this.Body = {
      view() {
        return m('div',
          {style: {display: 'flex', flexDirection: 'column', height: '100%'}},
          m('h1', {style: {margin: '0 1ch'}}, title),
          m('p', {style: {color: '#999', margin: '1ch 1ch 1em 4ch'}}, author),
          background && m('div', {
            style: {
              background: `url(${background}) no-repeat`,
              backgroundSize: 'contain',
              flex: '1',
            },
          }));
      },
    };

    this.Icon = {
      view() {
        return m('i', {className: 'material-icons', style: {color: iconColor}},
                 icon);
      },
    };
  }
};

DirectoryEntry.prototype.Controls = {
  view() {
    return m('p', {style: {display: 'flex', margin: '1ch'}},
      m('i', {className: 'material-icons', style: {marginRight: '0.1ch'}},
        'info_outline'),
      '項目を選択してください');
  },
};

export default DirectoryEntry;
