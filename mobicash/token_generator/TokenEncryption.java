import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Locale;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;

public class TokenEncryption {

  public static void main(String[] args) throws Exception {
    try {
      SimpleDateFormat dateformat = new SimpleDateFormat(
        "yyyyMMddHHmmss'Z'Z",
        Locale.UK
      );
      String timestamp = dateformat.format(new Date());
      String username = args[0];
      String password = args[1];
      String plaintext = timestamp + ":" + username + ":" + password;
      System.out.println("Plain Text = " + plaintext);
      byte plain[] = plaintext.getBytes("UTF-8");
      String secretkey = "B6280F633A862E98D95155A9C903F73A";
      byte[] key = Hex.decodeHex(secretkey.toCharArray());
      System.out.println("Plain Hex = " + Hex.encodeHexString(plain));
      SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
      IvParameterSpec iv = new IvParameterSpec(new byte[cipher.getBlockSize()]);
      cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
      byte encrypted[] = cipher.doFinal(plain, 0, plain.length);
      System.out.println("Encrypted Hex = " + Hex.encodeHexString(encrypted));
      String encode = Base64.getEncoder().encodeToString(encrypted);
      System.out.println("Token Text = " + encode);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
