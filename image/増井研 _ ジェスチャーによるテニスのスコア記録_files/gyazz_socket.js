(function() {
  var GyazzSocket,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  GyazzSocket = (function() {
    var _oldstr;

    function GyazzSocket() {
      this.getdata = bind(this.getdata, this);
    }

    GyazzSocket.prototype.init = function(gb, gd, gt) {
      var query;
      query = "wiki=" + (encodeURIComponent(wiki)) + "&title=" + (encodeURIComponent(title));
      this.socket = io.connect(location.protocol + "//" + location.host + "?" + query);
      this.gb = gb;
      this.gd = gd;
      this.gt = gt;
      this.socket.on('pagedata', (function(_this) {
        return function(res) {
          var _data_old;
          _data_old = res['data'].concat();
          _this.gb.data = res.data.concat();
          _this.gb.datestr = res.date;
          _this.gb.timestamps = res.timestamps || [];
          return _this.gb.refresh();
        };
      })(this));
      return this.socket.on('after write', (function(_this) {
        return function(err) {
          if (err) {
            notifyBox.print(err).show(3000);
            return;
          }
          return notifyBox.show(1);
        };
      })(this));
    };

    GyazzSocket.prototype.getdata = function(opts, callback) {
      if (opts == null) {
        opts = {};
      }
      if (callback == null) {
        callback = function() {};
      }
      if (typeof opts !== 'object') {
        opts = {};
      }
      if (typeof opts.version !== 'number' || 0 > opts.version) {
        opts.version = 0;
      }
      return this.socket.emit('read', {
        opts: opts
      });
    };

    _oldstr = "";

    GyazzSocket.prototype.writedata = function(data) {
      var datastr, keywords;
      datastr = data.join("\n").replace(/\n+$/, '') + "\n";
      if (datastr === _oldstr) {
        return;
      }
      _oldstr = datastr;
      notifyBox.print("saving..", {
        progress: true
      }).show();
      keywords = _.flatten(data.map((function(_this) {
        return function(line) {
          return _this.gt.keywords(line, wiki, title, 0);
        };
      })(this)));
      return this.socket.emit('write', {
        data: datastr,
        keywords: keywords
      });
    };

    return GyazzSocket;

  })();

  window.GyazzSocket = GyazzSocket;

}).call(this);

//# sourceMappingURL=gyazz_socket.js.map
