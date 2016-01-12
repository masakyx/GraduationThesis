(function() {
  window.hex2 = function(v) {
    v = Math.floor(v);
    if (v >= 256) {
      v = 255;
    }
    return ("0" + v.toString(16)).slice(-2);
  };

  window.bgcol = function(t) {
    var b, g, ind, j, r, ref, results, t1, t2, table;
    table = [[0, 256, 256, 256], [10, 240, 240, 240], [10 * 10, 220, 220, 220], [10 * 10 * 10, 200, 200, 200], [10 * 10 * 10 * 10, 180, 180, 180], [10 * 10 * 10 * 10 * 10, 160, 160, 160], [10 * 10 * 10 * 10 * 10 * 10, 140, 140, 140], [10 * 10 * 10 * 10 * 10 * 10 * 10, 120, 120, 120], [10 * 10 * 10 * 10 * 10 * 10 * 10 * 10, 100, 100, 100], [10 * 10 * 10 * 10 * 10 * 10 * 10 * 10 * 10, 80, 80, 80], [10 * 10 * 10 * 10 * 10 * 10 * 10 * 10 * 10 * 10, 60, 60, 60], [10 * 10 * 10 * 10 * 10 * 10 * 10 * 10 * 10 * 10 * 10, 40, 40, 40]];
    t1 = t2 = 0;
    ind = _.find((function() {
      results = [];
      for (var j = 0, ref = table.length - 1; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
      return results;
    }).apply(this), function(i) {
      t1 = table[i][0];
      t2 = table[i + 1][0];
      return t >= t1 && t <= t2;
    });
    if (ind) {
      r = Math.floor(((t - t1) * table[ind + 1][1] + (t2 - t) * table[ind][1]) / (t2 - t1));
      g = Math.floor(((t - t1) * table[ind + 1][2] + (t2 - t) * table[ind][2]) / (t2 - t1));
      b = Math.floor(((t - t1) * table[ind + 1][3] + (t2 - t) * table[ind][3]) / (t2 - t1));
      return "" + (hex2(r)) + (hex2(g)) + (hex2(b));
    } else {
      return "#000000";
    }
  };

}).call(this);

//# sourceMappingURL=gyazz_lib.js.map
