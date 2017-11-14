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

import directory from '../directory';
import m from 'mithril';
import 'material-design-icons/iconfont/material-icons.css';
import './index.css';

export default {
  oninit() {
    this.directory = directory;
    this.entry = directory;
  },

  select(entry) {
    if (entry == this.entry) {
      if (entry.handleClickAfterSelection) {
        entry.handleClickAfterSelection();
      }
    } else {
      if (entry.entries) {
        this.parent = {
          directory: this.directory,
          parent: this.parent,
        };

        this.directory = entry;
      }

      if (entry.select) {
        entry.select();
      } else {
        this.entry = entry;
      }
    }
  },

  up() {
    this.directory = this.parent.directory;
    this.parent = this.parent.parent;
    this.entry = this.directory;
  },

  view() {
    return m('div',
      {style: {display: 'flex', flexDirection: 'column', height: '100%'}},
      m('div', {style: {display: 'flex', flex: '1'}},
        m('ul', {
          style: {
            background: '#f8f8f8',
            margin: '0',
            borderRight: '1px solid #eee',
            listStyleType: 'none',
            padding: '0',
            width: '32ch',
          },
        },
          this.parent && m('li',
            {className: 'component-li', onclick: this.up.bind(this)},
            m('i', {className: 'material-icons', style: {color: '#08c'}},
              'arrow_back'),
            m('div', {style: {paddingLeft: '1ch'}},
              '戻る')),
          this.directory.entries.map((entry) =>
            m('li', {
              className: 'component-li',
              onclick: this.select.bind(this, entry),
            },
              m(entry.Icon),
              m('div', {style: {paddingLeft: '1ch'}},
                m('div', entry.title),
                m('div', {className: 'component-li-author'}, entry.author))))),
        m('main', {style: {flex: '1'}}, m(this.entry.Body))),
      m('div', {style: {borderTop: '1px solid #eee'}}, m(this.entry.Controls)));
  },
};
