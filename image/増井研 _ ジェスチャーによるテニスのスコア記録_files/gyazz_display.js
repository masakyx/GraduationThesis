(function() {
  var GyazzDisplay;

  GyazzDisplay = (function() {
    var follow_scroll;

    function GyazzDisplay() {}

    GyazzDisplay.prototype.init = function(tag) {
      return this.tag = tag;
    };

    GyazzDisplay.prototype.version = -1;

    GyazzDisplay.prototype.showold = false;

    GyazzDisplay.prototype.display = function(gb, delay) {
      var contline, input, k, l, ref, ref1, results, results1;
      $("body").css('background-color', (function() {
        switch (gb.zoomlevel) {
          case 0:
            return "#eeeeff";
          case -1:
            return "#e0e0c0";
          case -2:
            return "#c0c0a0";
          default:
            return "#a0a080";
        }
      })());
      $('#datestr').text(this.version >= 0 || this.showold ? gb.datestr : '');
      $('#title').attr({
        href: "/" + wiki + "/" + title + "/__edit?version=" + (this.version >= 0 ? this.version : 0)
      });
      if (delay) {
        setTimeout((function(_this) {
          return function() {
            return _this.display(gb);
          };
        })(this), 100);
        return;
      }
      input = $("#editline");
      if (gb.editline === -1) {
        gb.deleteblankdata();
        input.css('display', 'none');
      }
      contline = -1;
      if (gb.data.length === 0) {
        gb.data = ["(empty)"];
        gb.doi[0] = gb.maxindent();
      }
      (function() {
        results = [];
        for (var k = 0, ref = gb.data.length; 0 <= ref ? k < ref : k > ref; 0 <= ref ? k++ : k--){ results.push(k); }
        return results;
      }).apply(this).forEach((function(_this) {
        return function(i) {
          var color, createdate, date, gistFrame, gistFrameDoc, gistFrameHTML, gisturl, ind, k, lastchar, m, p, results, s, t, xmargin;
          ind = gb.line_indent(i);
          xmargin = ind * 30;
          t = $("#list" + i);
          p = $("#listbg" + i);
          if (gb.doi[i] >= -gb.zoomlevel) {
            if (i === gb.editline) {
              t.css('display', 'inline').css('visibility', 'hidden');
              p.css('display', 'block').css('visibility', 'hidden');
              input.css('position', 'absolute');
              input.css('visibility', 'visible');
              input.css('left', xmargin + 25);
              input.css('top', p.position().top);
              input.blur();
              input.val(gb.data[i]);
              input.focus();
              input.mousedown(linefunc(i, gb));
              setTimeout(function() {
                return $("#editline").focus();
              }, 100);
            } else {
              lastchar = '';
              if (i > 0 && typeof gb.data[i - 1] === "string") {
                lastchar = gb.data[i - 1][gb.data[i - 1].length - 1];
              }
              if (gb.editline === -1 && lastchar === '\\') {
                if (contline < 0) {
                  contline = i - 1;
                }
                s = '';
                (function() {
                  results = [];
                  for (var k = contline; contline <= i ? k <= i : k >= i; contline <= i ? k++ : k--){ results.push(k); }
                  return results;
                }).apply(this).forEach(function(j) {
                  return s += gb.data[j].replace(/\\$/, '__newline__');
                });
                $("#list" + contline).css('display', 'inline').css('visibility', 'visible').html(_this.tag.expand(s, wiki, contline).replace(/__newline__/g, ''));
                $("#listbg" + contline).css('display', 'inline').css('visibility', 'visible');
                t.css('visibility', 'hidden');
                p.css('visibility', 'hidden');
              } else {
                contline = -1;
                if (typeof gb.data[i] === "string" && (m = gb.data[i].match(/\[\[(https:\/\/gist\.github\.com.*\?.*)\]\]/i))) {
                  gisturl = m[1];
                  gistFrame = document.createElement("iframe");
                  gistFrame.setAttribute("width", "100%");
                  gistFrame.id = "gistFrame" + i;
                  gistFrame.style.border = 'none';
                  gistFrame.style.margin = '0';
                  t.children().remove();
                  t.append(gistFrame);
                  gistFrameHTML = '<html><body onload="parent.adjustIframeSize(document.body.scrollHeight,' + i + ')"><scr' + 'ipt type="text/javascript" src="' + gisturl + '"></sc' + 'ript></body></html>';
                  gistFrameDoc = gistFrame.document;
                  if (gistFrame.contentDocument) {
                    gistFrameDoc = gistFrame.contentDocument;
                  } else if (gistFrame.contentWindow) {
                    gistFrameDoc = gistFrame.contentWindow.document;
                  }
                  gistFrameDoc.open();
                  gistFrameDoc.writeln(gistFrameHTML);
                  gistFrameDoc.close();
                } else {
                  t.css({
                    display: 'inline',
                    visibility: 'visible',
                    'line-height': ''
                  }).html(_this.tag.expand(gb.data[i], wiki, title, i));
                  p.attr("class", "listedit" + ind);
                  p.css({
                    display: 'block',
                    visibility: 'visible',
                    'line-height': ''
                  });
                }
              }
            }
          } else {
            t.css('display', 'none');
            p.css('display', 'none');
          }
          color = _this.version >= 0 || _this.showold ? bgcol(gb.timestamps[i]) : 'transparent';
          $("#listbg" + i).css('background-color', color);
          if (_this.version >= 0) {
            $("#list" + i).addClass('hover');
            date = new Date();
            createdate = new Date(date.getTime() - gb.timestamps[i] * 1000);
            $("#list" + i).attr('title', createdate.toLocaleString());
            return $(".hover").tipTip({
              maxWidth: "auto",
              edgeOffset: 5,
              activation: "hover",
              defaultPosition: "bottom"
            });
          } else {
            return $("#listbg" + i).removeClass('hover');
          }
        };
      })(this));
      (function() {
        results1 = [];
        for (var l = ref1 = gb.data.length; ref1 <= 1000 ? l < 1000 : l > 1000; ref1 <= 1000 ? l++ : l--){ results1.push(l); }
        return results1;
      }).apply(this).forEach(function(i) {
        $("#list" + i).css('display', 'none');
        return $("#listbg" + i).css('display', 'none');
      });
      input.css('display', gb.editline === -1 ? 'none' : 'block');
      gb.align();
      return follow_scroll.call(this, gb);
    };

    follow_scroll = function(gb) {
      var currentLinePos, currentScrollPos, windowHeight;
      if (gb.editline < 0) {
        return;
      }
      if (this.showold) {
        return;
      }
      currentLinePos = $("#editline").offset().top;
      if (!(currentLinePos && currentLinePos > 0)) {
        return;
      }
      currentScrollPos = $("body").scrollTop();
      windowHeight = window.innerHeight;
      if (currentScrollPos < currentLinePos && currentLinePos < currentScrollPos + windowHeight) {
        return;
      }
      return $("body").stop().animate({
        'scrollTop': currentLinePos - windowHeight / 2
      }, 200);
    };

    return GyazzDisplay;

  })();

  window.GyazzDisplay = GyazzDisplay;

}).call(this);

//# sourceMappingURL=gyazz_display.js.map
