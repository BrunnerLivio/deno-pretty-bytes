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
}

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
    return `${prefix}${number} ${UNITS[0]}`;
  }

  const exponent = Math.min(
    Math.floor(Math.log10(number) / 3),
    UNITS.length - 1
  );

  number = Number((number / Math.pow(1000, exponent)).toPrecision(3));
  const unit = UNITS[exponent];

  return `${prefix}${number} ${unit}`;
}
