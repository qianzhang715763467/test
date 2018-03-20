
public class arrayDemo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int size = 10;
		StringBuilder[] myArr = new StringBuilder[size];
		// 添加数据元素
		for (int i = 0; i < size; i++) {
			String s = String.valueOf(i); // 数组转字符串
			StringBuilder ss = new StringBuilder(s);// 字符串转 StringBuilder
			ss.append('0');
			myArr[i] = ss;
		}
		// 打印数组元素
		for (StringBuilder element : myArr) {
			System.out.println(element);
		}
	}

}
