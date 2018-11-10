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
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import 'material-design-icons/iconfont/material-icons.css';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import './entry/executable/index.css';

const childProcess = require('child_process');
const path = require('path');

class ExecutableEntry {
  constructor({title, author, description, photos, src}) {
    this.title = title;
    this.author = author;

    this.Body = {
      oninit() {
        this.shown = 'photos';
      },

      show(toShow) {
        this.shown = toShow;
      },

      view() {
        return m('div',
          {style: {display: 'flex', flexDirection: 'column', height: '100%'}},
          m('h1', {style: {margin: '0 1ch'}}, title),
          m('p', {style: {color: '#999', margin: '1ch 1ch 1em 4ch'}}, author),
          m('button', {
            className: 'entry-executable-button',
            onclick() {
              childProcess.spawn(src, {cwd: path.dirname(src), detached: true})
                .on('error', (error) => alert(`${title}の起動に失敗しました。
${error}`));
            },
          }, 'このゲームを遊ぶ'),
          m('div', {style: {marginTop: '1em'}},
            m('button', {
              onclick: this.show.bind(this, 'description'),
              style: {
                background: this.shown == 'description' ? '#38b' : '#fff',
                border: '0',
                borderTop: '1px solid #eee',
                color: this.shown == 'description' ? '#fff' : '#000',
                fontSize: '1em',
                width: '16ch',
                height: '2em',
              },
            }, '説明'),
            m('button', {
              onclick: this.show.bind(this, 'photos'),
              style: {
                background: this.shown == 'photos' ? '#38b' : '#fff',
                border: '1px solid #eee',
                borderBottom: '0',
                color: this.shown == 'photos' ? '#fff' : '#000',
                fontSize: '1em',
                width: '20ch',
                height: '2em',
              },
            }, 'スクリーンショット')),
          {
            description: m('iframe', {
              src: description,
              style: {
                borderTop: '1px solid #38b',
                borderLeft: '0',
                borderRight: '0',
                borderBottom: '0',
                width: '100%',
                height: '100%',
              },
            }),
            photos: m('div', {
              style: {
                borderTop: '1px solid #38b',
                flex: '1',
                height: '100%',
                position: 'relative',
              },
            },
              m('div', {
                className: 'pswp',
                tabindex: '-1',
                oncreate: ({dom}) => {
                  this.photoSwipe = new PhotoSwipe(
                    dom,
                    PhotoSwipeUIDefault,
                    photos, {
                      modal: false,
                      closeOnScroll: false,
                      focus: false,
                    });

                  this.photoSwipe.init();
                },
                onremove: this.photoSwipe &&
                            this.photoSwipe.close.bind(this.photoSwipe),
              },
                m('div', {className: 'pswp__bg'}),
                m('div', {className: 'pswp__scroll-wrap'},
                  m('div', {className: 'pswp__container'},
                    m('div', {className: 'pswp__item'}),
                    m('div', {className: 'pswp__item'}),
                    m('div', {className: 'pswp__item'})),
                  m('div', {className: 'pswp__ui pswp__ui--hidden'},
                    m('div', {className: 'pswp__top-bar'},
                      m('div', {className: 'pswp__counter'}),
                      m('button', {
                        className: 'pswp__button pswp__button--share',
                        title: 'Share',
                      }),
                      m('button', {
                        className: 'pswp__button pswp__button--fs',
                        title: 'Toggle fullscreen',
                      }),
                      m('button', {
                        className: 'pswp__button pswp__button--zoom',
                        title: 'Zoom in/out',
                      }),
                      m('div', {className: 'pswp__preloader'},
                        m('div', {className: 'pswp__preloader__icn'},
                          m('div', {className: 'pswp__preloader_cut'},
                            m('div', {className: 'pswp__preloader__donut'}))))),
                    m('div', {
                      className: [
                        'pswp__share-modal',
                        'pswp__share-modal--hidden',
                        'pswp__single_tap',
                      ].join(' '),
                    }, m('div', {className: 'pswp__share-tooltip'})),
                    m('button', {
                      className: 'pswp_button pswp__button--arrow--left',
                      title: 'Previous (arrow left)',
                    }),
                    m('button', {
                      className: 'pswp_button pswp__button--arrow--right',
                      title: 'Next (arrow right)',
                    }),
                    m('div', {className: 'pswp__caption'},
                      m('div', {className: 'pswp__caption__center'})))))),
          }[this.shown]);
      },
    };
  }
};

ExecutableEntry.prototype.Controls = {
  view() {
    return m('p', {style: {display: 'flex', margin: '0'}},
      m('i', {className: 'material-icons', style: {marginRight: '0.1ch'}},
        'info_outline'),
      'ゲームを起動すると新しいウィンドウを開きます。');
  },
};

ExecutableEntry.prototype.Icon = {
  view() {
    return m('i', {className: 'material-icons', style: {color: '#f90'}},
             'open_in_new');
  },
};

export default ExecutableEntry;
