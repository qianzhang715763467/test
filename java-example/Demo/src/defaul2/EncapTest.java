package defaul2;

// 封装
public class EncapTest {
	private int age;
	private String name;

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	// 存 this 存在的意义是为了解决  “实例变量”和“局部变量”之间的同名冲突
	public void setAge(int age) {
		this.age = age;
	}
	public void setName(String nameStr) {
		name = nameStr;
	}
	// 取
	public int getAge() {
		return age;
	}
	public String getName() {
		return name;
	}

}
