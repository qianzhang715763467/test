public class Demo6 {
    public static void main(String[] args) throws ClassNotFoundException {
         
        Bread bread1 = new Bread();
        Bread bread2 = new Bread();
    }
}
 
 
class Bread {
    static{
        System.out.println("Bread is loaded");
    }
    public Bread() {
        System.out.println("bread");
    }
}