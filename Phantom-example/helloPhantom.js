//====================== a phantomjs example =========================//

// "webpage" phantom����ģ��֮һ���ṩ�˷��ʣ�������ѡ��web�ĵ��Ľӿڡ�
var page = require('webpage').create();
// http��������ö����ύ��ʽ��
var settings = {
  operation: "POST",
  encoding: "utf8",
  headers: {
    "Content-Type": "application/json"
  },
  data: JSON.stringify({
    some: "data",
    another: ["custom", "data"]
  })
};
// �涨����ı����ʽ���������룻
phantom.outputEncoding="gbk";
// open��url,get,����,callback������
page.open("http://www.cnblogs.com/front-Thinking",settings,function(status) {
   // ���ص�״̬
   if ( status === "success" ) {
   // ״̬��ȷ����ӡ urlָ���ĵ���title��
      console.log(page.title); 
   } else {
      console.log("Page failed to load."); 
   }
   // �������н������˳� phantomjs ���л�����
   phantom.exit(0);
});