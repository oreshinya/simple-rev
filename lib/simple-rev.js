// output/Control.Semigroupoid/index.js
var semigroupoidFn = {
  compose: function(f) {
    return function(g) {
      return function(x) {
        return f(g(x));
      };
    };
  }
};

// output/Control.Category/index.js
var identity = function(dict) {
  return dict.identity;
};
var categoryFn = {
  identity: function(x) {
    return x;
  },
  Semigroupoid0: function() {
    return semigroupoidFn;
  }
};

// output/Data.Function/index.js
var flip = function(f) {
  return function(b) {
    return function(a) {
      return f(a)(b);
    };
  };
};
var $$const = function(a) {
  return function(v) {
    return a;
  };
};

// output/Data.Functor/foreign.js
var arrayMap = function(f) {
  return function(arr) {
    var l = arr.length;
    var result = new Array(l);
    for (var i = 0; i < l; i++) {
      result[i] = f(arr[i]);
    }
    return result;
  };
};

// output/Data.Unit/foreign.js
var unit = void 0;

// output/Data.Functor/index.js
var map = function(dict) {
  return dict.map;
};
var mapFlipped = function(dictFunctor) {
  var map1 = map(dictFunctor);
  return function(fa) {
    return function(f) {
      return map1(f)(fa);
    };
  };
};
var $$void = function(dictFunctor) {
  return map(dictFunctor)($$const(unit));
};
var voidLeft = function(dictFunctor) {
  var map1 = map(dictFunctor);
  return function(f) {
    return function(x) {
      return map1($$const(x))(f);
    };
  };
};
var functorArray = {
  map: arrayMap
};

// output/Control.Apply/index.js
var identity2 = /* @__PURE__ */ identity(categoryFn);
var apply = function(dict) {
  return dict.apply;
};
var applySecond = function(dictApply) {
  var apply1 = apply(dictApply);
  var map5 = map(dictApply.Functor0());
  return function(a) {
    return function(b) {
      return apply1(map5($$const(identity2))(a))(b);
    };
  };
};

// output/Control.Applicative/index.js
var pure = function(dict) {
  return dict.pure;
};
var liftA1 = function(dictApplicative) {
  var apply3 = apply(dictApplicative.Apply0());
  var pure1 = pure(dictApplicative);
  return function(f) {
    return function(a) {
      return apply3(pure1(f))(a);
    };
  };
};

// output/Control.Bind/index.js
var discard = function(dict) {
  return dict.discard;
};
var bind = function(dict) {
  return dict.bind;
};
var bindFlipped = function(dictBind) {
  return flip(bind(dictBind));
};
var discardUnit = {
  discard: function(dictBind) {
    return bind(dictBind);
  }
};

// output/Control.Monad/index.js
var ap = function(dictMonad) {
  var bind3 = bind(dictMonad.Bind1());
  var pure4 = pure(dictMonad.Applicative0());
  return function(f) {
    return function(a) {
      return bind3(f)(function(f$prime) {
        return bind3(a)(function(a$prime) {
          return pure4(f$prime(a$prime));
        });
      });
    };
  };
};

// output/Data.Bounded/foreign.js
var topChar = String.fromCharCode(65535);
var bottomChar = String.fromCharCode(0);
var topNumber = Number.POSITIVE_INFINITY;
var bottomNumber = Number.NEGATIVE_INFINITY;

// output/Data.Ord/foreign.js
var unsafeCompareImpl = function(lt) {
  return function(eq2) {
    return function(gt) {
      return function(x) {
        return function(y) {
          return x < y ? lt : x === y ? eq2 : gt;
        };
      };
    };
  };
};
var ordIntImpl = unsafeCompareImpl;
var ordCharImpl = unsafeCompareImpl;

// output/Data.Eq/foreign.js
var refEq = function(r1) {
  return function(r2) {
    return r1 === r2;
  };
};
var eqIntImpl = refEq;
var eqCharImpl = refEq;
var eqStringImpl = refEq;

// output/Data.Eq/index.js
var eqString = {
  eq: eqStringImpl
};
var eqInt = {
  eq: eqIntImpl
};
var eqChar = {
  eq: eqCharImpl
};
var eq = function(dict) {
  return dict.eq;
};

// output/Data.Ordering/index.js
var LT = /* @__PURE__ */ function() {
  function LT2() {
  }
  ;
  LT2.value = new LT2();
  return LT2;
}();
var GT = /* @__PURE__ */ function() {
  function GT2() {
  }
  ;
  GT2.value = new GT2();
  return GT2;
}();
var EQ = /* @__PURE__ */ function() {
  function EQ2() {
  }
  ;
  EQ2.value = new EQ2();
  return EQ2;
}();

// output/Data.Ring/foreign.js
var intSub = function(x) {
  return function(y) {
    return x - y | 0;
  };
};

// output/Data.Semiring/foreign.js
var intAdd = function(x) {
  return function(y) {
    return x + y | 0;
  };
};
var intMul = function(x) {
  return function(y) {
    return x * y | 0;
  };
};

// output/Data.Semiring/index.js
var semiringInt = {
  add: intAdd,
  zero: 0,
  mul: intMul,
  one: 1
};
var one = function(dict) {
  return dict.one;
};

// output/Data.Ring/index.js
var ringInt = {
  sub: intSub,
  Semiring0: function() {
    return semiringInt;
  }
};

// output/Data.Ord/index.js
var ordInt = /* @__PURE__ */ function() {
  return {
    compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqInt;
    }
  };
}();
var ordChar = /* @__PURE__ */ function() {
  return {
    compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
    Eq0: function() {
      return eqChar;
    }
  };
}();
var compare = function(dict) {
  return dict.compare;
};

// output/Data.Bounded/index.js
var top = function(dict) {
  return dict.top;
};
var boundedChar = {
  top: topChar,
  bottom: bottomChar,
  Ord0: function() {
    return ordChar;
  }
};
var bottom = function(dict) {
  return dict.bottom;
};

// output/Data.Show/foreign.js
var showIntImpl = function(n) {
  return n.toString();
};

// output/Data.Show/index.js
var showInt = {
  show: showIntImpl
};
var show = function(dict) {
  return dict.show;
};

// output/Data.HeytingAlgebra/foreign.js
var boolConj = function(b1) {
  return function(b2) {
    return b1 && b2;
  };
};
var boolDisj = function(b1) {
  return function(b2) {
    return b1 || b2;
  };
};
var boolNot = function(b) {
  return !b;
};

// output/Data.HeytingAlgebra/index.js
var not = function(dict) {
  return dict.not;
};
var ff = function(dict) {
  return dict.ff;
};
var disj = function(dict) {
  return dict.disj;
};
var heytingAlgebraBoolean = {
  ff: false,
  tt: true,
  implies: function(a) {
    return function(b) {
      return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
    };
  },
  conj: boolConj,
  disj: boolDisj,
  not: boolNot
};

// output/Data.EuclideanRing/foreign.js
var intDegree = function(x) {
  return Math.min(Math.abs(x), 2147483647);
};
var intDiv = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
  };
};
var intMod = function(x) {
  return function(y) {
    if (y === 0)
      return 0;
    var yy = Math.abs(y);
    return (x % yy + yy) % yy;
  };
};

// output/Data.CommutativeRing/index.js
var commutativeRingInt = {
  Ring0: function() {
    return ringInt;
  }
};

// output/Data.EuclideanRing/index.js
var mod = function(dict) {
  return dict.mod;
};
var euclideanRingInt = {
  degree: intDegree,
  div: intDiv,
  mod: intMod,
  CommutativeRing0: function() {
    return commutativeRingInt;
  }
};
var div = function(dict) {
  return dict.div;
};

// output/Data.Semigroup/index.js
var append = function(dict) {
  return dict.append;
};

// output/Data.Monoid/index.js
var mempty = function(dict) {
  return dict.mempty;
};

// output/Data.Tuple/index.js
var Tuple = /* @__PURE__ */ function() {
  function Tuple2(value0, value1) {
    this.value0 = value0;
    this.value1 = value1;
  }
  ;
  Tuple2.create = function(value0) {
    return function(value1) {
      return new Tuple2(value0, value1);
    };
  };
  return Tuple2;
}();
var snd = function(v) {
  return v.value1;
};
var fst = function(v) {
  return v.value0;
};

// output/Effect/foreign.js
var pureE = function(a) {
  return function() {
    return a;
  };
};
var bindE = function(a) {
  return function(f) {
    return function() {
      return f(a())();
    };
  };
};

// output/Effect/index.js
var $runtime_lazy = function(name2, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var monadEffect = {
  Applicative0: function() {
    return applicativeEffect;
  },
  Bind1: function() {
    return bindEffect;
  }
};
var bindEffect = {
  bind: bindE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var applicativeEffect = {
  pure: pureE,
  Apply0: function() {
    return $lazy_applyEffect(0);
  }
};
var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
  return {
    map: liftA1(applicativeEffect)
  };
});
var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
  return {
    apply: ap(monadEffect),
    Functor0: function() {
      return $lazy_functorEffect(0);
    }
  };
});
var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

// output/Effect.Class/index.js
var liftEffect = function(dict) {
  return dict.liftEffect;
};

// output/Data.Maybe/index.js
var Nothing = /* @__PURE__ */ function() {
  function Nothing2() {
  }
  ;
  Nothing2.value = new Nothing2();
  return Nothing2;
}();
var Just = /* @__PURE__ */ function() {
  function Just2(value0) {
    this.value0 = value0;
  }
  ;
  Just2.create = function(value0) {
    return new Just2(value0);
  };
  return Just2;
}();
var maybe = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Nothing) {
        return v;
      }
      ;
      if (v2 instanceof Just) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};
var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
var functorMaybe = {
  map: function(v) {
    return function(v1) {
      if (v1 instanceof Just) {
        return new Just(v(v1.value0));
      }
      ;
      return Nothing.value;
    };
  }
};
var fromJust = function() {
  return function(v) {
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
  };
};

// output/Data.Either/index.js
var Left = /* @__PURE__ */ function() {
  function Left2(value0) {
    this.value0 = value0;
  }
  ;
  Left2.create = function(value0) {
    return new Left2(value0);
  };
  return Left2;
}();
var Right = /* @__PURE__ */ function() {
  function Right2(value0) {
    this.value0 = value0;
  }
  ;
  Right2.create = function(value0) {
    return new Right2(value0);
  };
  return Right2;
}();
var functorEither = {
  map: function(f) {
    return function(m) {
      if (m instanceof Left) {
        return new Left(m.value0);
      }
      ;
      if (m instanceof Right) {
        return new Right(f(m.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
    };
  }
};
var either = function(v) {
  return function(v1) {
    return function(v2) {
      if (v2 instanceof Left) {
        return v(v2.value0);
      }
      ;
      if (v2 instanceof Right) {
        return v1(v2.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
    };
  };
};

// output/Effect.Exception/foreign.js
function message(e) {
  return e.message;
}

// output/Control.Monad.Error.Class/index.js
var catchError = function(dict) {
  return dict.catchError;
};
var $$try = function(dictMonadError) {
  var catchError1 = catchError(dictMonadError);
  var Monad0 = dictMonadError.MonadThrow0().Monad0();
  var map5 = map(Monad0.Bind1().Apply0().Functor0());
  var pure4 = pure(Monad0.Applicative0());
  return function(a) {
    return catchError1(map5(Right.create)(a))(function($52) {
      return pure4(Left.create($52));
    });
  };
};

// output/Unsafe.Coerce/foreign.js
var unsafeCoerce2 = function(x) {
  return x;
};

// output/Safe.Coerce/index.js
var coerce = function() {
  return unsafeCoerce2;
};

// output/Data.Newtype/index.js
var coerce2 = /* @__PURE__ */ coerce();
var alaF = function() {
  return function() {
    return function() {
      return function() {
        return function(v) {
          return coerce2;
        };
      };
    };
  };
};

// output/Control.Parallel.Class/index.js
var sequential = function(dict) {
  return dict.sequential;
};
var parallel = function(dict) {
  return dict.parallel;
};

// output/Data.Foldable/foreign.js
var foldrArray = function(f) {
  return function(init3) {
    return function(xs) {
      var acc = init3;
      var len = xs.length;
      for (var i = len - 1; i >= 0; i--) {
        acc = f(xs[i])(acc);
      }
      return acc;
    };
  };
};
var foldlArray = function(f) {
  return function(init3) {
    return function(xs) {
      var acc = init3;
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        acc = f(acc)(xs[i]);
      }
      return acc;
    };
  };
};

// output/Data.Monoid.Disj/index.js
var Disj = function(x) {
  return x;
};
var semigroupDisj = function(dictHeytingAlgebra) {
  var disj2 = disj(dictHeytingAlgebra);
  return {
    append: function(v) {
      return function(v1) {
        return disj2(v)(v1);
      };
    }
  };
};
var monoidDisj = function(dictHeytingAlgebra) {
  var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
  return {
    mempty: ff(dictHeytingAlgebra),
    Semigroup0: function() {
      return semigroupDisj1;
    }
  };
};

// output/Data.Foldable/index.js
var alaF2 = /* @__PURE__ */ alaF()()()();
var foldr = function(dict) {
  return dict.foldr;
};
var traverse_ = function(dictApplicative) {
  var applySecond2 = applySecond(dictApplicative.Apply0());
  var pure4 = pure(dictApplicative);
  return function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(f) {
      return foldr22(function($454) {
        return applySecond2(f($454));
      })(pure4(unit));
    };
  };
};
var foldMapDefaultR = function(dictFoldable) {
  var foldr22 = foldr(dictFoldable);
  return function(dictMonoid) {
    var append2 = append(dictMonoid.Semigroup0());
    var mempty2 = mempty(dictMonoid);
    return function(f) {
      return foldr22(function(x) {
        return function(acc) {
          return append2(f(x))(acc);
        };
      })(mempty2);
    };
  };
};
var foldableArray = {
  foldr: foldrArray,
  foldl: foldlArray,
  foldMap: function(dictMonoid) {
    return foldMapDefaultR(foldableArray)(dictMonoid);
  }
};
var foldMap = function(dict) {
  return dict.foldMap;
};
var any = function(dictFoldable) {
  var foldMap2 = foldMap(dictFoldable);
  return function(dictHeytingAlgebra) {
    return alaF2(Disj)(foldMap2(monoidDisj(dictHeytingAlgebra)));
  };
};
var elem = function(dictFoldable) {
  var any1 = any(dictFoldable)(heytingAlgebraBoolean);
  return function(dictEq) {
    var $462 = eq(dictEq);
    return function($463) {
      return any1($462($463));
    };
  };
};
var notElem = function(dictFoldable) {
  var elem1 = elem(dictFoldable);
  return function(dictEq) {
    var elem22 = elem1(dictEq);
    return function(x) {
      var $464 = elem22(x);
      return function($465) {
        return !$464($465);
      };
    };
  };
};

// output/Data.Traversable/foreign.js
var traverseArrayImpl = function() {
  function array1(a) {
    return [a];
  }
  function array2(a) {
    return function(b) {
      return [a, b];
    };
  }
  function array3(a) {
    return function(b) {
      return function(c) {
        return [a, b, c];
      };
    };
  }
  function concat22(xs) {
    return function(ys) {
      return xs.concat(ys);
    };
  }
  return function(apply3) {
    return function(map5) {
      return function(pure4) {
        return function(f) {
          return function(array) {
            function go(bot, top2) {
              switch (top2 - bot) {
                case 0:
                  return pure4([]);
                case 1:
                  return map5(array1)(f(array[bot]));
                case 2:
                  return apply3(map5(array2)(f(array[bot])))(f(array[bot + 1]));
                case 3:
                  return apply3(apply3(map5(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                default:
                  var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                  return apply3(map5(concat22)(go(bot, pivot)))(go(pivot, top2));
              }
            }
            return go(0, array.length);
          };
        };
      };
    };
  };
}();

// output/Data.Traversable/index.js
var identity3 = /* @__PURE__ */ identity(categoryFn);
var traverse = function(dict) {
  return dict.traverse;
};
var sequenceDefault = function(dictTraversable) {
  var traverse2 = traverse(dictTraversable);
  return function(dictApplicative) {
    return traverse2(dictApplicative)(identity3);
  };
};
var traversableArray = {
  traverse: function(dictApplicative) {
    var Apply0 = dictApplicative.Apply0();
    return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
  },
  sequence: function(dictApplicative) {
    return sequenceDefault(traversableArray)(dictApplicative);
  },
  Functor0: function() {
    return functorArray;
  },
  Foldable1: function() {
    return foldableArray;
  }
};

// output/Control.Parallel/index.js
var identity4 = /* @__PURE__ */ identity(categoryFn);
var parTraverse_ = function(dictParallel) {
  var sequential2 = sequential(dictParallel);
  var traverse_2 = traverse_(dictParallel.Applicative1());
  var parallel2 = parallel(dictParallel);
  return function(dictFoldable) {
    var traverse_1 = traverse_2(dictFoldable);
    return function(f) {
      var $48 = traverse_1(function($50) {
        return parallel2(f($50));
      });
      return function($49) {
        return sequential2($48($49));
      };
    };
  };
};
var parTraverse = function(dictParallel) {
  var sequential2 = sequential(dictParallel);
  var Applicative1 = dictParallel.Applicative1();
  var parallel2 = parallel(dictParallel);
  return function(dictTraversable) {
    var traverse2 = traverse(dictTraversable)(Applicative1);
    return function(f) {
      var $51 = traverse2(function($53) {
        return parallel2(f($53));
      });
      return function($52) {
        return sequential2($51($52));
      };
    };
  };
};
var parSequence_ = function(dictParallel) {
  var parTraverse_1 = parTraverse_(dictParallel);
  return function(dictFoldable) {
    return parTraverse_1(dictFoldable)(identity4);
  };
};

// output/Data.Array/foreign.js
var replicateFill = function(count) {
  return function(value) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value);
  };
};
var replicatePolyfill = function(count) {
  return function(value) {
    var result = [];
    var n = 0;
    for (var i = 0; i < count; i++) {
      result[n++] = value;
    }
    return result;
  };
};
var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
var fromFoldableImpl = function() {
  function Cons2(head2, tail2) {
    this.head = head2;
    this.tail = tail2;
  }
  var emptyList = {};
  function curryCons(head2) {
    return function(tail2) {
      return new Cons2(head2, tail2);
    };
  }
  function listToArray(list) {
    var result = [];
    var count = 0;
    var xs = list;
    while (xs !== emptyList) {
      result[count++] = xs.head;
      xs = xs.tail;
    }
    return result;
  }
  return function(foldr3) {
    return function(xs) {
      return listToArray(foldr3(curryCons)(emptyList)(xs));
    };
  };
}();
var length = function(xs) {
  return xs.length;
};
var concat = function(xss) {
  if (xss.length <= 1e4) {
    return Array.prototype.concat.apply([], xss);
  }
  var result = [];
  for (var i = 0, l = xss.length; i < l; i++) {
    var xs = xss[i];
    for (var j = 0, m = xs.length; j < m; j++) {
      result.push(xs[j]);
    }
  }
  return result;
};
var sortByImpl = function() {
  function mergeFromTo(compare3, fromOrdering, xs1, xs2, from2, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from2 + (to - from2 >> 1);
    if (mid - from2 > 1)
      mergeFromTo(compare3, fromOrdering, xs2, xs1, from2, mid);
    if (to - mid > 1)
      mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to);
    i = from2;
    j = mid;
    k = from2;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare3(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare3) {
    return function(fromOrdering) {
      return function(xs) {
        var out;
        if (xs.length < 2)
          return xs;
        out = xs.slice(0);
        mergeFromTo(compare3, fromOrdering, out, xs.slice(0), 0, xs.length);
        return out;
      };
    };
  };
}();

// output/Control.Monad.ST.Internal/foreign.js
var map_ = function(f) {
  return function(a) {
    return function() {
      return f(a());
    };
  };
};
var foreach = function(as) {
  return function(f) {
    return function() {
      for (var i = 0, l = as.length; i < l; i++) {
        f(as[i])();
      }
    };
  };
};

// output/Control.Monad.ST.Internal/index.js
var functorST = {
  map: map_
};

// output/Data.Array.ST/foreign.js
var sortByImpl2 = function() {
  function mergeFromTo(compare3, fromOrdering, xs1, xs2, from2, to) {
    var mid;
    var i;
    var j;
    var k;
    var x;
    var y;
    var c;
    mid = from2 + (to - from2 >> 1);
    if (mid - from2 > 1)
      mergeFromTo(compare3, fromOrdering, xs2, xs1, from2, mid);
    if (to - mid > 1)
      mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to);
    i = from2;
    j = mid;
    k = from2;
    while (i < mid && j < to) {
      x = xs2[i];
      y = xs2[j];
      c = fromOrdering(compare3(x)(y));
      if (c > 0) {
        xs1[k++] = y;
        ++j;
      } else {
        xs1[k++] = x;
        ++i;
      }
    }
    while (i < mid) {
      xs1[k++] = xs2[i++];
    }
    while (j < to) {
      xs1[k++] = xs2[j++];
    }
  }
  return function(compare3) {
    return function(fromOrdering) {
      return function(xs) {
        return function() {
          if (xs.length < 2)
            return xs;
          mergeFromTo(compare3, fromOrdering, xs, xs.slice(0), 0, xs.length);
          return xs;
        };
      };
    };
  };
}();

// output/Data.Unfoldable/foreign.js
var unfoldrArrayImpl = function(isNothing2) {
  return function(fromJust4) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var maybe2 = f(value);
              if (isNothing2(maybe2))
                return result;
              var tuple = fromJust4(maybe2);
              result.push(fst2(tuple));
              value = snd2(tuple);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/foreign.js
var unfoldr1ArrayImpl = function(isNothing2) {
  return function(fromJust4) {
    return function(fst2) {
      return function(snd2) {
        return function(f) {
          return function(b) {
            var result = [];
            var value = b;
            while (true) {
              var tuple = f(value);
              result.push(fst2(tuple));
              var maybe2 = snd2(tuple);
              if (isNothing2(maybe2))
                return result;
              value = fromJust4(maybe2);
            }
          };
        };
      };
    };
  };
};

// output/Data.Unfoldable1/index.js
var fromJust2 = /* @__PURE__ */ fromJust();
var unfoldable1Array = {
  unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
};

// output/Data.Unfoldable/index.js
var fromJust3 = /* @__PURE__ */ fromJust();
var unfoldr = function(dict) {
  return dict.unfoldr;
};
var unfoldableArray = {
  unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
  Unfoldable10: function() {
    return unfoldable1Array;
  }
};

// output/Data.Array/index.js
var sortBy = function(comp) {
  return sortByImpl(comp)(function(v) {
    if (v instanceof GT) {
      return 1;
    }
    ;
    if (v instanceof EQ) {
      return 0;
    }
    ;
    if (v instanceof LT) {
      return -1 | 0;
    }
    ;
    throw new Error("Failed pattern match at Data.Array (line 870, column 31 - line 873, column 11): " + [v.constructor.name]);
  });
};
var fromFoldable = function(dictFoldable) {
  return fromFoldableImpl(foldr(dictFoldable));
};

// output/Data.String.CodePoints/foreign.js
var hasArrayFrom = typeof Array.from === "function";
var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
var hasCodePointAt = typeof String.prototype.codePointAt === "function";
var _unsafeCodePointAt0 = function(fallback) {
  return hasCodePointAt ? function(str) {
    return str.codePointAt(0);
  } : fallback;
};
var _singleton = function(fallback) {
  return hasFromCodePoint ? String.fromCodePoint : fallback;
};
var _take = function(fallback) {
  return function(n) {
    if (hasStringIterator) {
      return function(str) {
        var accum = "";
        var iter = str[Symbol.iterator]();
        for (var i = 0; i < n; ++i) {
          var o = iter.next();
          if (o.done)
            return accum;
          accum += o.value;
        }
        return accum;
      };
    }
    return fallback(n);
  };
};
var _toCodePointArray = function(fallback) {
  return function(unsafeCodePointAt02) {
    if (hasArrayFrom) {
      return function(str) {
        return Array.from(str, unsafeCodePointAt02);
      };
    }
    return fallback;
  };
};

// output/Data.Enum/foreign.js
function toCharCode(c) {
  return c.charCodeAt(0);
}
function fromCharCode(c) {
  return String.fromCharCode(c);
}

// output/Data.Enum/index.js
var bottom1 = /* @__PURE__ */ bottom(boundedChar);
var top1 = /* @__PURE__ */ top(boundedChar);
var toEnum = function(dict) {
  return dict.toEnum;
};
var fromEnum = function(dict) {
  return dict.fromEnum;
};
var toEnumWithDefaults = function(dictBoundedEnum) {
  var toEnum1 = toEnum(dictBoundedEnum);
  var fromEnum1 = fromEnum(dictBoundedEnum);
  var bottom2 = bottom(dictBoundedEnum.Bounded0());
  return function(low) {
    return function(high) {
      return function(x) {
        var v = toEnum1(x);
        if (v instanceof Just) {
          return v.value0;
        }
        ;
        if (v instanceof Nothing) {
          var $140 = x < fromEnum1(bottom2);
          if ($140) {
            return low;
          }
          ;
          return high;
        }
        ;
        throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
      };
    };
  };
};
var defaultSucc = function(toEnum$prime) {
  return function(fromEnum$prime) {
    return function(a) {
      return toEnum$prime(fromEnum$prime(a) + 1 | 0);
    };
  };
};
var defaultPred = function(toEnum$prime) {
  return function(fromEnum$prime) {
    return function(a) {
      return toEnum$prime(fromEnum$prime(a) - 1 | 0);
    };
  };
};
var charToEnum = function(v) {
  if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
    return new Just(fromCharCode(v));
  }
  ;
  return Nothing.value;
};
var enumChar = {
  succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
  pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
  Ord0: function() {
    return ordChar;
  }
};
var boundedEnumChar = /* @__PURE__ */ function() {
  return {
    cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
    toEnum: charToEnum,
    fromEnum: toCharCode,
    Bounded0: function() {
      return boundedChar;
    },
    Enum1: function() {
      return enumChar;
    }
  };
}();

// output/Data.String.CodeUnits/foreign.js
var singleton2 = function(c) {
  return c;
};
var length2 = function(s) {
  return s.length;
};
var drop = function(n) {
  return function(s) {
    return s.substring(n);
  };
};

// output/Data.String.Unsafe/foreign.js
var charAt = function(i) {
  return function(s) {
    if (i >= 0 && i < s.length)
      return s.charAt(i);
    throw new Error("Data.String.Unsafe.charAt: Invalid index.");
  };
};

// output/Data.String.Common/foreign.js
var replaceAll = function(s1) {
  return function(s2) {
    return function(s3) {
      return s3.replace(new RegExp(s1.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), s2);
    };
  };
};
var split = function(sep2) {
  return function(s) {
    return s.split(sep2);
  };
};

// output/Data.String.CodePoints/index.js
var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
var map2 = /* @__PURE__ */ map(functorMaybe);
var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
var div2 = /* @__PURE__ */ div(euclideanRingInt);
var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
var unsurrogate = function(lead) {
  return function(trail) {
    return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
  };
};
var isTrail = function(cu) {
  return 56320 <= cu && cu <= 57343;
};
var isLead = function(cu) {
  return 55296 <= cu && cu <= 56319;
};
var uncons = function(s) {
  var v = length2(s);
  if (v === 0) {
    return Nothing.value;
  }
  ;
  if (v === 1) {
    return new Just({
      head: fromEnum2(charAt(0)(s)),
      tail: ""
    });
  }
  ;
  var cu1 = fromEnum2(charAt(1)(s));
  var cu0 = fromEnum2(charAt(0)(s));
  var $43 = isLead(cu0) && isTrail(cu1);
  if ($43) {
    return new Just({
      head: unsurrogate(cu0)(cu1),
      tail: drop(2)(s)
    });
  }
  ;
  return new Just({
    head: cu0,
    tail: drop(1)(s)
  });
};
var unconsButWithTuple = function(s) {
  return map2(function(v) {
    return new Tuple(v.head, v.tail);
  })(uncons(s));
};
var toCodePointArrayFallback = function(s) {
  return unfoldr2(unconsButWithTuple)(s);
};
var unsafeCodePointAt0Fallback = function(s) {
  var cu0 = fromEnum2(charAt(0)(s));
  var $47 = isLead(cu0) && length2(s) > 1;
  if ($47) {
    var cu1 = fromEnum2(charAt(1)(s));
    var $48 = isTrail(cu1);
    if ($48) {
      return unsurrogate(cu0)(cu1);
    }
    ;
    return cu0;
  }
  ;
  return cu0;
};
var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
var length3 = function($74) {
  return length(toCodePointArray($74));
};
var fromCharCode2 = /* @__PURE__ */ function() {
  var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
  return function($76) {
    return singleton2($75($76));
  };
}();
var singletonFallback = function(v) {
  if (v <= 65535) {
    return fromCharCode2(v);
  }
  ;
  var lead = div2(v - 65536 | 0)(1024) + 55296 | 0;
  var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
  return fromCharCode2(lead) + fromCharCode2(trail);
};
var singleton3 = /* @__PURE__ */ _singleton(singletonFallback);
var takeFallback = function(v) {
  return function(v1) {
    if (v < 1) {
      return "";
    }
    ;
    var v2 = uncons(v1);
    if (v2 instanceof Just) {
      return singleton3(v2.value0.head) + takeFallback(v - 1 | 0)(v2.value0.tail);
    }
    ;
    return v1;
  };
};
var take2 = /* @__PURE__ */ _take(takeFallback);
var drop2 = function(n) {
  return function(s) {
    return drop(length2(take2(n)(s)))(s);
  };
};

// output/Data.String.Regex/foreign.js
var regexImpl = function(left) {
  return function(right) {
    return function(s1) {
      return function(s2) {
        try {
          return right(new RegExp(s1, s2));
        } catch (e) {
          return left(e.message);
        }
      };
    };
  };
};
var source = function(r) {
  return r.source;
};
var test = function(r) {
  return function(s) {
    var lastIndex = r.lastIndex;
    var result = r.test(s);
    r.lastIndex = lastIndex;
    return result;
  };
};
var replace2 = function(r) {
  return function(s1) {
    return function(s2) {
      return s2.replace(r, s1);
    };
  };
};

// output/Data.String.Regex.Flags/index.js
var noFlags = {
  global: false,
  ignoreCase: false,
  multiline: false,
  dotAll: false,
  sticky: false,
  unicode: false
};
var global = {
  global: true,
  ignoreCase: false,
  multiline: false,
  dotAll: false,
  sticky: false,
  unicode: false
};

// output/Data.String.Regex/index.js
var renderFlags = function(v) {
  return function() {
    if (v.global) {
      return "g";
    }
    ;
    return "";
  }() + (function() {
    if (v.ignoreCase) {
      return "i";
    }
    ;
    return "";
  }() + (function() {
    if (v.multiline) {
      return "m";
    }
    ;
    return "";
  }() + (function() {
    if (v.dotAll) {
      return "s";
    }
    ;
    return "";
  }() + (function() {
    if (v.sticky) {
      return "y";
    }
    ;
    return "";
  }() + function() {
    if (v.unicode) {
      return "u";
    }
    ;
    return "";
  }()))));
};
var regex = function(s) {
  return function(f) {
    return regexImpl(Left.create)(Right.create)(s)(renderFlags(f));
  };
};

// output/Partial.Unsafe/foreign.js
var _unsafePartial = function(f) {
  return f();
};

// output/Partial/foreign.js
var _crashWith = function(msg) {
  throw new Error(msg);
};

// output/Partial/index.js
var crashWith = function() {
  return _crashWith;
};

// output/Partial.Unsafe/index.js
var crashWith2 = /* @__PURE__ */ crashWith();
var unsafePartial = _unsafePartial;
var unsafeCrashWith = function(msg) {
  return unsafePartial(function() {
    return crashWith2(msg);
  });
};

// output/Data.String.Regex.Unsafe/index.js
var identity5 = /* @__PURE__ */ identity(categoryFn);
var unsafeRegex = function(s) {
  return function(f) {
    return either(unsafeCrashWith)(identity5)(regex(s)(f));
  };
};

// output/Effect.Aff/foreign.js
var Aff = function() {
  var EMPTY = {};
  var PURE = "Pure";
  var THROW = "Throw";
  var CATCH = "Catch";
  var SYNC = "Sync";
  var ASYNC = "Async";
  var BIND = "Bind";
  var BRACKET = "Bracket";
  var FORK = "Fork";
  var SEQ = "Sequential";
  var MAP = "Map";
  var APPLY = "Apply";
  var ALT = "Alt";
  var CONS = "Cons";
  var RESUME = "Resume";
  var RELEASE = "Release";
  var FINALIZER = "Finalizer";
  var FINALIZED = "Finalized";
  var FORKED = "Forked";
  var FIBER = "Fiber";
  var THUNK = "Thunk";
  function Aff2(tag, _1, _2, _3) {
    this.tag = tag;
    this._1 = _1;
    this._2 = _2;
    this._3 = _3;
  }
  function AffCtr(tag) {
    var fn = function(_1, _2, _3) {
      return new Aff2(tag, _1, _2, _3);
    };
    fn.tag = tag;
    return fn;
  }
  function nonCanceler2(error3) {
    return new Aff2(PURE, void 0);
  }
  function runEff(eff) {
    try {
      eff();
    } catch (error3) {
      setTimeout(function() {
        throw error3;
      }, 0);
    }
  }
  function runSync(left, right, eff) {
    try {
      return right(eff());
    } catch (error3) {
      return left(error3);
    }
  }
  function runAsync(left, eff, k) {
    try {
      return eff(k)();
    } catch (error3) {
      k(left(error3))();
      return nonCanceler2;
    }
  }
  var Scheduler = function() {
    var limit = 1024;
    var size5 = 0;
    var ix = 0;
    var queue = new Array(limit);
    var draining = false;
    function drain() {
      var thunk;
      draining = true;
      while (size5 !== 0) {
        size5--;
        thunk = queue[ix];
        queue[ix] = void 0;
        ix = (ix + 1) % limit;
        thunk();
      }
      draining = false;
    }
    return {
      isDraining: function() {
        return draining;
      },
      enqueue: function(cb) {
        var i, tmp;
        if (size5 === limit) {
          tmp = draining;
          drain();
          draining = tmp;
        }
        queue[(ix + size5) % limit] = cb;
        size5++;
        if (!draining) {
          drain();
        }
      }
    };
  }();
  function Supervisor(util) {
    var fibers = {};
    var fiberId = 0;
    var count = 0;
    return {
      register: function(fiber) {
        var fid = fiberId++;
        fiber.onComplete({
          rethrow: true,
          handler: function(result) {
            return function() {
              count--;
              delete fibers[fid];
            };
          }
        })();
        fibers[fid] = fiber;
        count++;
      },
      isEmpty: function() {
        return count === 0;
      },
      killAll: function(killError, cb) {
        return function() {
          if (count === 0) {
            return cb();
          }
          var killCount = 0;
          var kills = {};
          function kill(fid) {
            kills[fid] = fibers[fid].kill(killError, function(result) {
              return function() {
                delete kills[fid];
                killCount--;
                if (util.isLeft(result) && util.fromLeft(result)) {
                  setTimeout(function() {
                    throw util.fromLeft(result);
                  }, 0);
                }
                if (killCount === 0) {
                  cb();
                }
              };
            })();
          }
          for (var k in fibers) {
            if (fibers.hasOwnProperty(k)) {
              killCount++;
              kill(k);
            }
          }
          fibers = {};
          fiberId = 0;
          count = 0;
          return function(error3) {
            return new Aff2(SYNC, function() {
              for (var k2 in kills) {
                if (kills.hasOwnProperty(k2)) {
                  kills[k2]();
                }
              }
            });
          };
        };
      }
    };
  }
  var SUSPENDED = 0;
  var CONTINUE = 1;
  var STEP_BIND = 2;
  var STEP_RESULT = 3;
  var PENDING = 4;
  var RETURN = 5;
  var COMPLETED = 6;
  function Fiber(util, supervisor, aff) {
    var runTick = 0;
    var status = SUSPENDED;
    var step = aff;
    var fail2 = null;
    var interrupt = null;
    var bhead = null;
    var btail = null;
    var attempts = null;
    var bracketCount = 0;
    var joinId = 0;
    var joins = null;
    var rethrow = true;
    function run3(localRunTick) {
      var tmp, result, attempt;
      while (true) {
        tmp = null;
        result = null;
        attempt = null;
        switch (status) {
          case STEP_BIND:
            status = CONTINUE;
            try {
              step = bhead(step);
              if (btail === null) {
                bhead = null;
              } else {
                bhead = btail._1;
                btail = btail._2;
              }
            } catch (e) {
              status = RETURN;
              fail2 = util.left(e);
              step = null;
            }
            break;
          case STEP_RESULT:
            if (util.isLeft(step)) {
              status = RETURN;
              fail2 = step;
              step = null;
            } else if (bhead === null) {
              status = RETURN;
            } else {
              status = STEP_BIND;
              step = util.fromRight(step);
            }
            break;
          case CONTINUE:
            switch (step.tag) {
              case BIND:
                if (bhead) {
                  btail = new Aff2(CONS, bhead, btail);
                }
                bhead = step._2;
                status = CONTINUE;
                step = step._1;
                break;
              case PURE:
                if (bhead === null) {
                  status = RETURN;
                  step = util.right(step._1);
                } else {
                  status = STEP_BIND;
                  step = step._1;
                }
                break;
              case SYNC:
                status = STEP_RESULT;
                step = runSync(util.left, util.right, step._1);
                break;
              case ASYNC:
                status = PENDING;
                step = runAsync(util.left, step._1, function(result2) {
                  return function() {
                    if (runTick !== localRunTick) {
                      return;
                    }
                    runTick++;
                    Scheduler.enqueue(function() {
                      if (runTick !== localRunTick + 1) {
                        return;
                      }
                      status = STEP_RESULT;
                      step = result2;
                      run3(runTick);
                    });
                  };
                });
                return;
              case THROW:
                status = RETURN;
                fail2 = util.left(step._1);
                step = null;
                break;
              case CATCH:
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case BRACKET:
                bracketCount++;
                if (bhead === null) {
                  attempts = new Aff2(CONS, step, attempts, interrupt);
                } else {
                  attempts = new Aff2(CONS, step, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                }
                bhead = null;
                btail = null;
                status = CONTINUE;
                step = step._1;
                break;
              case FORK:
                status = STEP_RESULT;
                tmp = Fiber(util, supervisor, step._2);
                if (supervisor) {
                  supervisor.register(tmp);
                }
                if (step._1) {
                  tmp.run();
                }
                step = util.right(tmp);
                break;
              case SEQ:
                status = CONTINUE;
                step = sequential2(util, supervisor, step._1);
                break;
            }
            break;
          case RETURN:
            bhead = null;
            btail = null;
            if (attempts === null) {
              status = COMPLETED;
              step = interrupt || fail2 || step;
            } else {
              tmp = attempts._3;
              attempt = attempts._1;
              attempts = attempts._2;
              switch (attempt.tag) {
                case CATCH:
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    status = RETURN;
                  } else if (fail2) {
                    status = CONTINUE;
                    step = attempt._2(util.fromLeft(fail2));
                    fail2 = null;
                  }
                  break;
                case RESUME:
                  if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                    status = RETURN;
                  } else {
                    bhead = attempt._1;
                    btail = attempt._2;
                    status = STEP_BIND;
                    step = util.fromRight(step);
                  }
                  break;
                case BRACKET:
                  bracketCount--;
                  if (fail2 === null) {
                    result = util.fromRight(step);
                    attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                    if (interrupt === tmp || bracketCount > 0) {
                      status = CONTINUE;
                      step = attempt._3(result);
                    }
                  }
                  break;
                case RELEASE:
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status = CONTINUE;
                  if (interrupt && interrupt !== tmp && bracketCount === 0) {
                    step = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                  } else if (fail2) {
                    step = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                  } else {
                    step = attempt._1.completed(util.fromRight(step))(attempt._2);
                  }
                  fail2 = null;
                  bracketCount++;
                  break;
                case FINALIZER:
                  bracketCount++;
                  attempts = new Aff2(CONS, new Aff2(FINALIZED, step, fail2), attempts, interrupt);
                  status = CONTINUE;
                  step = attempt._1;
                  break;
                case FINALIZED:
                  bracketCount--;
                  status = RETURN;
                  step = attempt._1;
                  fail2 = attempt._2;
                  break;
              }
            }
            break;
          case COMPLETED:
            for (var k in joins) {
              if (joins.hasOwnProperty(k)) {
                rethrow = rethrow && joins[k].rethrow;
                runEff(joins[k].handler(step));
              }
            }
            joins = null;
            if (interrupt && fail2) {
              setTimeout(function() {
                throw util.fromLeft(fail2);
              }, 0);
            } else if (util.isLeft(step) && rethrow) {
              setTimeout(function() {
                if (rethrow) {
                  throw util.fromLeft(step);
                }
              }, 0);
            }
            return;
          case SUSPENDED:
            status = CONTINUE;
            break;
          case PENDING:
            return;
        }
      }
    }
    function onComplete(join3) {
      return function() {
        if (status === COMPLETED) {
          rethrow = rethrow && join3.rethrow;
          join3.handler(step)();
          return function() {
          };
        }
        var jid = joinId++;
        joins = joins || {};
        joins[jid] = join3;
        return function() {
          if (joins !== null) {
            delete joins[jid];
          }
        };
      };
    }
    function kill(error3, cb) {
      return function() {
        if (status === COMPLETED) {
          cb(util.right(void 0))();
          return function() {
          };
        }
        var canceler = onComplete({
          rethrow: false,
          handler: function() {
            return cb(util.right(void 0));
          }
        })();
        switch (status) {
          case SUSPENDED:
            interrupt = util.left(error3);
            status = COMPLETED;
            step = interrupt;
            run3(runTick);
            break;
          case PENDING:
            if (interrupt === null) {
              interrupt = util.left(error3);
            }
            if (bracketCount === 0) {
              if (status === PENDING) {
                attempts = new Aff2(CONS, new Aff2(FINALIZER, step(error3)), attempts, interrupt);
              }
              status = RETURN;
              step = null;
              fail2 = null;
              run3(++runTick);
            }
            break;
          default:
            if (interrupt === null) {
              interrupt = util.left(error3);
            }
            if (bracketCount === 0) {
              status = RETURN;
              step = null;
              fail2 = null;
            }
        }
        return canceler;
      };
    }
    function join2(cb) {
      return function() {
        var canceler = onComplete({
          rethrow: false,
          handler: cb
        })();
        if (status === SUSPENDED) {
          run3(runTick);
        }
        return canceler;
      };
    }
    return {
      kill,
      join: join2,
      onComplete,
      isSuspended: function() {
        return status === SUSPENDED;
      },
      run: function() {
        if (status === SUSPENDED) {
          if (!Scheduler.isDraining()) {
            Scheduler.enqueue(function() {
              run3(runTick);
            });
          } else {
            run3(runTick);
          }
        }
      }
    };
  }
  function runPar(util, supervisor, par, cb) {
    var fiberId = 0;
    var fibers = {};
    var killId = 0;
    var kills = {};
    var early = new Error("[ParAff] Early exit");
    var interrupt = null;
    var root = EMPTY;
    function kill(error3, par2, cb2) {
      var step = par2;
      var head2 = null;
      var tail2 = null;
      var count = 0;
      var kills2 = {};
      var tmp, kid;
      loop:
        while (true) {
          tmp = null;
          switch (step.tag) {
            case FORKED:
              if (step._3 === EMPTY) {
                tmp = fibers[step._1];
                kills2[count++] = tmp.kill(error3, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head2 === null) {
                break loop;
              }
              step = head2._2;
              if (tail2 === null) {
                head2 = null;
              } else {
                head2 = tail2._1;
                tail2 = tail2._2;
              }
              break;
            case MAP:
              step = step._2;
              break;
            case APPLY:
            case ALT:
              if (head2) {
                tail2 = new Aff2(CONS, head2, tail2);
              }
              head2 = step;
              step = step._1;
              break;
          }
        }
      if (count === 0) {
        cb2(util.right(void 0))();
      } else {
        kid = 0;
        tmp = count;
        for (; kid < tmp; kid++) {
          kills2[kid] = kills2[kid]();
        }
      }
      return kills2;
    }
    function join2(result, head2, tail2) {
      var fail2, step, lhs, rhs, tmp, kid;
      if (util.isLeft(result)) {
        fail2 = result;
        step = null;
      } else {
        step = result;
        fail2 = null;
      }
      loop:
        while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head2 === null) {
            cb(fail2 || step)();
            return;
          }
          if (head2._3 !== EMPTY) {
            return;
          }
          switch (head2.tag) {
            case MAP:
              if (fail2 === null) {
                head2._3 = util.right(head2._1(util.fromRight(step)));
                step = head2._3;
              } else {
                head2._3 = fail2;
              }
              break;
            case APPLY:
              lhs = head2._1._3;
              rhs = head2._2._3;
              if (fail2) {
                head2._3 = fail2;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, fail2 === lhs ? head2._2 : head2._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join2(fail2, null, null);
                    } else {
                      join2(fail2, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head2._3 = step;
              }
              break;
            case ALT:
              lhs = head2._1._3;
              rhs = head2._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail2 = step === lhs ? rhs : lhs;
                step = null;
                head2._3 = fail2;
              } else {
                head2._3 = step;
                tmp = true;
                kid = killId++;
                kills[kid] = kill(early, step === lhs ? head2._2 : head2._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join2(step, null, null);
                    } else {
                      join2(step, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail2 === null) {
            head2 = null;
          } else {
            head2 = tail2._1;
            tail2 = tail2._2;
          }
        }
    }
    function resolve2(fiber) {
      return function(result) {
        return function() {
          delete fibers[fiber._1];
          fiber._3 = result;
          join2(result, fiber._2._1, fiber._2._2);
        };
      };
    }
    function run3() {
      var status = CONTINUE;
      var step = par;
      var head2 = null;
      var tail2 = null;
      var tmp, fid;
      loop:
        while (true) {
          tmp = null;
          fid = null;
          switch (status) {
            case CONTINUE:
              switch (step.tag) {
                case MAP:
                  if (head2) {
                    tail2 = new Aff2(CONS, head2, tail2);
                  }
                  head2 = new Aff2(MAP, step._1, EMPTY, EMPTY);
                  step = step._2;
                  break;
                case APPLY:
                  if (head2) {
                    tail2 = new Aff2(CONS, head2, tail2);
                  }
                  head2 = new Aff2(APPLY, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                case ALT:
                  if (head2) {
                    tail2 = new Aff2(CONS, head2, tail2);
                  }
                  head2 = new Aff2(ALT, EMPTY, step._2, EMPTY);
                  step = step._1;
                  break;
                default:
                  fid = fiberId++;
                  status = RETURN;
                  tmp = step;
                  step = new Aff2(FORKED, fid, new Aff2(CONS, head2, tail2), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve2(step)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head2 === null) {
                break loop;
              }
              if (head2._1 === EMPTY) {
                head2._1 = step;
                status = CONTINUE;
                step = head2._2;
                head2._2 = EMPTY;
              } else {
                head2._2 = step;
                step = head2;
                if (tail2 === null) {
                  head2 = null;
                } else {
                  head2 = tail2._1;
                  tail2 = tail2._2;
                }
              }
          }
        }
      root = step;
      for (fid = 0; fid < fiberId; fid++) {
        fibers[fid].run();
      }
    }
    function cancel(error3, cb2) {
      interrupt = util.left(error3);
      var innerKills;
      for (var kid in kills) {
        if (kills.hasOwnProperty(kid)) {
          innerKills = kills[kid];
          for (kid in innerKills) {
            if (innerKills.hasOwnProperty(kid)) {
              innerKills[kid]();
            }
          }
        }
      }
      kills = null;
      var newKills = kill(error3, root, cb2);
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            for (var kid2 in newKills) {
              if (newKills.hasOwnProperty(kid2)) {
                newKills[kid2]();
              }
            }
            return nonCanceler2;
          };
        });
      };
    }
    run3();
    return function(killError) {
      return new Aff2(ASYNC, function(killCb) {
        return function() {
          return cancel(killError, killCb);
        };
      });
    };
  }
  function sequential2(util, supervisor, par) {
    return new Aff2(ASYNC, function(cb) {
      return function() {
        return runPar(util, supervisor, par, cb);
      };
    });
  }
  Aff2.EMPTY = EMPTY;
  Aff2.Pure = AffCtr(PURE);
  Aff2.Throw = AffCtr(THROW);
  Aff2.Catch = AffCtr(CATCH);
  Aff2.Sync = AffCtr(SYNC);
  Aff2.Async = AffCtr(ASYNC);
  Aff2.Bind = AffCtr(BIND);
  Aff2.Bracket = AffCtr(BRACKET);
  Aff2.Fork = AffCtr(FORK);
  Aff2.Seq = AffCtr(SEQ);
  Aff2.ParMap = AffCtr(MAP);
  Aff2.ParApply = AffCtr(APPLY);
  Aff2.ParAlt = AffCtr(ALT);
  Aff2.Fiber = Fiber;
  Aff2.Supervisor = Supervisor;
  Aff2.Scheduler = Scheduler;
  Aff2.nonCanceler = nonCanceler2;
  return Aff2;
}();
var _pure = Aff.Pure;
var _throwError = Aff.Throw;
function _catchError(aff) {
  return function(k) {
    return Aff.Catch(aff, k);
  };
}
function _map(f) {
  return function(aff) {
    if (aff.tag === Aff.Pure.tag) {
      return Aff.Pure(f(aff._1));
    } else {
      return Aff.Bind(aff, function(value) {
        return Aff.Pure(f(value));
      });
    }
  };
}
function _bind(aff) {
  return function(k) {
    return Aff.Bind(aff, k);
  };
}
var _liftEffect = Aff.Sync;
function _parAffMap(f) {
  return function(aff) {
    return Aff.ParMap(f, aff);
  };
}
function _parAffApply(aff1) {
  return function(aff2) {
    return Aff.ParApply(aff1, aff2);
  };
}
var makeAff = Aff.Async;
function _makeFiber(util, aff) {
  return function() {
    return Aff.Fiber(util, null, aff);
  };
}
var _delay = function() {
  function setDelay(n, k) {
    if (n === 0 && typeof setImmediate !== "undefined") {
      return setImmediate(k);
    } else {
      return setTimeout(k, n);
    }
  }
  function clearDelay(n, t) {
    if (n === 0 && typeof clearImmediate !== "undefined") {
      return clearImmediate(t);
    } else {
      return clearTimeout(t);
    }
  }
  return function(right, ms) {
    return Aff.Async(function(cb) {
      return function() {
        var timer = setDelay(ms, cb(right()));
        return function() {
          return Aff.Sync(function() {
            return right(clearDelay(ms, timer));
          });
        };
      };
    });
  };
}();
var _sequential = Aff.Seq;

// output/Effect.Aff/index.js
var $runtime_lazy2 = function(name2, moduleName, init3) {
  var state2 = 0;
  var val;
  return function(lineNumber) {
    if (state2 === 2)
      return val;
    if (state2 === 1)
      throw new ReferenceError(name2 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
    state2 = 1;
    val = init3();
    state2 = 2;
    return val;
  };
};
var $$void2 = /* @__PURE__ */ $$void(functorEffect);
var functorParAff = {
  map: _parAffMap
};
var functorAff = {
  map: _map
};
var ffiUtil = /* @__PURE__ */ function() {
  var unsafeFromRight = function(v) {
    if (v instanceof Right) {
      return v.value0;
    }
    ;
    if (v instanceof Left) {
      return unsafeCrashWith("unsafeFromRight: Left");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
  };
  var unsafeFromLeft = function(v) {
    if (v instanceof Left) {
      return v.value0;
    }
    ;
    if (v instanceof Right) {
      return unsafeCrashWith("unsafeFromLeft: Right");
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
  };
  var isLeft = function(v) {
    if (v instanceof Left) {
      return true;
    }
    ;
    if (v instanceof Right) {
      return false;
    }
    ;
    throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
  };
  return {
    isLeft,
    fromLeft: unsafeFromLeft,
    fromRight: unsafeFromRight,
    left: Left.create,
    right: Right.create
  };
}();
var makeFiber = function(aff) {
  return _makeFiber(ffiUtil, aff);
};
var launchAff = function(aff) {
  return function __do() {
    var fiber = makeFiber(aff)();
    fiber.run();
    return fiber;
  };
};
var applyParAff = {
  apply: _parAffApply,
  Functor0: function() {
    return functorParAff;
  }
};
var monadAff = {
  Applicative0: function() {
    return applicativeAff;
  },
  Bind1: function() {
    return bindAff;
  }
};
var bindAff = {
  bind: _bind,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var applicativeAff = {
  pure: _pure,
  Apply0: function() {
    return $lazy_applyAff(0);
  }
};
var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
  return {
    apply: ap(monadAff),
    Functor0: function() {
      return functorAff;
    }
  };
});
var pure2 = /* @__PURE__ */ pure(applicativeAff);
var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindAff);
var monadEffectAff = {
  liftEffect: _liftEffect,
  Monad0: function() {
    return monadAff;
  }
};
var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
var monadThrowAff = {
  throwError: _throwError,
  Monad0: function() {
    return monadAff;
  }
};
var monadErrorAff = {
  catchError: _catchError,
  MonadThrow0: function() {
    return monadThrowAff;
  }
};
var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
var runAff = function(k) {
  return function(aff) {
    return launchAff(bindFlipped2(function($80) {
      return liftEffect2(k($80));
    })($$try2(aff)));
  };
};
var runAff_ = function(k) {
  return function(aff) {
    return $$void2(runAff(k)(aff));
  };
};
var parallelAff = {
  parallel: unsafeCoerce2,
  sequential: _sequential,
  Monad0: function() {
    return monadAff;
  },
  Applicative1: function() {
    return $lazy_applicativeParAff(0);
  }
};
var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy2("applicativeParAff", "Effect.Aff", function() {
  return {
    pure: function() {
      var $82 = parallel(parallelAff);
      return function($83) {
        return $82(pure2($83));
      };
    }(),
    Apply0: function() {
      return applyParAff;
    }
  };
});
var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure2(unit));

// output/Effect.Console/foreign.js
var log2 = function(s) {
  return function() {
    console.log(s);
  };
};
var error2 = function(s) {
  return function() {
    console.error(s);
  };
};

// output/Foreign.Object/foreign.js
function runST(f) {
  return f();
}
function _mapWithKey(m0, f) {
  var m = {};
  for (var k in m0) {
    if (hasOwnProperty.call(m0, k)) {
      m[k] = f(k)(m0[k]);
    }
  }
  return m;
}
function toArrayWithKey(f) {
  return function(m) {
    var r = [];
    for (var k in m) {
      if (hasOwnProperty.call(m, k)) {
        r.push(f(k)(m[k]));
      }
    }
    return r;
  };
}
var keys = Object.keys || toArrayWithKey(function(k) {
  return function() {
    return k;
  };
});

// output/Foreign.Object.ST/foreign.js
var newImpl = function() {
  return {};
};
function poke2(k) {
  return function(v) {
    return function(m) {
      return function() {
        m[k] = v;
        return m;
      };
    };
  };
}

// output/Foreign.Object/index.js
var $$void3 = /* @__PURE__ */ $$void(functorST);
var mapWithKey = function(f) {
  return function(m) {
    return _mapWithKey(m, f);
  };
};
var fromFoldable2 = function(dictFoldable) {
  var fromFoldable1 = fromFoldable(dictFoldable);
  return function(l) {
    return runST(function __do() {
      var s = newImpl();
      foreach(fromFoldable1(l))(function(v) {
        return $$void3(poke2(v.value0)(v.value1)(s));
      })();
      return s;
    });
  };
};

// output/Node.Buffer.Class/index.js
var toString = function(dict) {
  return dict.toString;
};

// output/Node.Buffer.Internal/foreign.js
function copyAll(a) {
  return () => {
    return Buffer.from(a);
  };
}
function writeInternal(ty) {
  return (value) => {
    return (offset) => {
      return (buf) => {
        return () => {
          buf["write" + ty](value, offset);
        };
      };
    };
  };
}
function writeStringInternal(encoding) {
  return (offset) => {
    return (length5) => {
      return (value) => {
        return (buff) => {
          return () => {
            return buff.write(value, offset, length5, encoding);
          };
        };
      };
    };
  };
}
function setAtOffset(value) {
  return (offset) => {
    return (buff) => {
      return () => {
        buff[offset] = value;
      };
    };
  };
}
function copy(srcStart) {
  return (srcEnd) => {
    return (src) => {
      return (targStart) => {
        return (targ) => {
          return () => {
            return src.copy(targ, targStart, srcStart, srcEnd);
          };
        };
      };
    };
  };
}
function fill(octet) {
  return (start) => {
    return (end) => {
      return (buf) => {
        return () => {
          buf.fill(octet, start, end);
        };
      };
    };
  };
}

// output/Node.Buffer.Immutable/foreign.js
function create(size5) {
  return Buffer.alloc(size5);
}
function fromArray(octets) {
  return Buffer.from(octets);
}
function size2(buff) {
  return buff.length;
}
function toArray(buff) {
  var json = buff.toJSON();
  return json.data || json;
}
function toArrayBuffer(buff) {
  return buff.buffer.slice(buff.byteOffset, buff.byteOffset + buff.byteLength);
}
function fromArrayBuffer(ab) {
  return Buffer.from(ab);
}
function fromStringImpl2(str) {
  return (encoding) => {
    return Buffer.from(str, encoding);
  };
}
function readImpl(ty) {
  return (offset) => {
    return (buf) => {
      return buf["read" + ty](offset);
    };
  };
}
function readStringImpl(enc) {
  return (start) => {
    return (end) => {
      return (buff) => {
        return buff.toString(enc, start, end);
      };
    };
  };
}
function getAtOffsetImpl(just) {
  return (nothing) => {
    return (offset) => {
      return (buff) => {
        var octet = buff[offset];
        return octet == null ? nothing : just(octet);
      };
    };
  };
}
function toStringImpl(enc) {
  return (buff) => {
    return buff.toString(enc);
  };
}
function slice3(start) {
  return (end) => {
    return (buff) => {
      return buff.slice(start, end);
    };
  };
}
function concat2(buffs) {
  return Buffer.concat(buffs);
}
function concatToLength(buffs) {
  return (totalLength) => {
    return Buffer.concat(buffs, totalLength);
  };
}

// output/Node.Buffer.Types/index.js
var UInt8 = /* @__PURE__ */ function() {
  function UInt82() {
  }
  ;
  UInt82.value = new UInt82();
  return UInt82;
}();
var UInt16LE = /* @__PURE__ */ function() {
  function UInt16LE2() {
  }
  ;
  UInt16LE2.value = new UInt16LE2();
  return UInt16LE2;
}();
var UInt16BE = /* @__PURE__ */ function() {
  function UInt16BE2() {
  }
  ;
  UInt16BE2.value = new UInt16BE2();
  return UInt16BE2;
}();
var UInt32LE = /* @__PURE__ */ function() {
  function UInt32LE2() {
  }
  ;
  UInt32LE2.value = new UInt32LE2();
  return UInt32LE2;
}();
var UInt32BE = /* @__PURE__ */ function() {
  function UInt32BE2() {
  }
  ;
  UInt32BE2.value = new UInt32BE2();
  return UInt32BE2;
}();
var Int8 = /* @__PURE__ */ function() {
  function Int82() {
  }
  ;
  Int82.value = new Int82();
  return Int82;
}();
var Int16LE = /* @__PURE__ */ function() {
  function Int16LE2() {
  }
  ;
  Int16LE2.value = new Int16LE2();
  return Int16LE2;
}();
var Int16BE = /* @__PURE__ */ function() {
  function Int16BE2() {
  }
  ;
  Int16BE2.value = new Int16BE2();
  return Int16BE2;
}();
var Int32LE = /* @__PURE__ */ function() {
  function Int32LE2() {
  }
  ;
  Int32LE2.value = new Int32LE2();
  return Int32LE2;
}();
var Int32BE = /* @__PURE__ */ function() {
  function Int32BE2() {
  }
  ;
  Int32BE2.value = new Int32BE2();
  return Int32BE2;
}();
var FloatLE = /* @__PURE__ */ function() {
  function FloatLE2() {
  }
  ;
  FloatLE2.value = new FloatLE2();
  return FloatLE2;
}();
var FloatBE = /* @__PURE__ */ function() {
  function FloatBE2() {
  }
  ;
  FloatBE2.value = new FloatBE2();
  return FloatBE2;
}();
var DoubleLE = /* @__PURE__ */ function() {
  function DoubleLE2() {
  }
  ;
  DoubleLE2.value = new DoubleLE2();
  return DoubleLE2;
}();
var DoubleBE = /* @__PURE__ */ function() {
  function DoubleBE2() {
  }
  ;
  DoubleBE2.value = new DoubleBE2();
  return DoubleBE2;
}();
var showBufferValueType = {
  show: function(v) {
    if (v instanceof UInt8) {
      return "UInt8";
    }
    ;
    if (v instanceof UInt16LE) {
      return "UInt16LE";
    }
    ;
    if (v instanceof UInt16BE) {
      return "UInt16BE";
    }
    ;
    if (v instanceof UInt32LE) {
      return "UInt32LE";
    }
    ;
    if (v instanceof UInt32BE) {
      return "UInt32BE";
    }
    ;
    if (v instanceof Int8) {
      return "Int8";
    }
    ;
    if (v instanceof Int16LE) {
      return "Int16LE";
    }
    ;
    if (v instanceof Int16BE) {
      return "Int16BE";
    }
    ;
    if (v instanceof Int32LE) {
      return "Int32LE";
    }
    ;
    if (v instanceof Int32BE) {
      return "Int32BE";
    }
    ;
    if (v instanceof FloatLE) {
      return "FloatLE";
    }
    ;
    if (v instanceof FloatBE) {
      return "FloatBE";
    }
    ;
    if (v instanceof DoubleLE) {
      return "DoubleLE";
    }
    ;
    if (v instanceof DoubleBE) {
      return "DoubleBE";
    }
    ;
    throw new Error("Failed pattern match at Node.Buffer.Types (line 33, column 1 - line 47, column 29): " + [v.constructor.name]);
  }
};

// output/Node.Encoding/index.js
var ASCII = /* @__PURE__ */ function() {
  function ASCII2() {
  }
  ;
  ASCII2.value = new ASCII2();
  return ASCII2;
}();
var UTF8 = /* @__PURE__ */ function() {
  function UTF82() {
  }
  ;
  UTF82.value = new UTF82();
  return UTF82;
}();
var UTF16LE = /* @__PURE__ */ function() {
  function UTF16LE2() {
  }
  ;
  UTF16LE2.value = new UTF16LE2();
  return UTF16LE2;
}();
var UCS2 = /* @__PURE__ */ function() {
  function UCS22() {
  }
  ;
  UCS22.value = new UCS22();
  return UCS22;
}();
var Base64 = /* @__PURE__ */ function() {
  function Base642() {
  }
  ;
  Base642.value = new Base642();
  return Base642;
}();
var Latin1 = /* @__PURE__ */ function() {
  function Latin12() {
  }
  ;
  Latin12.value = new Latin12();
  return Latin12;
}();
var Binary = /* @__PURE__ */ function() {
  function Binary2() {
  }
  ;
  Binary2.value = new Binary2();
  return Binary2;
}();
var Hex = /* @__PURE__ */ function() {
  function Hex2() {
  }
  ;
  Hex2.value = new Hex2();
  return Hex2;
}();
var showEncoding = {
  show: function(v) {
    if (v instanceof ASCII) {
      return "ASCII";
    }
    ;
    if (v instanceof UTF8) {
      return "UTF8";
    }
    ;
    if (v instanceof UTF16LE) {
      return "UTF16LE";
    }
    ;
    if (v instanceof UCS2) {
      return "UCS2";
    }
    ;
    if (v instanceof Base64) {
      return "Base64";
    }
    ;
    if (v instanceof Latin1) {
      return "Latin1";
    }
    ;
    if (v instanceof Binary) {
      return "Binary";
    }
    ;
    if (v instanceof Hex) {
      return "Hex";
    }
    ;
    throw new Error("Failed pattern match at Node.Encoding (line 19, column 1 - line 27, column 23): " + [v.constructor.name]);
  }
};
var encodingToNode = function(v) {
  if (v instanceof ASCII) {
    return "ascii";
  }
  ;
  if (v instanceof UTF8) {
    return "utf8";
  }
  ;
  if (v instanceof UTF16LE) {
    return "utf16le";
  }
  ;
  if (v instanceof UCS2) {
    return "ucs2";
  }
  ;
  if (v instanceof Base64) {
    return "base64";
  }
  ;
  if (v instanceof Latin1) {
    return "latin1";
  }
  ;
  if (v instanceof Binary) {
    return "binary";
  }
  ;
  if (v instanceof Hex) {
    return "hex";
  }
  ;
  throw new Error("Failed pattern match at Node.Encoding (line 31, column 1 - line 31, column 37): " + [v.constructor.name]);
};

// output/Node.Buffer.Immutable/index.js
var toString2 = function($7) {
  return toStringImpl(encodingToNode($7));
};
var readString = function($8) {
  return readStringImpl(encodingToNode($8));
};
var read3 = /* @__PURE__ */ function() {
  var $9 = show(showBufferValueType);
  return function($10) {
    return readImpl($9($10));
  };
}();
var getAtOffset = /* @__PURE__ */ function() {
  return getAtOffsetImpl(Just.create)(Nothing.value);
}();
var fromString = function(str) {
  var $11 = fromStringImpl2(str);
  return function($12) {
    return $11(encodingToNode($12));
  };
};
var concat$prime = concatToLength;

// output/Node.Buffer.Internal/index.js
var show2 = /* @__PURE__ */ show(showBufferValueType);
var writeString = function(dictMonad) {
  return function($43) {
    return writeStringInternal(encodingToNode($43));
  };
};
var write3 = function(dictMonad) {
  return function($44) {
    return writeInternal(show2($44));
  };
};
var unsafeThaw2 = function(dictMonad) {
  var $45 = pure(dictMonad.Applicative0());
  return function($46) {
    return $45($46);
  };
};
var usingToImmutable = function(dictMonad) {
  var unsafeThaw1 = unsafeThaw2(dictMonad);
  return function(f) {
    return function(x) {
      return unsafeThaw1(f(x));
    };
  };
};
var unsafeFreeze2 = function(dictMonad) {
  var $47 = pure(dictMonad.Applicative0());
  return function($48) {
    return $47($48);
  };
};
var usingFromImmutable = function(dictMonad) {
  var map5 = map(dictMonad.Bind1().Apply0().Functor0());
  var unsafeFreeze1 = unsafeFreeze2(dictMonad);
  return function(f) {
    return function(buf) {
      return map5(f)(unsafeFreeze1(buf));
    };
  };
};
var toString3 = function(dictMonad) {
  var usingFromImmutable1 = usingFromImmutable(dictMonad);
  return function(m) {
    return usingFromImmutable1(toString2(m));
  };
};
var toArrayBuffer2 = function(dictMonad) {
  return usingFromImmutable(dictMonad)(toArrayBuffer);
};
var toArray2 = function(dictMonad) {
  return usingFromImmutable(dictMonad)(toArray);
};
var slice4 = slice3;
var size3 = function(dictMonad) {
  return usingFromImmutable(dictMonad)(size2);
};
var readString2 = function(dictMonad) {
  var usingFromImmutable1 = usingFromImmutable(dictMonad);
  return function(m) {
    return function(o) {
      return function(o$prime) {
        return usingFromImmutable1(readString(m)(o)(o$prime));
      };
    };
  };
};
var read4 = function(dictMonad) {
  var usingFromImmutable1 = usingFromImmutable(dictMonad);
  return function(t) {
    return function(o) {
      return usingFromImmutable1(read3(t)(o));
    };
  };
};
var getAtOffset2 = function(dictMonad) {
  var usingFromImmutable1 = usingFromImmutable(dictMonad);
  return function(o) {
    return usingFromImmutable1(getAtOffset(o));
  };
};
var fromString2 = function(dictMonad) {
  var usingToImmutable1 = usingToImmutable(dictMonad);
  return function(s) {
    return usingToImmutable1(fromString(s));
  };
};
var fromArrayBuffer2 = function(dictMonad) {
  return usingToImmutable(dictMonad)(fromArrayBuffer);
};
var fromArray2 = function(dictMonad) {
  return usingToImmutable(dictMonad)(fromArray);
};
var create2 = function(dictMonad) {
  return usingToImmutable(dictMonad)(create);
};
var concat$prime2 = function(dictMonad) {
  return function(arrs) {
    return function(n) {
      return function(v) {
        return concat$prime(arrs)(n);
      };
    };
  };
};
var concat3 = function(arrs) {
  return function(v) {
    return concat2(arrs);
  };
};

// output/Node.Buffer/index.js
var mutableBufferEffect = {
  create: /* @__PURE__ */ create2(monadEffect),
  freeze: copyAll,
  unsafeFreeze: /* @__PURE__ */ unsafeFreeze2(monadEffect),
  thaw: copyAll,
  unsafeThaw: /* @__PURE__ */ unsafeThaw2(monadEffect),
  fromArray: /* @__PURE__ */ fromArray2(monadEffect),
  fromString: /* @__PURE__ */ fromString2(monadEffect),
  fromArrayBuffer: /* @__PURE__ */ fromArrayBuffer2(monadEffect),
  toArrayBuffer: /* @__PURE__ */ toArrayBuffer2(monadEffect),
  read: /* @__PURE__ */ read4(monadEffect),
  readString: /* @__PURE__ */ readString2(monadEffect),
  toString: /* @__PURE__ */ toString3(monadEffect),
  write: /* @__PURE__ */ write3(monadEffect),
  writeString: /* @__PURE__ */ writeString(monadEffect),
  toArray: /* @__PURE__ */ toArray2(monadEffect),
  getAtOffset: /* @__PURE__ */ getAtOffset2(monadEffect),
  setAtOffset,
  slice: slice4,
  size: /* @__PURE__ */ size3(monadEffect),
  concat: concat3,
  "concat'": /* @__PURE__ */ concat$prime2(monadEffect),
  copy,
  fill,
  Monad0: function() {
    return monadEffect;
  }
};

// output/Node.Crypto.Hash/foreign.js
import crypto from "crypto";
var createHashImpl = crypto.createHash;
function updateImpl(buffer, hash) {
  return hash.update(buffer);
}
function digestImpl(hash) {
  return hash.digest();
}

// output/Node.Crypto.Hash/index.js
var update = function(buf) {
  return function(hash) {
    return function() {
      return updateImpl(buf, hash);
    };
  };
};
var digest = function(hash) {
  return function() {
    return digestImpl(hash);
  };
};
var createHash = function(alg) {
  return function() {
    return createHashImpl(alg);
  };
};

// output/Node.FS.Async/foreign.js
import {
  rename,
  truncate,
  chown,
  chmod,
  stat,
  lstat,
  link,
  symlink,
  readlink,
  realpath,
  unlink,
  rmdir,
  rm,
  mkdir,
  readdir,
  utimes,
  readFile,
  writeFile,
  appendFile,
  open,
  read as read6,
  write as write5,
  close
} from "fs";

// output/Data.Nullable/foreign.js
function nullable(a, r, f) {
  return a == null ? r : f(a);
}

// output/Data.Nullable/index.js
var toMaybe = function(n) {
  return nullable(n, Nothing.value, Just.create);
};

// output/Node.FS.Perms/index.js
var semiringPerm = {
  add: function(v) {
    return function(v1) {
      return {
        r: v.r || v1.r,
        w: v.w || v1.w,
        x: v.x || v1.x
      };
    };
  },
  zero: {
    r: false,
    w: false,
    x: false
  },
  mul: function(v) {
    return function(v1) {
      return {
        r: v.r && v1.r,
        w: v.w && v1.w,
        x: v.x && v1.x
      };
    };
  },
  one: {
    r: true,
    w: true,
    x: true
  }
};
var permToInt = function(v) {
  return (function() {
    if (v.r) {
      return 4;
    }
    ;
    return 0;
  }() + function() {
    if (v.w) {
      return 2;
    }
    ;
    return 0;
  }() | 0) + function() {
    if (v.x) {
      return 1;
    }
    ;
    return 0;
  }() | 0;
};
var permToString = /* @__PURE__ */ function() {
  var $119 = show(showInt);
  return function($120) {
    return $119(permToInt($120));
  };
}();
var permsToString = function(v) {
  return "0" + (permToString(v.u) + (permToString(v.g) + permToString(v.o)));
};
var mkPerms = function(u) {
  return function(g) {
    return function(o) {
      return {
        u,
        g,
        o
      };
    };
  };
};
var all4 = /* @__PURE__ */ one(semiringPerm);

// output/Node.FS.Stats/foreign.js
function statsMethod(m, s) {
  return s[m]();
}

// output/Foreign/foreign.js
var isArray = Array.isArray || function(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
};

// output/Foreign/index.js
var unsafeToForeign = unsafeCoerce2;

// output/Node.FS.Stats/index.js
var Stats = /* @__PURE__ */ function() {
  function Stats2(value0) {
    this.value0 = value0;
  }
  ;
  Stats2.create = function(value0) {
    return new Stats2(value0);
  };
  return Stats2;
}();
var isFile = function(v) {
  return statsMethod("isFile", v.value0);
};
var isDirectory = function(v) {
  return statsMethod("isDirectory", v.value0);
};

// output/Node.FS.Async/index.js
var map3 = /* @__PURE__ */ map(functorEither);
var show3 = /* @__PURE__ */ show(showEncoding);
var handleCallback = function(cb) {
  return function(err, a) {
    var v = toMaybe(err);
    if (v instanceof Nothing) {
      return cb(new Right(a))();
    }
    ;
    if (v instanceof Just) {
      return cb(new Left(v.value0))();
    }
    ;
    throw new Error("Failed pattern match at Node.FS.Async (line 59, column 43 - line 61, column 30): " + [v.constructor.name]);
  };
};
var mkdir$prime = function(file) {
  return function(v) {
    return function(cb) {
      return function() {
        return mkdir(file, {
          recursive: v.recursive,
          mode: permsToString(v.mode)
        }, handleCallback(cb));
      };
    };
  };
};
var readFile2 = function(file) {
  return function(cb) {
    return function() {
      return readFile(file, {}, handleCallback(cb));
    };
  };
};
var readTextFile = function(encoding) {
  return function(file) {
    return function(cb) {
      return function() {
        return readFile(file, {
          encoding: show3(encoding)
        }, handleCallback(cb));
      };
    };
  };
};
var readdir2 = function(file) {
  return function(cb) {
    return function() {
      return readdir(file, handleCallback(cb));
    };
  };
};
var stat2 = function(file) {
  return function(cb) {
    return function() {
      return stat(file, handleCallback(function() {
        var $19 = map3(Stats.create);
        return function($20) {
          return cb($19($20));
        };
      }()));
    };
  };
};
var writeFile2 = function(file) {
  return function(buff) {
    return function(cb) {
      return function() {
        return writeFile(file, buff, {}, handleCallback(cb));
      };
    };
  };
};
var writeTextFile = function(encoding) {
  return function(file) {
    return function(buff) {
      return function(cb) {
        return function() {
          return writeFile(file, buff, {
            encoding: show3(encoding)
          }, handleCallback(cb));
        };
      };
    };
  };
};

// output/Node.FS.Aff/index.js
var voidLeft2 = /* @__PURE__ */ voidLeft(functorEffect);
var toAff = function(p) {
  return makeAff(function(k) {
    return voidLeft2(p(k))(nonCanceler);
  });
};
var toAff1 = function(f) {
  return function(a) {
    return toAff(f(a));
  };
};
var toAff2 = function(f) {
  return function(a) {
    return function(b) {
      return toAff(f(a)(b));
    };
  };
};
var writeFile3 = /* @__PURE__ */ toAff2(writeFile2);
var toAff3 = function(f) {
  return function(a) {
    return function(b) {
      return function(c) {
        return toAff(f(a)(b)(c));
      };
    };
  };
};
var writeTextFile2 = /* @__PURE__ */ toAff3(writeTextFile);
var stat3 = /* @__PURE__ */ toAff1(stat2);
var readdir3 = /* @__PURE__ */ toAff1(readdir2);
var readTextFile2 = /* @__PURE__ */ toAff2(readTextFile);
var readFile3 = /* @__PURE__ */ toAff1(readFile2);
var mkdir$prime2 = /* @__PURE__ */ toAff2(mkdir$prime);

// output/Node.Path/foreign.js
import path from "path";
var normalize = path.normalize;
function concat5(segments) {
  return path.join.apply(this, segments);
}
function resolve(from2) {
  return (to) => () => path.resolve.apply(this, from2.concat([to]));
}
function dirname(p) {
  return path.normalize(path.dirname(p));
}
var basename = path.basename;
var extname = path.extname;
var sep = path.sep;
var delimiter = path.delimiter;
var parse2 = path.parse;
var isAbsolute = path.isAbsolute;

// output/Node.Process/foreign.js
import process from "process";
function exit(code) {
  return () => {
    process.exit(code);
  };
}
function copyArray(xs) {
  return () => xs.slice();
}

// output/Node.Process/index.js
var argv = /* @__PURE__ */ function() {
  return copyArray(process.argv);
}();

// output/Simple.JSON/foreign.js
var _parseJSON = JSON.parse;
var _unsafeStringify = JSON.stringify;

// output/Data.Array.NonEmpty.Internal/foreign.js
var traverse1Impl = function() {
  function Cont(fn) {
    this.fn = fn;
  }
  var emptyList = {};
  var ConsCell = function(head2, tail2) {
    this.head = head2;
    this.tail = tail2;
  };
  function finalCell(head2) {
    return new ConsCell(head2, emptyList);
  }
  function consList(x) {
    return function(xs) {
      return new ConsCell(x, xs);
    };
  }
  function listToArray(list) {
    var arr = [];
    var xs = list;
    while (xs !== emptyList) {
      arr.push(xs.head);
      xs = xs.tail;
    }
    return arr;
  }
  return function(apply3) {
    return function(map5) {
      return function(f) {
        var buildFrom = function(x, ys) {
          return apply3(map5(consList)(f(x)))(ys);
        };
        var go = function(acc, currentLen, xs) {
          if (currentLen === 0) {
            return acc;
          } else {
            var last3 = xs[currentLen - 1];
            return new Cont(function() {
              var built = go(buildFrom(last3, acc), currentLen - 1, xs);
              return built;
            });
          }
        };
        return function(array) {
          var acc = map5(finalCell)(f(array[array.length - 1]));
          var result = go(acc, array.length - 1, array);
          while (result instanceof Cont) {
            result = result.fn();
          }
          return map5(listToArray)(result);
        };
      };
    };
  };
}();

// output/Simple.JSON/index.js
var writeImpl = function(dict) {
  return dict.writeImpl;
};
var writeJSON = function(dictWriteForeign) {
  var $191 = writeImpl(dictWriteForeign);
  return function($192) {
    return _unsafeStringify($191($192));
  };
};
var writeForeignString = {
  writeImpl: unsafeToForeign
};
var writeForeignObject = function(dictWriteForeign) {
  return {
    writeImpl: function() {
      var $193 = mapWithKey($$const(writeImpl(dictWriteForeign)));
      return function($194) {
        return unsafeToForeign($193($194));
      };
    }()
  };
};

// output/Node.Simple.Rev/index.js
var writeJSON2 = /* @__PURE__ */ writeJSON(/* @__PURE__ */ writeForeignObject(writeForeignString));
var fromFoldable4 = /* @__PURE__ */ fromFoldable2(foldableArray);
var discard2 = /* @__PURE__ */ discard(discardUnit);
var discard1 = /* @__PURE__ */ discard2(bindAff);
var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
var apply2 = /* @__PURE__ */ apply(applyEffect);
var map4 = /* @__PURE__ */ map(functorEffect);
var bind2 = /* @__PURE__ */ bind(bindAff);
var bind1 = /* @__PURE__ */ bind(bindEffect);
var toString5 = /* @__PURE__ */ toString(mutableBufferEffect);
var pure3 = /* @__PURE__ */ pure(applicativeAff);
var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorAff);
var parTraverse2 = /* @__PURE__ */ parTraverse(parallelAff)(traversableArray);
var compare2 = /* @__PURE__ */ compare(ordInt);
var notElem3 = /* @__PURE__ */ notElem(foldableArray)(eqString);
var foldr2 = /* @__PURE__ */ foldr(foldableArray);
var parTraverse_2 = /* @__PURE__ */ parTraverse_(parallelAff)(foldableArray);
var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableArray);
var replaceURLTargets = [".html", ".js", ".css"];
var mkdirp = function(path2) {
  return mkdir$prime2(path2)({
    mode: mkPerms(all4)(all4)(all4),
    recursive: true
  });
};
var outputManifest = function(opts) {
  return function(manifest) {
    var path2 = concat5([opts.outputDir, "manifest.json"]);
    var json = writeJSON2(fromFoldable4(manifest));
    return discard1(mkdirp(opts.outputDir))(function() {
      return writeTextFile2(UTF8.value)(path2)(json);
    });
  };
};
var help = "\nUsage:\n  $ simple-rev <input_dir> <output_dir>\n  ";
var escapeRegex = function(str) {
  var reg = unsafeRegex("[\\\\^$.*+?()[\\]{}|]")(global);
  var hasReg = unsafeRegex(source(reg))(noFlags);
  var $35 = test(hasReg)(str);
  if ($35) {
    return replace2(reg)("\\$&")(str);
  }
  ;
  return str;
};
var createOpts = function(input) {
  return function(output) {
    return liftEffect3(apply2(map4(function(v) {
      return function(v1) {
        return {
          inputDir: v,
          outputDir: v1
        };
      };
    })(resolve([])(input)))(resolve([])(output)));
  };
};
var contentHash = function(file) {
  return bind2(readFile3(file))(function(buf) {
    return liftEffect3(bind1(bind1(bind1(createHash("md5"))(update(buf)))(digest))(toString5(Hex.value)));
  });
};
var fileManifest = function(opts) {
  return function(file) {
    var file$prime = drop2(1 + length3(opts.inputDir) | 0)(file);
    var v = extname(file$prime);
    if (v === ".html") {
      return pure3([new Tuple(file$prime, file$prime)]);
    }
    ;
    if (v === "") {
      return bind2(contentHash(file))(function(hash) {
        return pure3([new Tuple(file$prime, file$prime + ("-" + hash))]);
      });
    }
    ;
    return bind2(contentHash(file))(function(hash) {
      var reg = unsafeRegex(escapeRegex(v) + "$")(noFlags);
      return pure3([new Tuple(file$prime, replace2(reg)("-" + (hash + v))(file$prime))]);
    });
  };
};
var createManifest = function(opts) {
  var walk = function(dir) {
    return mapFlipped2(bind2(readdir3(dir))(parTraverse2(handleFile(dir))))(concat);
  };
  var handleFile = function(dir) {
    return function(file) {
      var file$prime = concat5([dir, file]);
      return bind2(stat3(file$prime))(function(stats) {
        var $37 = isFile(stats);
        if ($37) {
          return fileManifest(opts)(file$prime);
        }
        ;
        var $38 = isDirectory(stats);
        if ($38) {
          return walk(file$prime);
        }
        ;
        return pure3([]);
      });
    };
  };
  var compareLength = function(a) {
    return function(b) {
      return compare2(length3(a))(length3(b));
    };
  };
  var compareDepth = function(a) {
    return function(b) {
      return compare2(length(split("/")(a)))(length(split("/")(b)));
    };
  };
  var compareManifestKey = function(v) {
    return function(v1) {
      var v2 = compareDepth(v.value0)(v1.value0);
      if (v2 instanceof EQ) {
        return compareLength(v.value0)(v1.value0);
      }
      ;
      return v2;
    };
  };
  return mapFlipped2(walk(opts.inputDir))(sortBy(compareManifestKey));
};
var buildFile = function(opts) {
  return function(manifest) {
    return function(v) {
      var to$prime = concat5([opts.outputDir, v.value1]);
      var replaceURL = function(v1) {
        return replaceAll(v1.value0)(v1.value1);
      };
      var from$prime = concat5([opts.inputDir, v.value0]);
      return discard1(mkdirp(dirname(to$prime)))(function() {
        var $52 = notElem3(extname(to$prime))(replaceURLTargets);
        if ($52) {
          return bind2(readFile3(from$prime))(writeFile3(to$prime));
        }
        ;
        return bind2(readTextFile2(UTF8.value)(from$prime))(function(txt) {
          return writeTextFile2(UTF8.value)(to$prime)(foldr2(replaceURL)(txt)(manifest));
        });
      });
    };
  };
};
var build2 = function(opts) {
  return function(manifest) {
    return parTraverse_2(buildFile(opts)(manifest))(manifest);
  };
};
var rev = function(opts) {
  return bind2(createManifest(opts))(function(manifest) {
    return parSequence_2([outputManifest(opts)(manifest), build2(opts)(manifest)]);
  });
};
var main = /* @__PURE__ */ function() {
  var cb = function(v) {
    if (v instanceof Left) {
      return function __do() {
        error2(message(v.value0))();
        return exit(1)();
      };
    }
    ;
    return log2("Done.");
  };
  return function __do() {
    var xs = argv();
    if (xs.length === 4) {
      return runAff_(cb)(bind2(createOpts(xs[2])(xs[3]))(rev))();
    }
    ;
    return log2(help)();
  };
}();
export {
  main
};
