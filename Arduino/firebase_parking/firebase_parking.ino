#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

#define FIREBASE_HOST "parkingdata-cfe80-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "9Ud08jum3oCFD07tW4jinCHDOladiarYINSWs6Jp"
#define WIFI_SSID "Avinash"
#define WIFI_PASSWORD "Avi7071955977"

FirebaseData fbdo;

void setup()
{
  Serial.begin(115200);
  Serial.println();
  Serial.println();


  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  fbdo.setBSSLBufferSize(1024, 1024);
  fbdo.setResponseSize(1024);

  Serial.println("Set Timestamp test...");
}

void loop()
{
  float humidity = 100;
  float temperature = 1000;
  float fahrenheit = 300;
  
  //Also can use Firebase.set instead of Firebase.setDouble
  Firebase.setDouble(fbdo,"currentWeather/humidity", humidity);
  Firebase.setFloat(fbdo,"currentWeather/temperature", temperature);
  Firebase.setFloat(fbdo,"currentWeather/fahrenheit", fahrenheit);
  Firebase.setTimestamp(fbdo,"currentWeather/date");
  delay(5000);
//  if (Firebase.setTimestamp(fbdo,"Date/Set/Timestamp"))
//  {
//    Serial.println("PASSED");
//    Serial.println("PATH: " + fbdo.dataPath());
//    Serial.println("TYPE: " + fbdo.dataType());

//    //Timestamp saved in millisecond, get its seconds from intData()
//    Serial.print("TIMESTAMP (Seconds): ");
//    Serial.println(fbdo.intData());

//    //Or print the total milliseconds from doubleData()
//    //Due to bugs in Serial.print in Arduino library, use printf to print double instead.
//    printf("TIMESTAMP (milliSeconds): %.0lf\n", fbdo.doubleData());

//    //Or print it from payload directly
//    Serial.print("TIMESTAMP (milliSeconds): ");
//    Serial.println(fbdo.payload());

//    //Due to some internal server error, ETag cannot get from setTimestamp
//    //Try to get ETag manually
//    //Serial.println("ETag: " + Firebase.getETag(fbdo, "/Set/Timestamp"));
//    Serial.println("------------------------------------");
//    Serial.println();
//  }
//  else
//  {
//    Serial.println("FAILED");
//    Serial.println("REASON: " + fbdo.errorReason());
//    Serial.println("------------------------------------");
//    Serial.println();
//  }

}
