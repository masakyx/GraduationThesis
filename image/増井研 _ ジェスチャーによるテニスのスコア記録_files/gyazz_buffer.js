(function() {
  var GyazzBuffer;

  GyazzBuffer = (function() {
    var _destline_down, _destline_up, _do_align, _do_transpose, _indent, _indentstr, _movelines, _similarlines, _spaces, _transpose_condition;

    function GyazzBuffer() {}

    GyazzBuffer.prototype.init = function(gs, gd, tag) {
      this.gs = gs;
      this.gd = gd;
      return this.tag = tag;
    };

    _indentstr = function(level) {
      var j, results;
      return ((function() {
        results = [];
        for (var j = 0; 0 <= level ? j < level : j > level; 0 <= level ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).map(function(x) {
        return " ";
      })).join('');
    };

    _indent = function(line) {
      return line.match(/^( *)/)[1].length;
    };

    _spaces = [];

    GyazzBuffer.prototype.data = [];

    GyazzBuffer.prototype.datestr = '';

    GyazzBuffer.prototype.timestamps = [];

    GyazzBuffer.prototype.doi = [];

    GyazzBuffer.prototype.editline = -1;

    GyazzBuffer.prototype.zoomlevel = 0;

    GyazzBuffer.prototype.refresh = function() {
      this.zoomlevel = 0;
      this.calcdoi();
      return this.gd.display(this);
    };

    GyazzBuffer.prototype.seteditline = function(line) {
      this.editline = line;
      return this.gd.display(this, true);
    };

    GyazzBuffer.prototype.calcdoi = function() {
      var j, maxind, pbs, q, re, ref, results;
      q = $('#filter');
      pbs = new POBoxSearch(assocwiki_pobox_dict);
      re = null;
      if (q && q.val() !== '') {
        re = pbs.regexp(q.val(), false);
      }
      maxind = this.maxindent();
      return (function() {
        results = [];
        for (var j = 0, ref = this.data.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).forEach((function(_this) {
        return function(i) {
          if ((re ? re.exec(_this.data[i]) : true)) {
            return _this.doi[i] = maxind - _this.line_indent(i);
          } else {
            return _this.doi[i] = 0 - _this.line_indent(i) - 1;
          }
        };
      })(this));
    };

    GyazzBuffer.prototype.line_indent = function(n) {
      var s;
      s = this.data[n] || '';
      return _indent(s);
    };

    GyazzBuffer.prototype.maxindent = function() {
      return Math.max.apply(Math, this.data.map(function(line) {
        return _indent(line);
      }));
    };

    GyazzBuffer.prototype.deleteblankdata = function() {
      return this.data = _.filter(this.data, function(line) {
        return typeof line === "string" && !line.match(/^\s*$/);
      });
    };

    GyazzBuffer.prototype.addblankline = function(line, indent) {
      var j, ref, ref1, results;
      this.editline = line;
      this.deleteblankdata();
      if (this.data.length > this.editline) {
        (function() {
          results = [];
          for (var j = ref = this.data.length - 1, ref1 = this.editline; ref <= ref1 ? j <= ref1 : j >= ref1; ref <= ref1 ? j++ : j--){ results.push(j); }
          return results;
        }).apply(this).forEach((function(_this) {
          return function(i) {
            return _this.data[i + 1] = _this.data[i];
          };
        })(this));
      }
      return this.data[this.editline] = _indentstr(indent);
    };

    _movelines = function(n) {
      var ind, j, last, ref, ref1, results;
      ind = this.line_indent(n);
      last = _.find((function() {
        results = [];
        for (var j = ref = n + 1, ref1 = this.data.length; ref <= ref1 ? j < ref1 : j > ref1; ref <= ref1 ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this), (function(_this) {
        return function(i) {
          return _this.line_indent(i) <= ind;
        };
      })(this));
      return (last || (last = this.data.length)) - n;
    };

    _destline_up = function(n) {
      var foundline, ind_editline, j, ref, results;
      ind_editline = this.line_indent(n);
      foundline = -1;
      if (n > 0) {
        _.find((function() {
          results = [];
          for (var j = ref = n - 1; ref <= 0 ? j <= 0 : j >= 0; ref <= 0 ? j++ : j--){ results.push(j); }
          return results;
        }).apply(this), (function(_this) {
          return function(i) {
            var ind;
            ind = _this.line_indent(i);
            if (ind > ind_editline) {
              foundline = i;
            }
            if (ind === ind_editline) {
              foundline = i;
              return true;
            }
            if (ind < ind_editline) {
              return true;
            }
          };
        })(this));
      }
      return foundline;
    };

    _destline_down = function(n) {
      var foundline, ind_editline, j, ref, ref1, results;
      ind_editline = this.line_indent(n);
      foundline = -1;
      _.find((function() {
        results = [];
        for (var j = ref = n + 1, ref1 = this.data.length; ref <= ref1 ? j < ref1 : j > ref1; ref <= ref1 ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this), (function(_this) {
        return function(i) {
          var ind;
          ind = _this.line_indent(i);
          if (ind === ind_editline) {
            foundline = i;
            return true;
          }
          if (ind < ind_editline) {
            foundline = -1;
            return true;
          }
        };
      })(this));
      return foundline;
    };

    GyazzBuffer.prototype.cursor_down = function() {
      var dest, j, ref, ref1, results;
      if (this.editline >= 0 && this.editline < this.data.length - 1) {
        dest = _.find((function() {
          results = [];
          for (var j = ref = this.editline + 1, ref1 = this.data.length; ref <= ref1 ? j < ref1 : j > ref1; ref <= ref1 ? j++ : j--){ results.push(j); }
          return results;
        }).apply(this), (function(_this) {
          return function(i) {
            return _this.doi[i] >= -_this.zoomlevel;
          };
        })(this));
        if (dest) {
          return setTimeout((function(_this) {
            return function() {
              _this.editline = dest;
              _this.deleteblankdata();
              _this.gs.writedata(_this.data);
              return _this.gd.display(_this);
            };
          })(this), 1);
        }
      }
    };

    GyazzBuffer.prototype.cursor_up = function() {
      var dest, j, ref, results;
      if (this.editline > 0) {
        dest = _.find((function() {
          results = [];
          for (var j = ref = this.editline - 1; ref <= 0 ? j <= 0 : j >= 0; ref <= 0 ? j++ : j--){ results.push(j); }
          return results;
        }).apply(this), (function(_this) {
          return function(i) {
            return _this.doi[i] >= -_this.zoomlevel;
          };
        })(this));
        if (dest !== void 0) {
          return setTimeout((function(_this) {
            return function() {
              _this.editline = dest;
              _this.deleteblankdata();
              _this.gs.writedata(_this.data);
              return _this.gd.display(_this);
            };
          })(this), 1);
        }
      }
    };

    GyazzBuffer.prototype.line_down = function() {
      var l, ref;
      if (this.editline >= 0 && this.editline < this.data.length - 1) {
        l = this.editline;
        ref = [this.data[l + 1], this.data[l]], this.data[l] = ref[0], this.data[l + 1] = ref[1];
        return setTimeout((function(_this) {
          return function() {
            _this.editline += 1;
            _this.deleteblankdata();
            _this.gs.writedata(_this.data);
            return _this.gd.display(_this);
          };
        })(this), 1);
      }
    };

    GyazzBuffer.prototype.line_up = function() {
      var l, ref;
      if (this.editline > 0) {
        l = this.editline;
        ref = [this.data[l - 1], this.data[l]], this.data[l] = ref[0], this.data[l - 1] = ref[1];
        return setTimeout((function(_this) {
          return function() {
            _this.editline -= 1;
            _this.deleteblankdata();
            _this.gs.writedata(_this.data);
            return _this.gd.display(_this);
          };
        })(this), 1);
      }
    };

    GyazzBuffer.prototype.block_down = function() {
      var dst, j, k, m, m2, o, results, results1, results2, tmp;
      if (this.editline >= 0 && this.editline < this.data.length - 1) {
        m = _movelines.call(this, this.editline);
        dst = _destline_down.call(this, this.editline);
        if (dst >= 0) {
          m2 = _movelines.call(this, dst);
          tmp = [];
          (function() {
            results = [];
            for (var j = 0; 0 <= m ? j < m : j > m; 0 <= m ? j++ : j--){ results.push(j); }
            return results;
          }).apply(this).forEach((function(_this) {
            return function(i) {
              return tmp[i] = _this.data[_this.editline + i];
            };
          })(this));
          (function() {
            results1 = [];
            for (var k = 0; 0 <= m2 ? k < m2 : k > m2; 0 <= m2 ? k++ : k--){ results1.push(k); }
            return results1;
          }).apply(this).forEach((function(_this) {
            return function(i) {
              return _this.data[_this.editline + i] = _this.data[dst + i];
            };
          })(this));
          (function() {
            results2 = [];
            for (var o = 0; 0 <= m ? o < m : o > m; 0 <= m ? o++ : o--){ results2.push(o); }
            return results2;
          }).apply(this).forEach((function(_this) {
            return function(i) {
              return _this.data[_this.editline + m2 + i] = tmp[i];
            };
          })(this));
          this.editline += m2;
          this.deleteblankdata();
          this.gs.writedata(this.data);
          return this.gd.display(this);
        }
      }
    };

    GyazzBuffer.prototype.block_up = function() {
      var dst, j, k, m, m2, o, results, results1, results2, tmp;
      if (this.editline > 0 && this.editline < this.data.length) {
        m = _movelines.call(this, this.editline);
        dst = _destline_up.call(this, this.editline);
        if (dst >= 0) {
          m2 = this.editline - dst;
          tmp = [];
          (function() {
            results = [];
            for (var j = 0; 0 <= m2 ? j < m2 : j > m2; 0 <= m2 ? j++ : j--){ results.push(j); }
            return results;
          }).apply(this).forEach((function(_this) {
            return function(i) {
              return tmp[i] = _this.data[dst + i];
            };
          })(this));
          (function() {
            results1 = [];
            for (var k = 0; 0 <= m ? k < m : k > m; 0 <= m ? k++ : k--){ results1.push(k); }
            return results1;
          }).apply(this).forEach((function(_this) {
            return function(i) {
              return _this.data[dst + i] = _this.data[_this.editline + i];
            };
          })(this));
          (function() {
            results2 = [];
            for (var o = 0; 0 <= m2 ? o < m2 : o > m2; 0 <= m2 ? o++ : o--){ results2.push(o); }
            return results2;
          }).apply(this).forEach((function(_this) {
            return function(i) {
              return _this.data[dst + m + i] = tmp[i];
            };
          })(this));
          this.editline = dst;
          this.deleteblankdata();
          this.gs.writedata(this.data);
          return this.gd.display(this);
        }
      }
    };

    GyazzBuffer.prototype.indent = function() {
      if (this.editline >= 0 && this.editline < this.data.length) {
        this.data[this.editline] = ' ' + this.data[this.editline];
        this.gs.writedata(this.data);
        return this.gd.display(this);
      }
    };

    GyazzBuffer.prototype.undent = function() {
      var s;
      if (this.editline >= 0 && this.editline < this.data.length) {
        s = this.data[this.editline];
        if (s.substring(0, 1) === ' ') {
          this.data[this.editline] = s.substring(1, s.length);
        }
        this.gs.writedata(this.data);
        return this.gd.display(this);
      }
    };

    GyazzBuffer.prototype.zoomin = function() {
      if (this.zoomlevel < 0) {
        this.zoomlevel += 1;
        return this.gd.display(this);
      }
    };

    GyazzBuffer.prototype.zoomout = function() {
      if (-this.zoomlevel < this.maxindent()) {
        this.zoomlevel -= 1;
        return this.gd.display(this);
      }
    };

    GyazzBuffer.prototype.kill = function() {
      var input;
      input = $("#editline");
      if (input.val().match(/^\s*$/) && this.editline < this.data.length - 1) {
        this.data[this.editline] = "";
        this.deleteblankdata();
        this.gs.writedata(this.data);
        this.refresh();
        setTimeout(function() {
          input[0].selectionStart = 0;
          return input[0].selectionEnd = 0;
        }, 10);
        return;
      }
      return setTimeout(function() {
        var cursor_pos;
        cursor_pos = input[0].selectionStart;
        if (input.val().length > cursor_pos) {
          input.val(input_tag.val().substring(0, cursor_pos));
          input.selectionStart = cursor_pos;
          return input.selectionEnd = cursor_pos;
        }
      }, 10);
    };

    _similarlines = function(process, condition) {
      var beginline, j, lastindent, lastspaces, ref, results;
      beginline = 0;
      lastspaces = -1;
      lastindent = -1;
      _spaces = this.data.map((function(_this) {
        return function(line) {
          return _this.tag.split(line).length - _indent(line) - 1;
        };
      })(this));
      (function() {
        results = [];
        for (var j = 0, ref = this.data.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).forEach((function(_this) {
        return function(i) {
          if (_spaces[i] > 0 && _spaces[i] === lastspaces && _this.line_indent(i) === lastindent) {

          } else {
            if (lastspaces > 1 && i - beginline > 1) {
              if (condition(beginline, i, _this.editline)) {
                process.call(_this, beginline, i - beginline, _this.line_indent(beginline));
              }
            }
            beginline = i;
          }
          lastspaces = _spaces[i];
          return lastindent = _this.line_indent(i);
        };
      })(this));
      if (lastspaces > 1 && this.data.length - beginline > 1) {
        if (condition(beginline, this.data.length)) {
          return process.call(this, beginline, this.data.length - beginline, this.line_indent(beginline));
        }
      }
    };

    GyazzBuffer.prototype.align = function() {
      return _similarlines.call(this, _do_align, function() {
        return true;
      });
    };

    _do_align = function(begin, lines, dummy) {
      var colpos, j, k, maxwidth, o, pos, ref, ref1, ref2, results, results1, results2, width;
      pos = [];
      width = [];
      maxwidth = [];
      (function() {
        results = [];
        for (var j = begin, ref = begin + lines; begin <= ref ? j < ref : j > ref; begin <= ref ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).forEach((function(_this) {
        return function(line) {
          var j, k, ref, ref1, results, results1;
          pos[line] = [];
          width[line] = [];
          (function() {
            results = [];
            for (var j = 0, ref = _spaces[begin]; 0 <= ref ? j <= ref : j >= ref; 0 <= ref ? j++ : j--){ results.push(j); }
            return results;
          }).apply(this).forEach(function(i) {
            var id;
            id = "#e" + line + "_" + (i + _this.line_indent(line));
            return pos[line][i] = $(id).offset().left;
          });
          return (function() {
            results1 = [];
            for (var k = 0, ref1 = _spaces[begin]; 0 <= ref1 ? k <= ref1 : k >= ref1; 0 <= ref1 ? k++ : k--){ results1.push(k); }
            return results1;
          }).apply(this).forEach(function(i) {
            return width[line][i] = pos[line][i + 1] - pos[line][i];
          });
        };
      })(this));
      (function() {
        results1 = [];
        for (var k = 0, ref1 = _spaces[begin]; 0 <= ref1 ? k < ref1 : k > ref1; 0 <= ref1 ? k++ : k--){ results1.push(k); }
        return results1;
      }).apply(this).forEach(function(i) {
        var k, max, ref1, results1;
        max = 0;
        (function() {
          results1 = [];
          for (var k = begin, ref1 = begin + lines; begin <= ref1 ? k < ref1 : k > ref1; begin <= ref1 ? k++ : k--){ results1.push(k); }
          return results1;
        }).apply(this).forEach(function(line) {
          if (width[line][i] > max) {
            return max = width[line][i];
          }
        });
        return maxwidth[i] = max;
      });
      colpos = pos[begin][0];
      return (function() {
        results2 = [];
        for (var o = 0, ref2 = _spaces[begin]; 0 <= ref2 ? o <= ref2 : o >= ref2; 0 <= ref2 ? o++ : o--){ results2.push(o); }
        return results2;
      }).apply(this).forEach((function(_this) {
        return function(i) {
          var o, ref2, results2;
          (function() {
            results2 = [];
            for (var o = begin, ref2 = begin + lines; begin <= ref2 ? o < ref2 : o > ref2; begin <= ref2 ? o++ : o--){ results2.push(o); }
            return results2;
          }).apply(this).forEach(function(line) {
            var id;
            id = "#e" + line + "_" + (i + _this.line_indent(line));
            return $(id).css('position', 'absolute').css('left', colpos);
          });
          return colpos += maxwidth[i];
        };
      })(this));
    };

    GyazzBuffer.prototype.transpose = function() {
      if (this.editline < 0) {
        return;
      }
      return _similarlines.call(this, _do_transpose, _transpose_condition);
    };

    _transpose_condition = function(beginline, limit, editline) {
      return editline >= beginline && editline < limit;
    };

    _do_transpose = function(beginline, lines, indent) {
      var cols, j, k, newlines, o, ref, results, results1, results2;
      cols = _spaces[beginline] + 1;
      newlines = [];
      (function() {
        results = [];
        for (var j = 0; 0 <= cols ? j < cols : j > cols; 0 <= cols ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).forEach(function(i) {
        return newlines[i] = _indentstr(indent);
      });
      (function() {
        results1 = [];
        for (var k = 0; 0 <= lines ? k < lines : k > lines; 0 <= lines ? k++ : k--){ results1.push(k); }
        return results1;
      }).apply(this).forEach((function(_this) {
        return function(y) {
          var a, k, ref, results1, s;
          s = _this.data[beginline + y];
          s = s.replace(/^\s*/, '').replace(/</g, '&lt');
          a = _this.tag.split(s);
          return (function() {
            results1 = [];
            for (var k = 0, ref = a.length; 0 <= ref ? k < ref : k > ref; 0 <= ref ? k++ : k--){ results1.push(k); }
            return results1;
          }).apply(this).forEach(function(i) {
            if (y !== 0) {
              newlines[i] += " ";
            }
            return newlines[i] += a[i];
          });
        };
      })(this));
      this.data.splice(beginline, lines);
      (function() {
        results2 = [];
        for (var o = 0, ref = newlines.length; 0 <= ref ? o < ref : o > ref; 0 <= ref ? o++ : o--){ results2.push(o); }
        return results2;
      }).apply(this).forEach((function(_this) {
        return function(i) {
          return _this.data.splice(beginline + i, 0, newlines[i]);
        };
      })(this));
      this.gs.writedata(this.data);
      this.editline = -1;
      return this.gd.display(this, true);
    };

    return GyazzBuffer;

  })();

  window.GyazzBuffer = GyazzBuffer;

}).call(this);

//# sourceMappingURL=gyazz_buffer.js.map
