tableToExcel: function (tableList, name) {
  var tables = [],
      uri = 'data:application/vnd.ms-excel;base64,',
      template = Handlebars.compile('<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{{worksheet}}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{{#each tables}}<table>{{{this}}}</table>{{/each}}</body></html>');

  for (var i = 0; i < tableList.length; i++) {
    tables.push(tableList[i].innerHTML);
  }
  var data = {
    worksheet: name || 'Worksheet',
    tables: tables
  };
  return uri + base64(template(data));
},
exportHandler: function (event) {
  var tables = this.$('table'),
      table = null;
  tables.each(function (i) {
    var t = $('<table><thead></thead><tbody></tobdy></table>');
    t.find('thead').html(this.tHead.innerHTML);
    t.find('tbody').append($(this.tBodies).children(':visible').clone());
    t.find('.not-print').remove(); // not-print 是@media print中不会打印的部分
    t.find('a').replaceWith(function (i) { // 表格中不再需要的超链接也移除了
      return this.innerHTML;
    });
    table = table ? table.add(t) : t;
  });
  event.currentTarget.href = Dianjoy.utils.tableToExcel(table, '广告数据');
}
