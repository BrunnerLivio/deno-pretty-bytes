# 🦕 pretty-bytes

> The Deno implementation of **[sindresorhus/pretty-bytes](https://raw.githubusercontent.com/sindresorhus/pretty-bytes).**
> Convert bytes to a human readable string: `1337` → `1.34 kB`

Useful for displaying file sizes for humans.

*Note that it uses base-10 (e.g. kilobyte).
[Read about the difference between kilobyte and kibibyte.](https://web.archive.org/web/20150324153922/https://pacoup.com/2009/05/26/kb-kb-kib-whats-up-with-that/)*

## Usage

```js
import { prettyBytes } from "https://raw.githubusercontent.com/brunnerlivio/deno-pretty-bytes/master/mod.ts"

prettyBytes(1337);
//=> '1.34 kB'

prettyBytes(100);
//=> '100 B'

// Display with units of bits
prettyBytes(1337, {bits: true});
//=> '1.34 kbit'

// Display file size differences
prettyBytes(42, {signed: true});
//=> '+42 B'

// Localized output using German locale
prettyBytes(1337, {locale: 'de'});
//=> '1,34 kB'
```


## API

### prettyBytes(number, options?)

#### number

Type: `number`

The number to format.

#### options

Type: `object`

##### signed

Type: `boolean`\
Default: `false`

Include plus sign for positive numbers. If the difference is exactly zero a space character will be prepended instead for better alignment.

##### bits

Type: `boolean`\
Default: `false`

Format the number as [bits](https://en.wikipedia.org/wiki/Bit) instead of [bytes](https://en.wikipedia.org/wiki/Byte). This can be useful when, for example, referring to [bit rate](https://en.wikipedia.org/wiki/Bit_rate).

## Related

- [sindresorhus/pretty-bytes](https://github.com/sindresorhus/pretty-bytes) - The original NodeJS implementation of pretty-bytes