package wisp

uses org.jasypt.util.text.AES256TextEncryptor

class Wisp {
  var _id: String;
  var _contents: String;

  construct(wispId: String, wispContents: String, wispPassword: String) {
    _id = wispId;
    _contents = encryptWisp(wispContents, wispPassword);
  }

  construct(wispId: String, wispContents: String) {
    _id = id;
    _contents = wispContents;
  }

  property get id(): String {
    return _id
  }

  property get encryptedContents(): String {
    return _contents
  }

  final function encryptWisp(contentToEncrypt: String, password: String): String {
    print("Encrypting Wisp: ${_id}")
    try {
      var textEncryptor = new AES256TextEncryptor()
      textEncryptor.setPassword(password)
      var encryptedContent = textEncryptor.encrypt(contentToEncrypt)
      print("Successfully encrypted ${_id}: ${encryptedContent}")
      return encryptedContent
    } catch(e) {
      print("An error has occured when encrypting content")
      e.printStackTrace()
      return null;
    }

}
    final function decryptWisp(password: String): String {
      print("Decrypting Wisp: ${_id}")
      try {
        var textEncryptor = new AES256TextEncryptor();
        textEncryptor.setPassword(password);
        var decryptedContent = textEncryptor.decrypt(_contents);
        print("Successfully decrypted ${_id}: ${decryptedContent}")
        return decryptedContent
      } catch(e) {
        print("An error has occured (probably an invalid password)")
        return null;
      }
    }
}