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

import Visualiser from './visualiser';
import m from 'mithril';

export default class {
  constructor({ title, author }) {
    this.title = title;
    this.author = author;

    this.Body = {
      view() {
        return m(Visualiser, {
          getCurrentTime(canvas) {
            return canvas.audioAnalyserNode.context.currentTime;
          },

          onCanvasCreate(canvas) {
            navigator.mediaDevices.getUserMedia({
              audio: {mandatory: {chromeMediaSource: 'desktop'}},
              video: {mandatory: { chromeMediaSource: 'desktop'}},
            }).then(stream => {
              const {audioAnalyserNode} = canvas;

              audioAnalyserNode.context
                               .createMediaStreamSource(stream)
                               .connect(audioAnalyserNode);

              canvas.start();
            }).catch(error => alert(`音声の取得に失敗しました。
${error}`));
          },
        });
      },
    };

    this.Controls = {
      view({attrs}) {
        return m('div', {display: 'flex'},
          m('p', {style: {display: 'flex', margin: '0'}},
            m('i', {className: 'material-icons', style: {marginRight: '0.1ch'}},
              'info_outline'),
           'デスクトップ上に流れている音声を可視化します。'),
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
          'music_note');
      },
    };
  }
};
