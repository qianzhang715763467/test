public class Demo3 {
    int a,b;    //a��Ҫ���ɵ���������
    int h;      //h�Ƿ����еĲ�����Ҳ������
    int i,j;    //i j��ѭ���ṹ����
    public void draw(int h ){
        for(i = 1 ;i <= h ;i++){         //���д�ӡ
            for(j = 1;j <= h;j++){       //ÿ�д�ӡ��������������һ��
                //������������������ߵĺ������ڱ��ϵ�����㣬��ӡ*�������ӡ�ո�
                if(j == (h + 3) / 2 - i || j == (h - 1) / 2 + i || j == i - (h - 1 ) / 2 || j == (3 * h + 1) / 2 - i){
                    System.out.print("*");
                }else{
                    System.out.print(" ");
                }            
            }    
            System.out.println();        //�� i �д�ӡ�껻��
        };
        
        int i = 3,
        	n = 5;
        i = i^n; // �� ���� ����
        n = i^n;
        i = i^n;
        System.out.println(i);
        System.out.println(n);
    }
    
    public void Switch(int expression) {
    	switch (expression) {
    		case 5:
    			System.out.println(expression);
    			break;
    		case 10 :
    			System.out.println(expression);
    			break;
			default:
				System.out.println("û��ƥ��ɹ�");
    	}
    }
    
    public static void main(String[] args){       //��̬����
    	Demo3 b = new Demo3();                  //��ʼ������
        int a = 35;                          //��ֵ��ִ��draw����
        b.draw(a);
        b.Switch(a);
        
        String ss= "123214";
        ss += "ewtrete"; 
        System.out.println(ss);
        
        // ��������
        int size = 10;	// �����С
        //double[] myArr = {"5.6","4.5","3.3","13.2","4.0","34.33","34.0","45.45","99.993","11123"};
        double[] myArr = new double[size];
        myArr[0] = 5.6;
        myArr[1] = 4.5;
        myArr[2] = 3.3;
        myArr[3] = 13.2;
        myArr[4] = 4.0;
        myArr[5] = 34.33;
        myArr[6] = 34.0;
        myArr[7] = 45.45;
        myArr[8] = 99.993;
        myArr[9] = 11123;
        
        // ����Ԫ���ܺ�
        double total = 0;
        for(int i = 0; i < size; i++) {
        	total += myArr[i];
        }
        System.out.println("�ܺ�Ϊ��"+total);
        // for each ѭ��
        for(double e:myArr) {
        	System.out.println(e);
        }


        String str = "helloworld";
        char[] data = str.toCharArray();// ���ַ���תΪ����
        for (int x = 0; x < data.length; x++) {
            System.out.print(data[x] + "  ");
            data[x] -= 32;
            System.out.print(data[x] + "  ");
        }
        System.out.println(new String(data));
        
    }
}