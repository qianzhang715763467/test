
public class arrayDemo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int size = 10;
		StringBuilder[] myArr = new StringBuilder[size];
		// �������Ԫ��
		for (int i = 0; i < size; i++) {
			String s = String.valueOf(i); // ����ת�ַ���
			StringBuilder ss = new StringBuilder(s);// �ַ���ת StringBuilder
			ss.append('0');
			myArr[i] = ss;
		}
		// ��ӡ����Ԫ��
		for (StringBuilder element : myArr) {
			System.out.println(element);
		}
	}

}
