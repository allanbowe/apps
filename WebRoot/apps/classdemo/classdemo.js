"use strict";
$(document).ready(function(){
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    var strHostURL = 'http://dev-sasmidtier-machine.yourcompany.com:8080/';
  } else { strHostURL = null; }
  var adapter = new h54s({hostUrl: strHostURL});
  $('#btnRunFilter').on('click',function(){
    $('#hotContainer').empty();
    var dataset = [ { "FILTER" : $('#selFilter option:selected').val() } ];
    var h54sTables = new h54s.Tables(dataset,'H54sTable');
    adapter.call('/Web/classdemo', h54sTables, function (err, res) {
      if (err!=undefined) { console.log(err); return; }
      var i, cols = new Array;
      for (i in res.sasdata[0]) { cols.push(i); }
      var hot = new Handsontable($('#hotContainer').get(0), {
        data: res.sasdata
        , colHeaders: cols
        , columnSorting: true
        , sortIndicator: true
        , minSpareRows: 0
        , rowHeaders: false
        , manualColumnResize: true
        , manualRowResize: true
        , autoColSize: true
        , cells: function (row, col, prop) { return { readOnly: true }; }
      });  // end Handsontable build
    });  // end adaptor SAS call
  })  // end btnRunFilter click event
});
