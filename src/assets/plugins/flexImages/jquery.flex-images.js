/*
	jQuery flexImages v1.0.4
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/jQuery-flexImages
	License: http://www.opensource.org/licenses/mit-license.php
*/
(function ($) {
  $.fn.flexImages = function (options) {
    var o = $.extend({container: '.item', object: 'img', rowHeight: 180, maxRows: 0, truncate: 0}, options);
    return this.each(function () {
      var grid = $(this), containers = $(grid).find(o.container), items = [], t = new Date().getTime();
      var marginLeft = parseInt(containers.first().css("marginLeft")) || 0;
      var marginRight = parseInt(containers.first().css("marginRight")) || 0;
      var borderLeftWidth = Math.round(parseFloat(containers.first().css("borderLeftWidth"))) || 0;
      var borderRightWidth = Math.round(parseFloat(containers.first().css("borderRightWidth"))) || 0;
      o.margin = marginLeft + marginRight + borderLeftWidth + borderRightWidth;

      for (j = 0; j < containers.length; j++) {
        var c = containers[j],
          w = parseInt($(c).data('w')),
          norm_w = w * (o.rowHeight / parseInt($(c).data('h'))), // normalized width
          obj = $(c).find(o.object);
        items.push([c, w, norm_w, obj, obj.data('src')]);
      }
      makeGrid(grid, items, o);
      $(window).off('resize.flexImages' + grid.data('flex-t'));
      $(window).on('resize.flexImages' + t, function () {
        makeGrid(grid, items, o);//只有窗口变化时才触发
      });
      grid.data('flex-t', t)
    });
  }

  function makeGrid(grid, items, o, noresize) {
    var x, new_w, ratio = 1, rows = 1, max_w = grid.width() - 2, row = [], row_width = 0, row_h = o.rowHeight;
    if (!max_w) {
      max_w = grid.width() - 2; // IE < 8 bug
    }

    // define inside makeGrid to access variables in scope
    function _helper(lastRow) {
      if (o.maxRows && rows > o.maxRows || o.truncate && lastRow && rows > 1) {
        row[x][0].style.display = 'none';
      } else {
        if (row[x][4]) {
          row[x][3].attr('src', row[x][4]);
          //row[x][4] = '';
        }
        row[x][0].style.width = new_w + 'px';
        row[x][0].style.height = row_h + 'px';
        row[x][0].style.display = 'block';
      }
    }
    for (i = 0; i < items.length; i++) {
      row.push(items[i]);
      row_width += items[i][2] + o.margin;
      if (row_width >= max_w) {
        var margins_in_row = row.length * o.margin;
        var ratio = (max_w - margins_in_row) / (row_width - margins_in_row);
        var row_h = Math.ceil(o.rowHeight * ratio);
        var exact_w = 0;
        var new_w;
        for (x = 0; x < row.length; x++) {
          new_w = Math.ceil(row[x][2] * ratio);
          exact_w += new_w + o.margin;
          if (exact_w > max_w) new_w -= exact_w - max_w;
          _helper();
        }
        // reset for next row
        row = [], row_width = 0;
        rows++;
      }
    }
    // layout last row - match height of last row to previous row
    for (x = 0; x < row.length; x++) {
      new_w = Math.floor(row[x][2] * ratio), h = Math.floor(o.rowHeight * ratio);
      _helper(true);
    }

    // scroll bars added or removed during rendering new layout?
    if (!noresize && max_w != grid.width()) {
      makeGrid(grid, items, o, true);
    }
  }
}(jQuery));
