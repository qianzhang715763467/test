package defaul2;

public class Salary extends Employee {
	private double salary; // ȫ�깤��

	public Salary(String name, String address, int number, double salary) {
		super(name, address, number); // 1
		setSalary(salary); // 2
	}

	public void mailCheck() {
		System.out.println("Salary ��� mailCheck ���� ");
		computePay();
		System.out.println("�ʼ�֧Ʊ����" + getName() + " ������Ϊ��" + salary);
	}

	public double getSalary() {
		return salary;
	}

	public void setSalary(double newSalary) {
		if (newSalary >= 0.0) {
			salary = newSalary;
		}
	}

	public double computePay() {
		System.out.println("���㹤�ʣ�������" + getName());
		return salary / 52;
	}
}