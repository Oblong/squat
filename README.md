# squat: simple quaternion library

A simple quaternion library for JavaScript.

## API documentation

squat's API assumes quaternions are represented as an array of four
numbers.  Given such an array `q`, a quaternion is:

    q[0] + q[1]*i + q[2]*j + q[3]*k

Functions that return a quaternion typically have an optional
argument, at the end of the argument list, which serves as an "out"
parameter.  If the caller passes an object (like an `Array`, or a
`Float64Array`) via this argument, the function will set the `'0'`,
`'1'`, `'2'`, and `'3'` properties on the object with the computed
quaternion's component values.  This can be used to recycle space
in a preallocated chunk of memory in an array buffer and avoid
allocating space for return values.

### `squat.add(q1, q2, [out])`

Adds two quaternions.

### `squat.mul(q1, q2, [out])`

Multiplies two quaternions.

Note: quaternion multiplication is noncommutative.

### `squat.scale(q, x, [out])`

Scales the quaternion `q` by the scalar value `x`, multiplying each
component by the scalar.

### `squat.conjugate(q, [out])`

Computes the conjugate of a quaternion.

### `squat.inverse(q, [out])`

Computes the inverse, or reciprocal, of a quaternion.

### `squat.length(q)`

Computes the length of a quaternion.  Also known as the "norm".

### `squat.normalized(q, [out])`

Normalizes a quaternion so its length is equal to 1.  The result of
normalizing a zero quaternion is undefined.

### `squat.real(q)`

Provides the real part of a quaternion, as a number.

### `squat.vect(q)`

Provides the vector part of a quaternion, as a three-element array.

### `squat.zero([out])`

Provides an empty quaternion, with all components set to zero.

### `squat.from_axis_angle(axis, angle, [out])`

Constructs a rotation quaternion, given an axis and angle.  The axis
should be an array or array-like object holding three numbers.  The
angle is in radians.

### `squat.angle(q)`

Extracts the angle part, in radians, from a rotation quaternion.

### `squat.axis(q)`

Extracts the axis part, as an array of three numbers, from a rotation
quaternion.

## License

This library is released under an MIT license.
