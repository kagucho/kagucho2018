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

import icon from '../icon.png';
import index from './index.html';

const electron = require('electron');
const path = require('path');
const url = require('url');

electron.app.on('ready', () => {
  const window = new electron.BrowserWindow(
    {icon: path.join(__dirname, icon), title: '神楽坂一丁目通信局 作品一覧'});

  window.loadURL(
    url.format(
      {pathname: path.join(__dirname, index), protocol: 'file:'}));
});

electron.app.on('window-on-closed', electron.app.quit.bind(electron.app));
