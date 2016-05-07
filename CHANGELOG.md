# Changelog
All notable changes to this theme will be documented in this file.

## 1.1.2

### Added
- Added table styles (thanks [@brian_warehime](https://twitter.com/brian_warehime))

### Fixed
- Layout issue when sidebar has minimal content (thanks [@brian_warehime](https://twitter.com/brian_warehime))

## 1.1.1

### Added
- Added jQuery v2.1.4 via CDN

### Fixed
- Dribbble shots, uses v1 of the api
- Disqus SSL fix. Protocol is now relative (thanks [@troyhunt](https://twitter.com/troyhunt))

## 1.1.0

### Added
- Mailchimp subscription form (thanks [@fisalcs](https://twitter.com/fisalcs))
- Ask.fm link and icon (thanks [@fisalcs](https://twitter.com/fisalcs))

## 1.0.8

### Added
- `{{navigation}}` support

### Fixed
- Google Fonts and SSL fix (thanks [@makingsauce](https://twitter.com/makingsauce))

## 1.0.7

### Fixed
- Revised meta

## 1.0.6

### Fixed
- Font rendering on pre elements

## 1.0.5

### Fixed
- Icons not appearing on some browsers

## 1.0.4

### Added
- CSS transitions to overlays
- Vimeo link and icon (thanks [@midhatmujkic](https://twitter.com/midhatmujkic))

### Fixed
- Missing styles from `blueprint`
- Disqus Comments Count rendering incorrectly
- Misc CSS tweaks

## 1.0.3

### Fixed
- `config.hbs` now uses `instagram.data.api.count` as per the API docs

## 1.0.2

### Fixed
- Horizontal scroll issue on iOS browsers
- `pre` elements render correctly
- `package.json` displays the correct version number
- `shares.hbs` spelling mistake, leading to pins not being pluralised

## 1.0.1

### Fixed
- `Share` now work regardless of the API, count is added if `apikey` exists
- Modules only create instances if element and config exist, otherwise they are hidden

## 1.0.0

### Added
- Initial release
