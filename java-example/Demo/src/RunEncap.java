import defaul2.EncapTest;

// 调用封装
public class RunEncap {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		EncapTest encap = new EncapTest();
		encap.setAge(33);
		encap.setName("老王");
		System.out.println("姓名："+ encap.getName());
		System.out.println("年龄："+encap.getAge());
	}

}
