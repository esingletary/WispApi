package wisp

uses gw.lang.reflect.json.Json
uses org.jasypt.exceptions.EncryptionOperationNotPossibleException
uses spark.Spark

class WispApi {
  static function main(args: String[]) {
    var _wisps = new HashMap<String, Wisp>()

    Spark.post("/create", \ req, res -> {
      var createWispRequest: Dynamic = Json.fromJson(req.body())
      var wisp = new Wisp(:wispId = createWispRequest.id, :wispContents = createWispRequest.contents,
          :wispPassword = createWispRequest.password)
      _wisps.put(wisp.id, wisp)
      return wisp.encryptedContents
    })

    Spark.post("/retrieve", \ req, res -> {
      var retrieveWispRequest: Dynamic = Json.fromJson(req.body())
      if (_wisps.containsKey(retrieveWispRequest.id)) {
        var wisp = _wisps.get(retrieveWispRequest.id)
        var decryptedWisp = wisp.decryptWisp(retrieveWispRequest.password)
        if (decryptedWisp == null) {
          res.status(401)
          return "Unauthorized"
        }
        return decryptedWisp
      } else {
        res.status(404)
        return "Wisp not found"
      }
    })
  }
}