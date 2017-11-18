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
import Visualiser from './visualiser';
import 'material-design-icons/iconfont/material-icons.css';

export default class {
  constructor({title, author, src}) {
    this.title = title;
    this.author = author;

    this.Body = {
      view: () => {
        return m(Visualiser, {
          getCurrentTime: () => this._audio ? this._audio.currentTime : 0,

          onCanvasCreate: canvas => {
            const {audioAnalyserNode} = canvas;

            this._canvas = canvas;

            if (this._audio) {
              audioAnalyserNode.createMediaElementSource(dom)
                               .connect(audioAnalyserNode);

              if (!this._audio.paused) {
                canvas.start();
              }
            }
          },

          title,
          sub: author,
        });
      },
    };

    this.Controls = {
      view: ({attrs}) => {
        return m('div', {style: {display: 'flex'}},
          m('audio', {
            controls: true,
            src,
            style: {width: '100%'},
            oncreate: ({dom}) => {
              this._audio = dom;

              if (this._canvas) {
                const {audioAnalyserNode} = this._canvas;
                const {context} = audioAnalyserNode;

                context.createMediaElementSource(dom).connect(audioAnalyserNode);
              }

              this._audio.play();
            },
            onremove: () => {
              this._audio.pause();
              this._audio = null;
            },
            onplaying: () => {
              if (this._canvas) {
                this._canvas.stop();
                this._canvas.start();
              }
            },
            onpause: () => {
              if (this._canvas) {
                this._canvas.stop();
              }
            },
            onseeking: () => {
              if (this._canvas) {
                this._canvas.stop();
                this._canvas.initialize();
              }
            },
            onseeked: () => {
              if (this._canvas) {
                this._canvas.stop();
                this._canvas.start();
              }
            },
            onwaiting: () => {
              if (this._canvas) {
                this._canvas.stop();
              }
            },
          }),
          m('button', {
            className: 'material-icons',
            style: { background: '#fff', border: '0' },
            onclick: attrs.onfullscreentoggle,
          }, attrs.fullscreen ? 'fullscreen_exit' : 'fullscreen'));
      },
    };

    this.Icon = {
      view: () => {
        return m('i', {className: 'material-icons', style: {color: '#e26'}},
          this._audio ?
            (this._audio.paused ? 'pause' : 'play_arrow') :
            'music_note');
      },
    };
  }

  handleClickAfterSelection() {
    if (this._audio.paused) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }
};
