(function() {
  var GyazzRelated;

  GyazzRelated = (function() {
    function GyazzRelated() {}

    GyazzRelated.prototype.getrelated = function(x) {
      return $.ajax({
        type: "GET",
        async: true,
        url: "/" + wiki + "/" + title + "/related",
        success: function(pages) {
          pages.map(function(page) {
            var b, div, div1, div2, g, iconCSS, icontext, imageurl, md5, r, repimage, title, url;
            title = page.title;
            repimage = page.repimage;
            imageurl = /^[0-9a-f]+\.(png|jpe?g|gif)$/.test(repimage) ? "/upload/" + repimage : /^[0-9a-f]+$/.test(repimage) ? "//gyazo.com/" + repimage + ".png" : repimage;
            url = "/" + wiki + "/" + title;
            if (repimage) {
              iconCSS = {
                'background-image': "url(" + imageurl + ")"
              };
              icontext = $('<span>').addClass('icontext overimage').text(title);
              div = $('<div>').addClass('icon').css(iconCSS).append(icontext);
              return $('#links').append($("<a>").attr('href', url).attr('target', '_blank').append(div));
            } else {
              md5 = MD5_hexhash(title);
              r = hex2(parseInt(md5.substr(0, 2), 16) * 0.5 + 16);
              g = hex2(parseInt(md5.substr(2, 2), 16) * 0.5 + 16);
              b = hex2(parseInt(md5.substr(4, 2), 16) * 0.5 + 16);
              div1 = $('<div>').addClass('icontext').text(title);
              div2 = $('<div>').addClass('icon').css('background-color', "\#" + r + g + b).append(div1);
              return $('#links').append($("<a>").attr({
                href: url,
                target: '_blank',
                "class": 'links'
              }).append(div2));
            }
          });
          return $('#links').append($('<br clear="all">'));
        },
        error: function() {
          return notifyBox.print("getrelated() fail").show(1000);
        }
      });
    };

    return GyazzRelated;

  })();

  window.GyazzRelated = GyazzRelated;

}).call(this);

//# sourceMappingURL=gyazz_related.js.map
