'use strict';

global.crypto = require('crypto');
var Decimal = require('decimal.js');

Decimal.set({ rounding: 5 });
Decimal.set({ modulo: Decimal.ROUND_FLOOR });
Decimal.set({ crypto: true });
Decimal.set({ precision: 1e+4 });
Decimal.set({ toExpPos: 1000 });

// if your secret is large.
var prime512 = Decimal('2').pow(512).sub(1);
var prime3217 = Decimal('2').pow(3217).sub(1);
var prime19937 = Decimal('2').pow(19937).sub(1);

var divmod = function divmod(a, b, n) {
  var aCopy = Decimal.isDecimal(a) ? a : Decimal(a);
  var bCopy = Decimal.isDecimal(b) ? b : Decimal(b);
  var nCopy = Decimal.isDecimal(n) ? n : Decimal(n);
  var t = Decimal('0');
  var nt = Decimal('1');
  var r = nCopy;
  var nr = bCopy.mod(n);
  var tmp = void 0;
  while (!nr.isZero()) {
    var quot = Decimal.floor(r.div(nr));
    tmp = nt;nt = t.sub(quot.times(nt));t = tmp;
    tmp = nr;nr = r.sub(quot.times(nr));r = tmp;
  };
  if (r.greaterThan(1)) return Decimal(0);
  if (t.isNegative()) t = t.add(n);
  return aCopy.times(t).mod(n);
};

var random = function random(lower, upper) {
  if (lower > upper) {
    var temp = lower;
    lower = upper;
    upper = temp;
  }
  return lower.add(Decimal.random().times(upper.sub(lower + 1)).floor());
};

// Polynomial function where `a` is the coefficients
var q = function q(x, _ref) {
  var a = _ref.a;

  var value = a[0];
  for (var i = 1; i < a.length; i++) {
    value = value.add(x.pow(i).times(a[i]));
  }

  return value;
};

var split = function split(secret, n, k, prime) {
  if (Number.isInteger(secret) || Number.isInteger(prime)) {
    throw new TypeError('The split() function must be called with a String<secret>' + 'but got Number<secret>.');
  }

  if (Number.isInteger(prime)) {
    throw new TypeError('The split() function must be called with a String<prime>' + 'but got Number<prime>.');
  }

  if (secret.substring(0, 2) !== '0x') {
    throw new TypeError('The shamir.split() function must be called with a' + 'String<secret> in hexadecimals that begins with 0x.');
  }

  if (!Decimal.isDecimal(prime) && prime.substring(0, 2) !== '0x') {
    throw new TypeError('The split() function must be called with a' + 'String<prime> in hexadecimals that begins with 0x.');
  }

  var S = Decimal(secret);
  var p = Decimal(prime);

  if (S.greaterThan(prime)) {
    throw new RangeError('The String<secret> must be less than the String<prime>.');
  }

  var a = [S];
  var D = [];

  for (var i = 1; i < k; i++) {
    var coeff = random(Decimal(0), p.sub(0x1));
    a.push(coeff);
  }

  for (var _i = 0; _i < n; _i++) {
    var x = Decimal(_i + 1);
    D.push({
      x: x,
      y: q(x, { a: a }).mod(p)
    });
  }

  return D.map(function (share) {
    return {
      x: share.x.toString(),
      y: share.y.toHex()
    };
  });
};

var lagrangeBasis = function lagrangeBasis(data, j) {
  // Lagrange basis evaluated at 0, i.e. L(0).
  // You don't need to interpolate the whole polynomial to get the secret, you
  // only need the constant term.
  var denominator = Decimal(1);
  var numerator = Decimal(1);
  for (var i = 0; i < data.length; i++) {
    if (!data[j].x.equals(data[i].x)) {
      denominator = denominator.times(data[i].x.minus(data[j].x));
    }
  }

  for (var _i2 = 0; _i2 < data.length; _i2++) {
    if (!data[j].x.equals(data[_i2].x)) {
      numerator = numerator.times(data[_i2].x);
    }
  }

  return {
    numerator: numerator,
    denominator: denominator
  };
};

var lagrangeInterpolate = function lagrangeInterpolate(data, p) {
  var S = Decimal(0);

  for (var i = 0; i < data.length; i++) {
    var basis = lagrangeBasis(data, i);
    S = S.add(data[i].y.times(divmod(basis.numerator, basis.denominator, p)));
  }

  var rest = S.mod(p);

  return rest;
};

var combine = function combine(shares, prime) {
  var p = Decimal(prime);

  // Wrap with Decimal on the input shares
  var decimalShares = shares.map(function (share) {
    return {
      x: Decimal(share.x),
      y: Decimal(share.y)
    };
  });

  return lagrangeInterpolate(decimalShares, p);
};

module.exports = {
  prime512: prime512,
  prime3217: prime3217,
  prime19937: prime19937,
  split: split,
  combine: combine
};