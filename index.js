// (c)  oblong industries

'use strict';

/**
 * A simple quaternion library for JavaScript that provides free functions
 * which operate on quadruple arrays.
 *
 * The library assumes quaternions are of the form, given some array
 * of numbers `q`:
 *
 *     q[0] + q[1]*i + q[2]*j + q[3]*k
 *
 * Functions which return a quaternion often have an optional
 * argument, at the end of the argument list, which serves as an "out"
 * parameter.  If the caller passes an object (like an `Array`, or a
 * `Float64Array`) via this argument, the function will set the `'0'`,
 * `'1'`, `'2'`, and `'3'` properties on the object with the computed
 * quaternion's component values.  This can be used to recycle space
 * in a preallocated chunk of memory in an array buffer and avoid
 * allocating space for return values.
 */

var squat = module.exports;

// internal function that constructs and returns a new, zero
// quaternion
function new_quat() {
  return [0, 0, 0, 0];
}

/**
 * Adds two quaternions.
 */
exports.add = function (q1, q2, out) {
  out = out || new_quat();
  out[0] = q1[0] + q2[0];
  out[1] = q1[1] + q2[1];
  out[2] = q1[2] + q2[2];
  out[3] = q1[3] + q2[3];
  return out;
};

/**
 * Multiplies two quaternions.
 * Note: quaternion multiplication is noncommutative.
 */
exports.mul = function (q1, q2, out) {
  out = out || new_quat();

  var a1 = q1[0], a2 = q2[0],
      b1 = q1[1], b2 = q2[1],
      c1 = q1[2], c2 = q2[2],
      d1 = q1[3], d2 = q2[3];

  out[0] = a1*a2 - b1*b2 - c1*c2 - d1*d2;
  out[1] = a1*b2 + b1*a2 + c1*d2 - d1*c2;
  out[2] = a1*c2 - b1*d2 + c1*a2 + d1*b2;
  out[3] = a1*d2 + b1*c2 - c1*b2 + d1*a2;
  return out;
};

/**
 * Multiplies a quaternion by a scalar.
 */
exports.scale = function (q, x, out) {
  out = out || new_quat();
  var a = q[0], b = q[1], c = q[2], d = q[3];

  out[0] = a*x;
  out[1] = b*x;
  out[2] = c*x;
  out[3] = d*x;
  return out;
};

/**
 * Computes the conjugate of a quaternion.
 */
exports.conjugate = function (q, out) {
  out = out || new_quat();
  var a = q[0], b = q[1], c = q[2], d = q[3];
  out[0] = a;
  out[1] = -b;
  out[2] = -c;
  out[3] = -d;
  return out;
};

/**
 * Computes the inverse, or reciprocal, of a quaternion.
 */
exports.inverse = function (q, out) {
  out = out || new_quat();
  var a = q[0], b = q[1], c = q[2], d = q[3];
  var r = 1 / (a*a + b*b + c*c + d*d);
  out[0] = a*r;
  out[1] = -b*r;
  out[2] = -c*r;
  out[3] = -d*r;
  return out;
};

/**
 * Computes the length of a quaternion: that is, the square root of
 * the product of the quaternion with its conjugate.  Also known as
 * the "norm".
 */
exports.length = function (q) {
  var a = q[0], b = q[1], c = q[2], d = q[3];
  return Math.sqrt(a*a + b*b + c*c + d*d);
};

/**
 * Normalizes a quaternion so its length is equal to 1.  The result of
 * normalizing a zero quaternion is undefined.
 */
exports.normalized = function (q, out) {
  out = out || new_quat();
  var a = q[0], b = q[1], c = q[2], d = q[3];
  var rlen = 1 / squat.length(q);
  return squat.scale(q, rlen, out);
};

/**
 * Provides the real part of the quaternion.
 */
exports.real = function (q) { return q[0]; };

/**
 * Provides the vector part of the quaternion.
 */
exports.vect = function (q) { return [q[1], q[2], q[3]]; };

/**
 * Provides an empty quaternion.
 */
exports.zero = function (out) {
  out = out || new_quat();
  return out;
};

/**
 * Basis quaternions, for your convenience.
 */
exports.bases = {
  _1: [1, 0, 0, 0],
  i:  [0, 1, 0, 0],
  j:  [0, 0, 1, 0],
  k:  [0, 0, 0, 1]
};
