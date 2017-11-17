# Copyright (C) 2017 Kagucho <kagucho.net@gmail.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

# output/kagucho2017.iso: target-kagucho2017 target-play output/kagucho2017/win32-x64
# 	mkisofs -J -V KAGUCHO2017 -copyright COPYRIGHT.TXT -abstract ABSTRACT.TXT -o $@ -udf output/kagucho2017
output/kagucho2017.zip: target-kagucho2017 target-play output/kagucho2017/win32-x64
	zip -r output/kagucho2017.zip output/kagucho2017

clean:
	rm -rf output/kagucho2017 output/kagucho2017.iso

distclean:
	rm -rf output

lint: lint-electron lint-node

lint-electron: ./node_modules/.bin/eslint electron.eslintrc.json electron.eslintignore
	./node_modules/.bin/eslint -c electron.eslintrc.json --ignore-path electron.eslintignore .

lint-node: ./node_modules/.bin/eslint node.eslintrc.json node.eslintignore
	./node_modules/.bin/eslint -c node.eslintrc.json --ignore-path node.eslintignore .

watch:
	cd play/main && $(abspath ./node_modules/.bin/webpack) --watch & cd play/renderer && $(abspath ./node_modules/.bin/webpack) --watch

target-kagucho2017: kagucho2017
	mkdir -p output
	rsync -r $< output

target-play: target-play-main target-play-renderer

target-play-main: ./node_modules/.bin/webpack play/main
	cd play/main && $(abspath ./node_modules/.bin/webpack)

target-play-renderer: ./node_modules/.bin/webpack play/renderer
	cd play/renderer && $(abspath node_modules/.bin/webpack)

output/kagucho2017/win32-x64: output/intermediate/electron-v1.6.15-win32-x64.zip app.json
	mkdir -p $@/resources/app
	unzip -d $@ output/intermediate/electron-v1.6.15-win32-x64.zip
	cp app.json $@/resources/app/package.json

output/intermediate/electron-v1.6.15-win32-x64.zip:
	mkdir -p $(dir $@)
	wget -O $@ https://github.com/electron/electron/releases/download/v1.6.15/electron-v1.6.15-win32-x64.zip

.PHONY: clean distclean lint lint-electron lint-node target-kagucho2017	\
	target-play target-play-main target-play-renderer watch
