(function() {
  var GyazzUpload;

  GyazzUpload = (function() {
    var _sendfile;

    function GyazzUpload() {}

    GyazzUpload.prototype.init = function(gb, gs, gd) {
      this.gb = gb;
      this.gs = gs;
      return this.gd = gd;
    };

    GyazzUpload.prototype.sendfiles = function(files) {
      var j, ref, results;
      return (function() {
        results = [];
        for (var j = 0, ref = files.length; 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--){ results.push(j); }
        return results;
      }).apply(this).forEach((function(_this) {
        return function(i) {
          var file;
          file = files[i];
          return _sendfile.call(_this, file, function(filename) {
            _this.gb.editline = _this.gb.data.length;
            if (filename.match(/\.(jpg|jpeg|png|gif)$/i)) {
              _this.gb.data[_this.gb.editline] = "[[[" + filename + "]]]";
            } else {
              _this.gb.data[_this.gb.editline] = "[[" + filename + " " + file.name + "]]";
            }
            _this.gs.writedata(_this.gb.data);
            _this.gb.editline = -1;
            return _this.gd.display(_this.gb, true);
          });
        };
      })(this));
    };

    _sendfile = function(file, callback) {
      var fd;
      fd = new FormData;
      fd.append('uploadfile', file);
      notifyBox.print("uploading..", {
        progress: true
      }).show();
      $.ajax({
        url: "/__upload",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        dataType: 'text',
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('upload fail');
          notifyBox.print("upload fail").show(3000);
          return this;
        },
        success: function(data) {
          notifyBox.print("upload success!!").show(1000);
          return callback(data);
        }
      });
      return false;
    };

    return GyazzUpload;

  })();

  window.GyazzUpload = GyazzUpload;

}).call(this);

//# sourceMappingURL=gyazz_upload.js.map
