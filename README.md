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
