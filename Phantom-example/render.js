var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = { width: 1920, height: 1080 };
page.open("http://www.baidu.com", function start(status) {
  var title = page.evaluate(function(){
      return document.title;
  })
  console.log(title);
  page.render(title+'.jpeg', {format: 'jpeg', quality: '100'});
  phantom.exit();
});

// render�������ڽ���ҳ�����ͼƬ���������ָ�����ļ���÷�����ݺ�׺����ҳ����ɲ�ͬ�ĸ�ʽ��Ŀǰ֧��PNG��GIF��JPEG��PDF��
// �÷��������Խ���һ�����ö���format�ֶ�����ָ��ͼƬ��ʽ��quality�ֶ�����ָ��ͼƬ��������СΪ0�����Ϊ100��
