// * 对象类型转换 *
// 子类向父类装换 “向上转型”
// 父类向子类转换 “向下转型” 。子类对象必须向上转型后，才能再向下转型
// * 不能将父类的对象强制转换为子类类型，只能将向上转型的子类对象再次转换为子类对象

public class Instanceof {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SuperClass sup = new SuperClass();
		SuberClass sub = new SuberClass();
		
		// sup 不是SuberClass类的实例
		if(sup instanceof SuberClass) {
			SuberClass  sub1 = (SuberClass)sup;
		}else {
			System.out.println("1不能转换");
		}
		
		sup = sub; // 先向上装换，再向下
		// 经过上面的赋值，这个时候 sup 是 SuberClass 类的实例
		//因为向下转型存在风险，所以在接收到父类的一个引用时，请务必使用 instanceof 运算符来判断该对象是否是你所要的子类，
		if(sup instanceof SuberClass) {
			SuberClass sub2 = (SuberClass)sup;// 向下转型
		}else {
			System.out.println("2不能转型");
		}
	}

}

class SuprClass {

}
class SuberClass extends SuperClass {
	
}
