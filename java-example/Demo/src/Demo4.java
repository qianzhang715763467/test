// ��������
public class Demo4 {
	// main Ϊ�������� �Զ�ִ��
	public static void main(String[] args) {
		Demo4 demo = new Demo4();// ʵ����������
		
		int a = 5,
			b = 2,
			c = demo.max(a,b);// ʹ��ʵ����������������þֲ�����max
		System.out.println(a+" ��  "+ b +" �Ƚϣ������� "+c);
	};
	//  ���δʹ�� �ؼ��� static ���巽�����������ʵ�����������������ã�   �˷���Ϊ�ֲ�����
	public int max(int num1, int num2) {
		int result;
		result = num1 > num2 ? num1 : num2;
		return result;
	}
//  ʹ�� �ؼ��� static ���巽��������ʡ������ֱ�������������ã�                   �˷���Ϊ��Ա����
//	public static int max(int num1, int num2) {
//		int result;
//		result = num1 > num2 ? num1 : num2;
//		return result;
//	}
}