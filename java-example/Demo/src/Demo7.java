
public class Demo7 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		p2 sc = new p2();
		p2 sc2 = new p2(200); 
		sc.p2();
	}

}

class p1 {
	private int n;
	p1(){
	    System.out.println("SuperClass()");
	  }
	p1(int n) {
	    System.out.println("SuperClass(int n)");
	    this.n = n;
	  }
	void go(int n){
		System.out.println(n);
	}
}
class p2 extends p1{
	 private int n;
	  
	 p2(){
	    super(300); // ���û�� super��ȷָ�����ĸ���������Ĭ���ҵ�������޲η�����
	    System.out.println("SubClass");
	  }  
	  
	  public p2(int n){
	    System.out.println("SubClass(int n):"+n);
	    this.n = n;
	  }
	  
	  void p2(){
		  super.go(300); // ���ø��෽��
		  
		  System.out.println("p2() > go()");
	  }
}