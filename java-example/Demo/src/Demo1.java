
public class Demo1 {
	static char a = '1';
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.print(a);
		System.out.print("\n");
		System.out.println("ssssss");
		
		// ����
		byte 	by = 127;	
		short	sh = 32767;
		int     in = 2147483647;
		long 	l = 10;
		
		float 	f = 1.1f; // �����ȸ����ͣ�����+f
		double 	d = 0.9;  // ˫���ȸ�����
		boolean b = true;
		char	c = 'c';  // �ַ� �� != �ַ���  *ֵ�ó���ֻ��Ϊ1��������
		String  s = "sdsfefe";// �ַ���������˫����
		
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