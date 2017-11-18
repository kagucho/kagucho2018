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

import MusicvideoGenerator from 'musicvideo-generator/lib/index_browser';
import m from 'mithril';
import preset from './preset';

export default {
  generateParams() {
    return Object.assign({
      backgroundColor: 0,
      image: null,
      resolution: {width: 1280, height: 720},
      spectrum: {color: 0xffffff, mode: 1},
      text: {color: 0xffffff, title: this.title, sub: this.sub},
    }, preset[Math.floor(Math.random() * preset.length)]);
  },

  oninit({attrs}) {
    this.title = attrs.title;
    this.sub = attrs.sub;
  },

  onupdate({attrs}) {
    if (attrs.title != this.title || attrs.sub != this.sub) {
      this.title = attrs.title;
      this.sub = attrs.sub;

      this.canvas.changeParams(this.generateParams());
    }
  },

  view({attrs}) {
    return m('div', {
      style: {cursor: 'pointer', height: '100%', width: '100%'},

      onclick: () => {
        this.canvas.changeParams(this.generateParams());
      },

      oncreate: ({dom}) => {
        const context = new AudioContext;

        this.canvas = new MusicvideoGenerator.Canvas(
          context,
          this.generateParams(),
          null,
          () => attrs.getCurrentTime(this.canvas));

        this.canvas.audioAnalyserNode.connect(context.destination);
        this.canvas.initialize();

        const {view} = this.canvas.getRenderer();

        view.style =
          'background: #000; object-fit: contain; width: 100%; height: 100%';

        dom.appendChild(view);

        attrs.onCanvasCreate(this.canvas);
      },

      onremove: () => {
        this.canvas.stop();
        this.canvas.audioAnalyserNode.context.close();
        this.canvas.destroy();
        this.canvas = null;
      },
    });
  },
};
