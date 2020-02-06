import { test, assertThrows, assertEquals } from './deps.ts';
import { prettyBytes } from '../prettyBytes.ts';

test({
  name: 'throws on invalid input',
  fn: (): void => {
    assertThrows(() => prettyBytes(NaN), TypeError);
    assertThrows(() => prettyBytes(Infinity), TypeError);
    assertThrows(() => prettyBytes(-Infinity), TypeError);
    assertThrows(() => prettyBytes(null), TypeError);
  }
});

test({
  name: 'converts bytes to human readable strings',
  fn: (): void => {
    assertEquals(prettyBytes(0), '0 B');
    assertEquals(prettyBytes(0.4), '0.4 B');
    assertEquals(prettyBytes(0.7), '0.7 B');
    assertEquals(prettyBytes(10), '10 B');
    assertEquals(prettyBytes(10.1), '10.1 B');
    assertEquals(prettyBytes(999), '999 B');
    assertEquals(prettyBytes(1001), '1 kB');
    assertEquals(prettyBytes(1e16), '10 PB');
    assertEquals(prettyBytes(1e30), '1000000 YB');
  }
});

test({
  name: 'supports negative number',
  fn: (): void => {
    assertEquals(prettyBytes(-0.4), '-0.4 B');
    assertEquals(prettyBytes(-0.7), '-0.7 B');
    assertEquals(prettyBytes(-10.1), '-10.1 B');
    assertEquals(prettyBytes(-999), '-999 B');
    assertEquals(prettyBytes(-1001), '-1 kB');
  }
});
