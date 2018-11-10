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
import './component/index.css';

export default {
  oninit(node) {
    this.directory = directory;
    this.entry = directory;

    this.listenFullscreenchange = () => {
      this.fullscreen = node.dom &&
                          document.webkitFullscreenElement == node.dom;

      m.redraw();
    };
  },

  oncreate() {
    document.addEventListener('webkitfullscreenchange',
                              this.listenFullscreenchange);
  },

  onbeforeremove() {
    document.removeEventListener('webkitfullscreenchange',
                                 this.listenFullscreenchange);
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

  toggleFullscreen({dom}) {
    if (this.fullscreen) {
      document.webkitExitFullscreen();
    } else {
      dom.webkitRequestFullscreen();
    }
  },

  up() {
    this.directory = this.parent.directory;
    this.parent = this.parent.parent;
    this.entry = this.directory;
  },

  view(node) {
    const entryAttrs = {
      fullscreen: this.fullscreen,
      onfullscreentoggle: this.toggleFullscreen.bind(this, node),
    };

    return m('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      },
    },
      m('div', {style: {display: 'flex', flex: '1'}},
        this.fullscreen ? null : m('ul', {
          style: {
            background: '#f8f8f8',
            borderRight: '1px solid #eee',
            listStyleType: 'none',
            margin: '0',
            overflowY: 'scroll',
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
        m('main', {
          onmousemove: () => {
            if (this.fullscreen) {
              this.controls.style.transition = '';
              this.controls.style.maxHeight = '32px';

              this.controls.offsetHeight; // triggers reflow

              this.controls.style.transition = 'max-height 1s 4s';
              this.controls.style.maxHeight = '0';
            }
          },
          style: {flex: '1'},
        }, m(this.entry.Body, entryAttrs))),
      m('div', {
        style: this.fullscreen ? {
          borderTop: '0',
          maxHeight: '0',
          transition: 'max-height 1s 4s',
        } : {
          borderTop: '1px solid #eee',
          maxHeight: '32px',
        },
        oncreate: ({dom}) => this.controls = dom,
      }, m(this.entry.Controls, entryAttrs)));
  },
};
