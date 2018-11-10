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
import MusicvideoGenerator from 'musicvideo-generator/lib/index_browser';
import 'material-design-icons/iconfont/material-icons.css';

export default class {
  constructor({title, author, src}) {
    this.title = title;
    this.author = author;

    this.Body = {
      view: () => {
        return m('div', {
          style: {height: '100%', width: '100%'},

          oncreate: ({dom}) => {
            const context = new AudioContext;

            this._canvas = new MusicvideoGenerator.Canvas(context, {
              backgroundColor: 0,
              image: null,
              resolution: {width: 1280, height: 720},
              spectrum: {color: 0xffffff, mode: 1},
              text: {color: 0xffffff, title, sub: author},
            }, null, () => this._audio ? this._audio.currentTime : 0);

            this._canvas.audioAnalyserNode.connect(context.destination);
            this._canvas.initialize();

            if (this._audio) {
              context.createMediaElementSource(dom)
                     .connect(this._canvas.audioAnalyserNode);

              if (!this._audio.paused) {
                this._canvas.start();
              }
            }

            const {view} = this._canvas.getRenderer();

            this._listenResizeEvent = () => {
              console.log('resize');
              view.style.width = dom.offsetWidth + 'px';
              view.style.height = dom.offsetHeight + 'px';
            };

            addEventListener('resize', this._listenResizeEvent);

            view.style.objectFit = 'contain';
            view.style.position = 'absolute';
            view.style.width = dom.offsetWidth + 'px';
            view.style.height = dom.offsetHeight + 'px';
            view.style.zIndex = '-1';
            dom.appendChild(view);
          },

          onremove: () => {
            this._canvas.stop();
            this._canvas.destroy();
            this._canvas = null;

            removeEventListener('resize', this._listenResizeEvent);
          },
        });
      },
    };

    this.Controls = {
      view: () => {
        return m('audio', {
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
        });
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
