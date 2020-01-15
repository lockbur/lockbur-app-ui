<template lang="html">
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      options: {
        type: Object,
        default: function () {
          return {
            selector: ".flex-images",
            container: '.item',
            object: 'img',
            rowHeight: 180,
            maxRows: 0,
            truncate: 0
          }
        }
      }
    },
    methods: {
      init: function () {
        if (!document.querySelector) {
          return;
        }
        var opt = {
          selector: ".flex-images",
          container: this.options.container,
          object: this.options.object,
          rowHeight: this.options.rowHeight,
          maxRows: this.options.maxRows,
          truncate: this.options.truncate
        };
        var grids = typeof opt.selector == 'object' ? [opt.selector] : document.querySelectorAll(opt.selector);
        for (var i = 0; i < grids.length; i++) {
          var grid = grids[i], containers = grid.querySelectorAll(opt.container), items = [], t = new Date().getTime();
          if (!containers.length) {
            continue;
          }
          var s = window.getComputedStyle ? getComputedStyle(containers[0], null) : containers[0].currentStyle;
          var marginLeft = parseInt(s.marginLeft) || 0;
          var marginRight = parseInt(s.marginRight) || 0;
          var borderLeftWidth = Math.round(parseFloat(s.borderLeftWidth)) || 0;
          var borderRightWidth = Math.round(parseFloat(s.borderRightWidth)) || 0;
          opt.margin = marginLeft + marginRight + borderLeftWidth + borderRightWidth;
          for (var j = 0; j < containers.length; j++) {
            var c = containers[j],
              w = parseInt(c.getAttribute('data-w')),
              norm_w = w * (opt.rowHeight / parseInt(c.getAttribute('data-h'))), // normalized width
              obj = c.querySelector(opt.object);
            items.push([c, w, norm_w, obj, obj.getAttribute('data-src')]);
          }
          this.makeGrid(grid, items, opt);
          var tempf = function () {
            this.makeGrid(grid, items, opt);
          };
          if (document.addEventListener) {
            window['flexImages_listener' + t] = tempf;
            window.removeEventListener('resize', window['flexImages_listener' + grid.getAttribute('data-flex-t')]);
            delete window['flexImages_listener' + grid.getAttribute('data-flex-t')];
            window.addEventListener('resize', window['flexImages_listener' + t]);
          } else {
            grid.onresize = tempf;
          }
          grid.setAttribute('data-flex-t', t)
        }
      },
      makeGrid: function (grid, items, opt, noresize) {
        var x, new_w, exact_w, ratio = 1, rows = 1, max_w = grid.clientWidth - 2, row = [], row_width = 0, h,
          row_h = opt.rowHeight;

        // define inside makeGrid to access variables in scope
        function _helper(lastRow) {
          if (opt.maxRows && rows > opt.maxRows || opt.truncate && lastRow && rows > 1) {
            row[x][0].style.display = 'none';
          } else {
            if (row[x][4]) {
              row[x][3].setAttribute('src', row[x][4]);
              row[x][4] = '';
            }
            row[x][0].style.width = new_w + 'px';
            row[x][0].style.height = row_h + 'px';
            row[x][0].style.display = 'block';
          }
        }

        for (var i = 0; i < items.length; i++) {
          row.push(items[i]);
          row_width += items[i][2] + opt.margin;
          if (row_width >= max_w) {
            var margins_in_row = row.length * opt.margin;
            ratio = (max_w - margins_in_row) / (row_width - margins_in_row), row_h = Math.ceil(opt.rowHeight * ratio), exact_w = 0, new_w;
            for (x = 0; x < row.length; x++) {
              new_w = Math.ceil(row[x][2] * ratio);
              exact_w += new_w + opt.margin;
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
          new_w = Math.floor(row[x][2] * ratio), h = Math.floor(opt.rowHeight * ratio);
          _helper(true);
        }

        // scroll bars added or removed during rendering new layout?
        if (!noresize && max_w != grid.clientWidth) {
          this.makeGrid(grid, items, opt, true);
        }
      }
    }
  }
</script>

<style scoped>
  .flex-images {
    overflow: hidden;
  }

  .flex-images .item {
    float: left;
    margin: 2px;
    border: 1px solid #eee;
    box-sizing: content-box;
    overflow: hidden;
    position: relative;
  }

  .flex-images .item img {
    display: block;
    width: auto;
    height: 100%;
  }
</style>

