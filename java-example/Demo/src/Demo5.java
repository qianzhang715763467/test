// �ɱ����
public class Demo5{
	public static void main(String args[]) {
		// ���ÿɱ�����ķ���
		printMax(34,3,3,2,56.5);  // ��������
		printMax(new double[]{1,2,3,4,5,6}); // ��������
	}
	
	public static void printMax(double... numbers) {
		if(numbers.length == 0) {
			System.out.println("NO argument passed");
			return;
		}
		double result = numbers[0];
		for(int i = 1; i < numbers.length; i++) {
			if(numbers[i] > result) {
				result = numbers[i];
			}else {
				System.out.println(numbers[i]);
			}
		}
		System.out.println("The max value is "+ result);
	}
}