Functions to consider adding:

* `squat.from_axis_angle(v, r, [out])`: constructs a quaternion from
  an axis (as a unit "Vect3") and an angle (in radians)
* `squat.from_rotation_matrix(mat, [out])`: constructs a quaternion
  from a rotation matrix (as a "Matrix44", a 16-element array)
* `squat.angle(q)`: computes the angle part, in radians, of a
  quaternion
* `squat.axis(q, [out])`: computes the axis part of a quaternion, as a
  "Vect3"
* `squat.pow(q, a, [out])`: computes the quaternion raised to a power
