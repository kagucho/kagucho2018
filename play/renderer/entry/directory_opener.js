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

const electron = require('electron');

class DirectoryOpenerEntry {
  constructor({title, author, src}) {
    this.title = title;
    this.author = author;
    this._src = src;
  }

  select() {
    electron.shell.openItem(this._src);
  }
}

DirectoryOpenerEntry.prototype.Icon = {
  view() {
    return m('i', {className: 'material-icons'}, 'folder');
  },
};

export default DirectoryOpenerEntry;
