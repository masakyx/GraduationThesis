(function() {
  $(function() {
    return window.notifyBox = new (function(target) {
      var box, img, self, textBox;
      img = $("<img>").attr("src", "/progress.png").hide();
      textBox = $("<span>").css({
        margin: "5px"
      });
      box = $("<div>").addClass("notifyBox").css({
        position: "fixed",
        right: "10px",
        bottom: "10px",
        "background-color": "#EEE"
      }).append(textBox).append(img);
      $("html").append(box);
      self = this;
      this.print = function(str, opts) {
        if (!opts) {
          opts = {};
        }
        textBox.text(str);
        if (opts.progress) {
          img.show();
        } else {
          img.hide();
        }
        return self;
      };
      this.show = function(timeout) {
        box.show();
        if (typeof timeout === 'number' && timeout > 0) {
          setTimeout(function() {
            return box.fadeOut(800);
          }, timeout);
        }
        return self;
      };
      this.hide = function() {
        box.hide();
        return self;
      };
      return self;
    })();
  });

}).call(this);

//# sourceMappingURL=gyazz_notification.js.map
