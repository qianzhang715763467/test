
public class Demo1 {
	static char a = '1';
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.print(a);
		System.out.print("\n");
		System.out.println("ssssss");
		
		// 整型
		byte 	by = 127;	
		short	sh = 32767;
		int     in = 2147483647;
		long 	l = 10;
		
		float 	f = 1.1f; // 单精度浮点型，后面+f
		double 	d = 0.9;  // 双精度浮点型
		boolean b = true;
		char	c = 'c';  // 字符 型 != 字符串  *值得长度只能为1，单引号
		String  s = "sdsfefe";// 字符串必须是双引号
		
		final double PI = 3.1415927;
		int pi = (int)PI;
		int age = 0;
		
		System.out.print(pi);
		System.out.println(age);
		
		
		
		for(int i  = 9; i >= 1; i--) {
			for(int j = 1; j <= i; j++) {
				int size = i*j;
				if(size < 10) {
					System.out.print(j+"x"+i+"="+size+"   ");
				}else {
					System.out.print(j+"x"+i+"="+size+"  ");
				}
			}
			System.out.println("\n");
		}
	}

}