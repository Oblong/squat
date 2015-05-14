// (c)  oblong industries

'use strict';

let chai = require('chai');
chai.use(require('chai-stats'));
let assert = chai.assert;
let squat = require('../index.js');

let _1 = squat.bases._1,
    i = squat.bases.i,
    j = squat.bases.j,
    k = squat.bases.k;

describe('basis elements', () => {
  it('have the right values', () => {
    assert.deepEqual([1, 0, 0, 0], _1);
    assert.deepEqual([0, 1, 0, 0], i);
    assert.deepEqual([0, 0, 1, 0], j);
    assert.deepEqual([0, 0, 0, 1], k);
  });

  it('multiplicative identities', () => {
    let i2 = squat.mul(i, i);
    let j2 = squat.mul(j, j);
    let k2 = squat.mul(k, k);
    let ijk = squat.mul(squat.mul(i, j), k);
    assert.deepEqual(i2, j2);
    assert.deepEqual(j2, k2);
    assert.deepEqual(k2, ijk);
    assert.deepEqual(ijk, [-1, 0, 0, 0]);
  });
});

describe('add()', () => {
  it('adds two quaternions', () => {
    assert.deepEqual(squat.add(_1, i), [1, 1, 0, 0]);
  });

  it('works with an out parameter', () => {
    let q = [1, 2, 3, 4];
    squat.add(_1, i, q);
    assert.deepEqual(q, [1, 1, 0, 0]);
  });
});

describe('mul()', () => {
  let p  = [3, 2, 5, 4],
      q  = [4, 5, 3, 1],
      pq = [-17, 16, 47, 0];

  it('multiplies two quaternions', () => {
    assert.deepEqual(squat.mul(p, q), pq);
  });

  it('works with an out parameter', () => {
    let o = [1, 2, 3, 4];
    let ret = squat.mul(p, q, o);
    assert.deepEqual(o, pq);
    assert.deepEqual(o, ret);
  });
});

describe('scale()', () => {
  let p = [3, 2, 5, 4],
      x = 3;

  it('multiplies a quaternion and scalar', () => {
    assert.deepEqual(squat.scale(p, x), [9, 6, 15, 12]);
  });

  it('works with an out parameter', () => {
    let o = new Float64Array(4);
    let ret = squat.scale(p, x, o);
    assert.deepEqual(o, ret); // the joy of duck typing
  });
});

describe('length()', () => {
  let p = [3, 2, 5, 4];
  it('computes a quaternion\'s length', () => {
    assert.equal(squat.length(_1), 1);
    assert.equal(squat.length(i), 1);
    assert.almostEqual(squat.length(p), 7.34846922835);
  });
});

describe('conjugate()', () => {
  let p = [3, 2, 5, 4];
  it('conjugates a quaternion', () => {
    let ijk = squat.mul(squat.mul(i, j), k);
    assert.deepEqual(squat.conjugate(_1), [1, -0, -0, -0]);
    assert.deepEqual(squat.conjugate(i),  [0, -1, -0, -0]);
    assert.deepEqual(squat.conjugate(j),  [0, -0, -1, -0]);
    assert.deepEqual(squat.conjugate(k),  [0, -0, -0, -1]);
    assert.deepEqual(squat.conjugate(p),  [3, -2, -5, -4]);
  });

  it('works with an out parameter', () => {
    let o = [1, 2, 3, 4];
    let ret = squat.conjugate(_1, o);
    assert.deepEqual(o, [1, -0, -0, -0]);
    assert.deepEqual(o, ret);
  });
});

describe('inverse()', () => {
  let p = [3, 2, 5, 4];
  let p_ = squat.conjugate(p);
  let length = squat.length(p);
  let r = 1/(length * length);

  it('obeys the law', () => {
    assert.deepEqual(squat.inverse(p), squat.scale(p_, r));
  });

  it('works with an out parameter', () => {
    let o = [1, 2, 3, 4];
    let ret = squat.inverse(p, o);
    assert.deepEqual(o, squat.scale(p_, r));
    assert.deepEqual(o, ret);
  });
});

describe('normalized()', () => {
  let p = [3, 2, 5, 4];

  it('yields a quaternion of unit length', () => {
    let u_p = squat.normalized(p);
    assert.almostEqual(squat.length(u_p), 1);
  });
});

describe('from_axis_angle()', () => {
  it('returns the right quaternion', () => {
    assert.deepAlmostEqual(squat.from_axis_angle([1, 0, 0], 0), [1, 0, 0, 0]);
    assert.deepAlmostEqual(squat.from_axis_angle([0, 1, 0], Math.PI), [0, 0, 1, 0]);
    let a = Math.cos(Math.PI/4);
    assert.deepAlmostEqual(squat.from_axis_angle([1, 0, 0], Math.PI/2), [a, a, 0, 0]);
  });

  it('does okay with a non-unit vector', () => {
    assert.deepAlmostEqual(squat.from_axis_angle([2, 0, 0], 0), [1, 0, 0, 0]);
  });
});

describe('axis() and angle()', () => {
  it('do the right thing', () => {
    // generative testing would be great here.
    let rando_axis = [0.2672612419124244, 0.5345224838248488, 0.8017837257372732];
    for (let axis of [[1, 0, 0], [0, 1, 0], [0, 0, 1], rando_axis]) {
      for (let angle of [Math.PI, Math.PI/4, Math.PI/6]) {
        let quat = squat.from_axis_angle(axis, angle);
        assert.deepAlmostEqual(squat.axis(quat), axis);
        assert.almostEqual(squat.angle(quat), angle);
      }
    }
  });
});
