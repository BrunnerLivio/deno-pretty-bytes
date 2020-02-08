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

test({
  name: 'signed option',
  fn: (): void => {
    assertEquals(prettyBytes(42, { signed: true }), '+42 B');
    assertEquals(prettyBytes(-13, { signed: true }), '-13 B');
    assertEquals(prettyBytes(0, { signed: true }), ' 0 B');
  }
});

test({
  name: 'bits option',
  fn: (): void => {
    assertEquals(prettyBytes(0, { bits: true }), '0 b');
    assertEquals(prettyBytes(0.4, { bits: true }), '0.4 b');
    assertEquals(prettyBytes(10, { bits: true }), '10 b');
    assertEquals(prettyBytes(999, { bits: true }), '999 b');
    assertEquals(prettyBytes(1001, { bits: true }), '1 kbit');
    assertEquals(prettyBytes(1e16, { bits: true }), '10 Pbit');
    assertEquals(prettyBytes(1e30, { bits: true }), '1000000 Ybit');
  }
})