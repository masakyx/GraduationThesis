(function() {
  var GyazzTag;

  GyazzTag = (function() {
    var _tag_expand;

    function GyazzTag() {}

    GyazzTag.prototype.split = function(s) {
      var PAT2L, PAT2R, PAT3L, PAT3R, SPACE, inner, m, post, pre, x;
      PAT3L = "<<<3<<<";
      PAT3R = ">>>3>>>";
      PAT2L = "<<<2<<<";
      PAT2R = ">>>2>>>";
      SPACE = "<<<SPACE>>>";
      while (m = s.match(/^(.*)\[\[\[(([^\]]|\][^\]]|[^\]]\])*)\]\]\](.*)$/)) {
        x = m[0], pre = m[1], inner = m[2], x = m[3], post = m[4];
        s = "" + pre + PAT3L + (inner.replace(/\s/g, SPACE)) + PAT3R + post;
      }
      while (m = s.match(/^(.*)\[\[(([^\]]|\][^\]]|[^\]]\])*)\]\](.*)$/)) {
        x = m[0], pre = m[1], inner = m[2], x = m[3], post = m[4];
        s = "" + pre + PAT2L + (inner.replace(/\s/g, SPACE)) + PAT2R + post;
      }
      return s.split(' ').map(function(line) {
        return line.replace(new RegExp(PAT3L, "g"), '[[[').replace(new RegExp(PAT3R, "g"), ']]]').replace(new RegExp(PAT2L, "g"), '[[').replace(new RegExp(PAT2R, "g"), ']]').replace(new RegExp(SPACE, "g"), ' ');
      });
    };

    _tag_expand = function(s, wiki) {
      var _keywords, elements, j, matched, ref, results;
      if (typeof s !== "string") {
        return;
      }
      matched = [];
      s = s.replace(/</g, '&lt');
      _keywords = [];
      elements = this.split(s).map(function(s) {
        var all, count, dummy, icons, img_url, inner, j, link_to, m, o, odd, post, pre, results, screen_name, t, target, url, wikiname, wikititle, wikiurl;
        while (m = s.match(/^(.*)\[\[\[(([^\]]|\][^\]]|[^\]]\])*)\]\]\](.*)$/)) {
          all = m[0], pre = m[1], inner = m[2], dummy = m[3], post = m[4];
          switch (false) {
            case !(t = inner.match(/^(https?:\/\/[^ ]+) (.*)\.(jpg|jpeg|jpe|png|gif)$/i)):
              matched.push("<a href='" + t[1] + "'><img src='" + t[2] + "." + t[3] + "' border='none' target='_blank' height=80></a>");
              break;
            case !(t = inner.match(/^(https?:\/\/.+)\.(jpg|jpeg|jpe|png|gif)$/i)):
              matched.push(("<a href='" + t[1] + "." + t[2] + "' target='_blank'>") + ("<img src='" + t[1] + "." + t[2] + "' border='none' height=80></a>"));
              break;
            case !(t = inner.match(/^([0-9a-f]{32})\.(jpg|jpeg|jpe|png|gif)$/i)):
              matched.push(("<a href='/upload/" + t[1] + "." + t[2] + "' target='_blank'>") + ("<img src='/upload/" + t[1] + "." + t[2] + "' border='none' height=80></a>"));
              break;
            default:
              matched.push("<b>" + inner + "</b>");
          }
          s = pre + "<<<" + (matched.length - 1) + ">>>" + post;
        }
        while (m = s.match(/^(.*)\[\[(([^\]]|\][^\]]|[^\]]\])*)\]\](.*)$/)) {
          all = m[0], pre = m[1], inner = m[2], dummy = m[3], post = m[4];
          switch (false) {
            case !(t = inner.match(/^([0-9a-f]{32})\.(jpg|jpeg|jpe|png|gif)$/i)):
              matched.push(("<a href='/upload/" + t[1] + "." + t[2] + "' target='_blank'>") + ("<img src='/upload/" + t[1] + "." + t[2] + "' border='none'></a>"));
              break;
            case !(t = inner.match(/^(https?:\/\/[^ ]+) (.*)\.(jpg|jpeg|jpe|png|gif)$/i)):
              matched.push("<a href='" + t[1] + "' target='_blank'><img src='" + t[2] + "." + t[3] + "' border='none'></a>");
              break;
            case !(t = inner.match(/^(https?:\/\/.+)\.(jpg|jpeg|jpe|png|gif)$/i)):
              matched.push("<a href='" + t[1] + "." + t[2] + "' target='_blank'><img src='" + t[1] + "." + t[2] + "' border='none'></a>");
              break;
            case !(t = inner.match(/^(.+)\.(png|icon)$/i)):
              link_to = null;
              img_url = null;
              if (t[1].match(/^@[\da-z_]+$/i)) {
                screen_name = t[1].replace(/^@/, "");
                link_to = "https://twitter.com/" + screen_name;
                img_url = "//twiticon.herokuapp.com/" + screen_name + "/mini";
              } else {
                link_to = "/" + wiki + "/" + t[1];
                img_url = link_to + "/icon";
              }
              matched.push(("<a href='" + link_to + "' class='link' target='_blank'>") + ("<img src='" + img_url + "' class='icon' height='24' border='0' alt='" + link_to + "' title='" + link_to + "' /></a>"));
              break;
            case !(t = inner.match(/^(.+)\.(png|icon|jpe?g|gif)[\*x×]([1-9][0-9]*)(|\.[0-9]+)$/)):
              link_to = "/" + wiki + "/" + t[1];
              img_url = link_to + "/icon";
              switch (false) {
                case !t[1].match(/^@[\da-z_]+$/i):
                  screen_name = t[1].replace(/^@/, "");
                  link_to = "https://twitter.com/" + screen_name;
                  img_url = "//twiticon.herokuapp.com/" + screen_name + "/mini";
                  break;
                case !t[1].match(/^https?:\/\/.+$/):
                  img_url = link_to = t[1] + "." + t[2];
              }
              count = Number(t[3]);
              icons = "<a href='" + link_to + "' class='link' target='_blank'>";
              (function() {
                results = [];
                for (var j = 0; 0 <= count ? j < count : j > count; 0 <= count ? j++ : j--){ results.push(j); }
                return results;
              }).apply(this).forEach(function(i) {
                return icons += "<img src='" + img_url + "' class='icon' height='24' border='0' alt='" + t[1] + "' title='" + t[1] + "' />";
              });
              if (t[4].length > 0) {
                odd = Number("0" + t[4]);
                icons += "<img src='" + img_url + "' class='icon' height='24' width='" + (24 * odd) + "' border='0' alt='" + link_to + "' title='" + link_to + "' />";
              }
              icons += '</a>';
              matched.push(icons);
              break;
            case !(t = inner.match(/^((https?|javascript):[^ ]+) (.*)$/)):
              target = t[1].replace(/"/g, '%22');
              matched.push("<a href='" + target + "' target='_blank'>" + t[3] + "</a>");
              break;
            case !(t = inner.match(/^((https?|javascript):[^ ]+)$/)):
              target = t[1].replace(/"/g, '%22');
              matched.push("<a href='" + target + "' class='link' target='_blank'>" + t[1] + "</a>");
              break;
            case !(t = inner.match(/^@([a-zA-Z0-9_]+)$/)):
              matched.push("<a href='https://twitter.com/" + t[1] + "' class='link' target='_blank'>@" + t[1] + "</a>");
              break;
            case !(t = inner.match(/^(.+)::$/)):
              matched.push("<a href='/" + t[1] + "' class='link' target='_blank' title='" + t[1] + "'>" + t[1] + "</a>");
              break;
            case !(t = inner.match(/^(.+):::(.+)$/)):
              wikiname = t[1];
              wikititle = t[2];
              url = "/" + wikiname + "/" + (encodeURIComponent(wikititle).replace(/%2F/g, "/"));
              matched.push("<a href='" + url + "' class='link' target='_blank' title='" + wikititle + "'>" + wikititle + "</a>");
              break;
            case !(t = inner.match(/^(.+)::(.+)$/)):
              wikiname = t[1];
              wikititle = t[2];
              wikiurl = "/" + wikiname + "/";
              url = "/" + wikiname + "/" + (encodeURIComponent(wikititle).replace(/%2F/g, "/"));
              matched.push(("<a href='" + wikiurl + "' class='link' target='_blank' title='" + wikiname + "'>" + wikiname) + ("</a>::<a href='" + url + "' class='link' target='_blank' title='" + wikititle + "'>" + wikititle + "</a>"));
              break;
            case !(t = inner.match(/^([a-fA-F0-9]{32})\.(\w+) (.*)$/)):
              matched.push("<a href='/upload/" + t[1] + "." + t[2] + "' class='link'>" + t[3] + "</a>");
              break;
            case !inner.match(/^([EW]\d+\.\d+[\d\.]*[NS]\d+\.\d+[\d\.]*|[NS]\d+\.\d+[\d\.]+[EW]\d+\.\d+[\d\.]*)(Z\d+)?$/):
              o = parseloc(inner);
              s = "<div id='map' style='width:300px;height:300px'></div>\n<div id='line1' style='position:absolute;width:300px;height:4px;\n  background-color:rgba(200,200,200,0.3);'></div>\n<div id='line2' style='position:absolute;width:4px;height:300px;\n  background-color:rgba(200,200,200,0.3);'></div>\n<script type='text/javascript'>\nvar mapOptions = {\n  center: new google.maps.LatLng(" + o.lat + "," + o.lng + "),\n  zoom: " + (+o.zoom) + ",\n  mapTypeId: google.maps.MapTypeId.ROADMAP\n};\nvar mapdiv = document.getElementById('map');\nvar map = new google.maps.Map(mapdiv,mapOptions);\nvar linediv1 = document.getElementById('line1');\nvar linediv2 = document.getElementById('line2');\ngoogle.maps.event.addListener(map, 'idle', function() {\n  linediv1.style.top = mapdiv.offsetTop+150-2;\n  linediv1.style.left = mapdiv.offsetLeft;\n  linediv2.style.top = mapdiv.offsetTop;\n  linediv2.style.left = mapdiv.offsetLeft+150-2;\n});\n// google.maps.event.addListener(map, 'mouseup', function() {\n//   var latlng = map.getCenter();\n//   var o = {};\n//   o.lng = latlng.lng();\n//   o.lat = latlng.lat();\n//   o.zoom = map.getZoom();\n//   ew = '[EW]\\d+\\.\\d+[\\d\\.]*';\n//   ns = '[NS]\\d+\\.\\d+[\\d\\.]*';\n//   s = \"\\[\\[(\"+ew+ns+\"|\"+ns+ew+\")(Z\\d+)?\\]\\]\";\n//   r = new RegExp(s);\n//   for(var i=0;i<data.length;i++){\n//     data[i] = data[i].replace(r,'[[" + (locstr(o)) + "]]');\n//   }\n//   writedata();\n// });";
              matched.push(s);
              break;
            default:
              _keywords.push(inner);
              matched.push("<a href='/" + wiki + "/" + inner + "' class='tag' target='_blank'>" + inner + "</a>");
          }
          s = pre + "<<<" + (matched.length - 1) + ">>>" + post;
        }
        return s;
      });
      (function() {
        results = [];
        for (var j = 0, ref = elements.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).forEach(function(i) {
        var all, inner, m, post, pre, results;
        results = [];
        while (m = elements[i].match(/^(.*)<<<(\d+)>>>(.*)$/)) {
          all = m[0], pre = m[1], inner = m[2], post = m[3];
          results.push(elements[i] = "" + pre + matched[inner] + post);
        }
        return results;
      });
      return {
        elements: elements,
        keywords: _keywords
      };
    };

    GyazzTag.prototype.expand = function(s, wiki, title, lineno) {
      var e, elements, j, ref, results;
      e = _tag_expand.call(this, s, wiki, title);
      elements = e.elements;
      (function() {
        results = [];
        for (var j = 0, ref = elements.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).forEach(function(i) {
        return elements[i] = "<span id='e" + lineno + "_" + i + "'>" + elements[i] + "</span>";
      });
      return elements.join(' ');
    };

    GyazzTag.prototype.keywords = function(s, wiki, title, lineno) {
      var e;
      e = _tag_expand.call(this, s, wiki, title);
      return e.keywords;
    };

    return GyazzTag;

  })();

  window.GyazzTag = GyazzTag;

}).call(this);

//# sourceMappingURL=gyazz_tag.js.map
