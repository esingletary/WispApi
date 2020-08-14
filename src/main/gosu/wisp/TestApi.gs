package wisp

uses spark.Request
uses spark.Response
uses spark.Spark

class TestApi {
  static function main(args: String[]) {
    Spark.get("/", \ req, res -> "Hello from Spark and GOSU!")
  }
}