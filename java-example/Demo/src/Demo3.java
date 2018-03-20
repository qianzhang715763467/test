public class Demo3 {
    int a,b;    //a是要生成的菱形行数
    int h;      //h是方法中的参数，也是行数
    int i,j;    //i j是循环结构参数
    public void draw(int h ){
        for(i = 1 ;i <= h ;i++){         //逐行打印
            for(j = 1;j <= h;j++){       //每行打印个数与行数保持一致
                //下面语句是菱形四条边的函数，在边上的坐标点，打印*，否则打印空格
                if(j == (h + 3) / 2 - i || j == (h - 1) / 2 + i || j == i - (h - 1 ) / 2 || j == (3 * h + 1) / 2 - i){
                    System.out.print("*");
                }else{
                    System.out.print(" ");
                }            
            }    
            System.out.println();        //第 i 行打印完换行
        };
        
        int i = 3,
        	n = 5;
        i = i^n; // 异 或者 操作
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
				System.out.println("没有匹配成功");
    	}
    }
    
    public static void main(String[] args){       //静态方法
    	Demo3 b = new Demo3();                  //初始化方法
        int a = 35;                          //赋值并执行draw方法
        b.draw(a);
        b.Switch(a);
        
        String ss= "123214";
        ss += "ewtrete"; 
        System.out.println(ss);
        
        // 定义数组
        int size = 10;	// 数组大小
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
        
        // 计算元素总和
        double total = 0;
        for(int i = 0; i < size; i++) {
        	total += myArr[i];
        }
        System.out.println("总和为："+total);
        // for each 循环
        for(double e:myArr) {
        	System.out.println(e);
        }


        String str = "helloworld";
        char[] data = str.toCharArray();// 将字符串转为数组
        for (int x = 0; x < data.length; x++) {
            System.out.print(data[x] + "  ");
            data[x] -= 32;
            System.out.print(data[x] + "  ");
        }
        System.out.println(new String(data));
        
    }
}