const BYTE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const BIT_UNITS = [
  'b',
  'kbit',
  'Mbit',
  'Gbit',
  'Tbit',
  'Pbit',
  'Ebit',
  'Zbit',
  'Ybit'
];

export interface PrettyBytesOptions {
  bits?: boolean;
  signed?: boolean;
  locale?: boolean | string;
}

/*
 * Formats the given number using `Number#toLocaleString`.
 * - If locale is a string, the value is expected to be a locale-key (for example: `de`).
 * - If locale is true, the system default locale is used for translation.
 * - If no value for locale is specified, the number is returned unmodified.
 */
const toLocaleString = (number: number, locale: string | boolean) => {
  let result = number.toString();
  if (typeof locale === 'string') {
    result = number.toLocaleString(locale);
  } else if (locale === true) {
    result = number.toLocaleString();
  }

  return result;
};

export function prettyBytes(number: number, options?: PrettyBytesOptions) {
  if (!Number.isFinite(number)) {
    throw new TypeError(
      `Expected a finite number, got ${typeof number}: ${number}`
    );
  }

  options = Object.assign({ bits: false }, options);
  const UNITS = options.bits ? BIT_UNITS : BYTE_UNITS;

  if (options.signed && number === 0) {
    return ' 0 ' + UNITS[0];
  }

  const isNegative = number < 0;
  const prefix = isNegative ? '-' : options.signed ? '+' : '';

  if (isNegative) {
    number = -number;
  }

  if (number < 1) {
    const numberString = toLocaleString(number, options.locale);
    return `${prefix}${numberString} ${UNITS[0]}`;
  }

  const exponent = Math.min(
    Math.floor(Math.log10(number) / 3),
    UNITS.length - 1
  );

  number = Number((number / Math.pow(1000, exponent)).toPrecision(3));
  const numberString = toLocaleString(number, options.locale);

  const unit = UNITS[exponent];

  return `${prefix}${numberString} ${unit}`;
}