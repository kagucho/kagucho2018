# kagucho2017

kagucho2017 is the template for the disc which will be distributed in Ridaisai,
the university festival of the Tokyo University Science.

## Development

### Requirements
* [Electron](https://electron.atom.io/) if you want to debug
* [GNU Make](https://www.gnu.org/software/make/)
* [GNU core utilities](https://www.gnu.org/software/coreutils/coreutils.html)
* [UnZip](http://www.info-zip.org/UnZip.html)
* mkisofs or an alternative
* [npm](https://www.npmjs.com/)
* [rsync](https://rsync.samba.org/)

### Preparation
You need to install dependencies. Run the following command in the root
directory of this project:

```
npm install
```

### Adding your blobs

Your blobs should be at `blob`.

#### `blob/kagucho2017`

Files in `blob/kagucho2017` will be copied to the disc.

`play` and `win32-x64` directory are reserved and therefore you should not
make files with same name in the directory.

`COPYRIGHT.TXT` and `ABSTRACT.TXT` will be used to describe copyright and
abstract.

#### `blob/directory.js`

`blob/directory.js` is a Node.js module which exports entries to be shown in
the player.

##### `__dirname`

`__dirname` is at `play` directory. Therefore the root of the disc will be `..`.

##### Modules

Besides Node.js modules, you can use following modules:

###### `../play/renderer/entry/audio/file`

This is a constructor of audio file entry. The first argument is an object with
following properties:

* `title` in string
* `author` in string (optional)
* `src` as absolute path to audio file in string

###### `../play/renderer/entry/audio/user_media`

This is a constructor of audio user media entry. The first argument is an object
with following properties:

* `title` in string
* `author` in string (optional)
* `constraints`

###### `../play/renderer/entry/executable`

This is a constructor of game entry implemented as executable. The first
argument is an object with following properties:

* `title` in string
* `author` in string (optional)
* `description` as absolute path to HTML file in string
* `photos` as items [PhotoSwipe](http://photoswipe.com) accepts
* `src` as absolute path to executable file in string

###### `../../play/renderer/entry/directory`

This is a constructor of directory entry. The first argument is an object with
following properties:

* `title` in string
* `author` in string (optional)
* `background` as absolute path to image file in string
* `entries` as an array of entries
* `icon` as textual name of an icon in [Material icons](https://material.io/icons/) in string
* `iconColor` as CSS color in string

###### `../play/renderer/entry/directory_opener`

This is a constructor of directory opener entry. The first argument is an object
with following properties:

* `title` in string
* `author` in string (optional)
* `src` as absolute path to directory in string

###### `../play/renderer/entry/html`

This is a constructor of HTML entry. The first argument is an object with
following properties:

* `title` in string
* `author` in string (optional)
* `description` in string
* `src` as absolute path to HTML file in string

###### File modules

You can get valid paths by prefixing with `renderer/`.

* `../play/renderer/license/agpl-3.0.html`
* `../play/renderer/license/electron.html`
* '../play/renderer/license/apache-2.0.html'
* '../play/renderer/license/mithril.html'
* '../play/renderer/license/photoswipe.html'
* '../play/renderer/license/webpack.html'
* '../play/icon.png'

### Building

After running the preparation task, just run:

```
make
```

And you'll have the result at `output/kagucho2017.iso`.

### Debugging

_After building_, run the following command to watch the latest changes of
scripts. Other changes such as musics or games to be embedded will _not_ be
updated. If you want to update them, run `make` again.

```
make watch
```

While running `make watch`, you can execute the player with:

```
npm start
```

Enjoy.

## Other Makefile targets

### distclean
Removes everything not included in the code distribution.

### clean
Removes output except the downloaded Electron.

### lint
Lints.

## License
This software is licensed under Affero General Public License, version 3.0.
See `play/renderer/license/agpl-3.0.html` for details.
