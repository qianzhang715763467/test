// 方法调用
public class Demo4 {
	// main 为主方法； 自动执行
	public static void main(String[] args) {
		Demo4 demo = new Demo4();// 实例化主方法
		
		int a = 5,
			b = 2,
			c = demo.max(a,b);// 使用实例化后的主方法调用局部方法max
		System.out.println(a+" 和  "+ b +" 比较，最大的是 "+c);
	};
	//  如果未使用 关键字 static 定义方法，则必须先实例化后用主方法调用；   此方法为局部方法
	public int max(int num1, int num2) {
		int result;
		result = num1 > num2 ? num1 : num2;
		return result;
	}
//  使用 关键字 static 定义方法，可以省略类名直接在主方法调用；                   此方法为成员方法
//	public static int max(int num1, int num2) {
//		int result;
//		result = num1 > num2 ? num1 : num2;
//		return result;
//	}
}