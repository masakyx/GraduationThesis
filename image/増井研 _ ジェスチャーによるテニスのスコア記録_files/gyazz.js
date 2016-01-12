(function() {
  var KC, clickline, gb, gd, getversion, gr, gs, gt, gu, historycache, longPressTimeout, longmousedown, show_history;

  gs = new GyazzSocket;

  gd = new GyazzDisplay;

  gb = new GyazzBuffer;

  gr = new GyazzRelated;

  gu = new GyazzUpload;

  gt = new GyazzTag;

  gd.init(gt);

  gb.init(gs, gd, gt);

  gs.init(gb, gd, gt);

  gu.init(gb, gs, gd);

  historycache = {};

  clickline = -1;

  KC = {
    tab: 9,
    enter: 13,
    ctrlD: 17,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    k: 75,
    n: 78,
    p: 80,
    s: 83
  };

  $(function() {
    var b, j, results;
    $('#rawdata').hide();
    (function() {
      results = [];
      for (j = 0; j < 1000; j++){ results.push(j); }
      return results;
    }).apply(this).forEach(function(i) {
      var x, y;
      y = $('<div>').attr('id', "listbg" + i);
      x = $('<span>').attr('id', "list" + i).mousedown(linefunc(i, gb));
      return $('#contents').append(y.append(x));
    });
    b = $('body');
    b.bind("dragover", function(e) {
      return false;
    });
    b.bind("dragend", function(e) {
      return false;
    });
    b.bind("drop", function(e) {
      var files;
      e.preventDefault();
      files = e.originalEvent.dataTransfer.files;
      gu.sendfiles(files);
      return false;
    });
    $('#filterdiv').css('display', 'none');
    $("#filter").keyup(function(event) {
      if ($('#filter').val() === '') {
        $('#filterdiv').css('display', 'none');
      }
      return gb.refresh();
    });
    gs.getdata({
      force: true,
      suggest: true
    }, function(res) {
      gb.timestamps = res.timestamps;
      gb.data = res.data.concat();
      gb.datestr = res.date;
      return gb.refresh();
    });
    return gr.getrelated();
  });

  longPressTimeout = false;

  longmousedown = function() {
    gb.editline = clickline;
    return gd.display(gb, true);
  };

  $(document).mouseup(function(event) {
    clearTimeout(longPressTimeout);
    clickline = -1;
    return true;
  });

  $(document).mousemove(function(event) {
    clearTimeout(longPressTimeout);
    return true;
  });

  $(document).mousedown(function(event) {
    if (clickline === -1) {
      gb.seteditline(clickline);
      gs.writedata(gb.data);
    } else {
      clearTimeout(longPressTimeout);
      if (gb.editline !== clickline) {
        longPressTimeout = setTimeout(longmousedown, 300);
      }
    }
    return true;
  });

  $(document).keyup(function(event) {
    return gb.data[gb.editline] = $("#editline").val();
  });

  $(document).keypress(function(event) {
    var kc;
    kc = event.which;
    if (kc === KC.enter) {
      if ($(':focus').attr('id') !== 'search') {
        event.preventDefault();
      }
    }
    if (kc === KC.enter) {
      gb.deleteblankdata();
      if (gb.editline >= 0 && gb.editline < gb.data.length) {
        gb.addblankline(gb.editline + 1, gb.line_indent(gb.editline));
        gb.refresh();
        return false;
      }
      if (!event.shiftKey && (kc === KC.down || kc === KC.up || kc === KC.tab)) {
        return false;
      }
    }
  });

  getversion = function(n) {
    if (gd.version + n >= -1) {
      gd.version += n;
      gs.getdata({
        version: gd.version
      }, function(res) {
        gb.data = res.data.concat();
        return gb.datestr = res.date;
      });
      return gb.refresh();
    }
  };

  $(document).keydown(function(event) {
    var cd, ck, kc, sk;
    kc = event.which;
    sk = event.shiftKey;
    ck = event.ctrlKey;
    cd = event.metaKey && !ck;
    switch (false) {
      case !(ck && kc === KC.s && gb.editline >= 0):
        event.preventDefault();
        return gb.transpose();
      case kc !== KC.enter:
        $('#filter').val('');
        return gs.writedata(gb.data);
      case !(kc === KC.down && sk):
        return gb.block_down();
      case !(kc === KC.k && ck):
        return gb.kill();
      case !(kc === KC.down && ck):
        return gb.line_down();
      case !(kc === KC.down && !sk || kc === KC.n && !sk && ck):
        return gb.cursor_down();
      case !(kc === KC.up && sk):
        return gb.block_up();
      case !(kc === KC.up && ck && gb.editline > 0):
        return gb.line_up();
      case !((kc === KC.up && !sk) || (kc === KC.p && !sk && ck)):
        return gb.cursor_up();
      case !(kc === KC.tab && !sk || kc === KC.right && sk):
        return gb.indent();
      case !(kc === KC.tab && sk || kc === KC.left && sk):
        return gb.undent();
      case !(kc === KC.left && !sk && !ck && gb.editline < 0):
        return gb.zoomout();
      case !(kc === KC.right && !sk && !ck && gb.editline < 0):
        return gb.zoomin();
      case !(ck && kc === KC.left):
        return getversion(1);
      case !(ck && kc === KC.right):
        return getversion(-1);
      case !(kc >= 0x30 && kc <= 0x7e && gb.editline < 0 && !cd && !ck && $(':focus').attr('id') !== 'search'):
        $('#filterdiv').css('display', 'block');
        return $('#filter').focus();
    }
  });

  window.linefunc = function(n, gb) {
    return function(event) {
      clickline = n;
      if (event.shiftKey) {
        gb.addblankline(n, gb.line_indent(n));
        gb.refresh();
      }
      return true;
    };
  };

  show_history = function(res) {
    gb.datestr = res.date;
    gb.timestamps = res.timestamps;
    gb.data = res.data;
    return gb.refresh();
  };

  window.adjustIframeSize = function(newHeight, i) {
    var frame;
    frame = document.getElementById("gistFrame" + i);
    return frame.style.height = parseInt(newHeight) + "px";
  };

}).call(this);

//# sourceMappingURL=gyazz.js.map
