(function() {
  var frac, loc2val, val2loc;

  frac = function(v) {
    return v - Math.floor(v);
  };

  val2loc = function(v) {
    var deg, min, negative, sec, sec2;
    negative = v < 0;
    v = Math.abs(v);
    deg = Math.floor(v);
    v = frac(v) * 60.0;
    min = Math.floor(v);
    v = frac(v) * 60.0;
    sec = Math.floor(v);
    v = frac(v) * 100.0;
    sec2 = Math.floor(v);
    return "" + (negative ? "-" : '') + deg + "." + min + "." + sec + "." + sec2;
  };

  loc2val = function(loc) {
    var a, negative, v;
    negative = loc.match(/^\-/);
    a = loc.split(/\./);
    v = parseInt(a[0]) + parseInt(a[1]) / 60.0 + parseInt(a[2]) / 60.0 / 60.0 + parseInt(a[3]) / 60.0 / 60.0 / 100.0;
    if (negative) {
      return -v;
    } else {
      return v;
    }
  };

  window.parseloc = function(s) {
    var a, o, v;
    o = {
      zoom: 1,
      lat: 0.0,
      lng: 0.0
    };
    while (a = s.match(/^([EWNSZ])([1-9][0-9\.]*)(.*)$/)) {
      v = a[2].match(/\..*\./) ? loc2val(a[2]) : parseFloat(a[2]);
      switch (a[1]) {
        case 'E':
          o.lng = v;
          break;
        case 'W':
          o.lng = -v;
          break;
        case 'N':
          o.lat = v;
          break;
        case 'S':
          o.lat = -v;
          break;
        case 'Z':
          o.zoom = v;
      }
      s = a[3];
    }
    return o;
  };

  window.locstr = function(o) {
    var ew, ns;
    ew = o.lng > 0 ? 'E' + val2loc(o.lng) : 'W' + val2loc(-o.lng);
    ns = o.lat > 0 ? 'N' + val2loc(o.lat) : 'S' + val2loc(-o.lat);
    return "" + ew + ns + "Z" + o.zoom;
  };

}).call(this);

//# sourceMappingURL=gyazz_location.js.map
