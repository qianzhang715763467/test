// * ��������ת�� *
// ��������װ�� ������ת�͡�
// ����������ת�� ������ת�͡� ����������������ת�ͺ󣬲���������ת��
// * ���ܽ�����Ķ���ǿ��ת��Ϊ�������ͣ�ֻ�ܽ�����ת�͵���������ٴ�ת��Ϊ�������

public class Instanceof {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SuperClass sup = new SuperClass();
		SuberClass sub = new SuberClass();
		
		// sup ����SuberClass���ʵ��
		if(sup instanceof SuberClass) {
			SuberClass  sub1 = (SuberClass)sup;
		}else {
			System.out.println("1����ת��");
		}
		
		sup = sub; // ������װ����������
		// ��������ĸ�ֵ�����ʱ�� sup �� SuberClass ���ʵ��
		//��Ϊ����ת�ʹ��ڷ��գ������ڽ��յ������һ������ʱ�������ʹ�� instanceof ��������жϸö����Ƿ�������Ҫ�����࣬
		if(sup instanceof SuberClass) {
			SuberClass sub2 = (SuberClass)sup;// ����ת��
		}else {
			System.out.println("2����ת��");
		}
	}

}

class SuprClass {

}
class SuberClass extends SuperClass {
	
}