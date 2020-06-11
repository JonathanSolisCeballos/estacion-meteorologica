//Firebase
#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>

//DHT11
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

//BMP180
#include <SFE_BMP180.h>
#include <Wire.h>
SFE_BMP180 bmp180;

//Firebase
#define FIREBASE_HOST "invernadero-iot-2020.firebaseio.com" //Without http:// or https:// schemes
#define FIREBASE_AUTH "PhpIGPF49PPvmCTPMQpS1SWqnLI3c5x0f7Oc0Ytx"
#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define PATH "/naves"
FirebaseData firebaseData;
FirebaseJson firebaseJson;

//DHT11 
#define DHTPIN 13 //D7
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
#define ALTITUDE 470 //metros

void setup()
{
  Serial.begin(115200);

  //Conexión a la red
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

  //Iniciar Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  //Set database read timeout to 1 minute (max 15 minutes)
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.setwriteSizeLimit(firebaseData, "tiny");

  //Iniciar el DHT11
  dht.begin();

  //Iniciar el BMP180
  if (bmp180.begin()) Serial.println("BMP180 init success");
  else Serial.println("BMP180 init fail\n\n");
  
  Serial.println("------------------------------------");
}

void loop()
{
  delay(1000);

  //DHT11
  dht11Sensor();
  
  //BMP180
  //bmp180Sensor();   
}

void tempSerial(float h, float t){
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.println(F("%"));
  
  Serial.print(F("Temperature: "));
  Serial.print(t);
  Serial.println(F("°C")); 
}

void dht11Sensor(){
  //DHT11
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  //Firebase
  FirebaseData fireData;
  FirebaseJson firebaseJson;

  //Validar si falló la lectura
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  //Enviar valores Firebase
  firebaseJson.add("dato", t);
  firebaseJson.add("createdAt", "11-06-20");
  
  if(Firebase.pushJSON(fireData, "/naves/1/sensores/temperatura/datos", firebaseJson)){
    Serial.println(fireData.dataPath());
    Serial.println(fireData.pushName());
    Serial.println(fireData.dataPath() + "/"+ fireData.pushName());
  } else Serial.println(fireData.errorReason());

  //Imprimir valores por Serial
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.println(F("%"));
  
  Serial.print(F("Temperature: "));
  Serial.print(t);
  Serial.println(F("°C")); 
  
}

void bmp180Sensor(){
  //BMP180
  char status;
  double temp, pres, pSeaLevel, alt;

  //Firebase
  FirebaseData fireData;
  FirebaseJson firebaseJson;

  status = bmp180.startTemperature();
  if (status != 0){
    delay(status);
    status = bmp180.getTemperature(temp);
    
    if (status != 0){
      Serial.print("Temperature: ");
      Serial.print(temp,2);
      Serial.println(F("°C"));
      
      status = bmp180.startPressure(3);
      if (status != 0){
        delay(status);    
        status = bmp180.getPressure(pres, temp);
        
        if (status != 0){
          Serial.print("Abs. pressure: ");
          Serial.print(pres, 2);
          Serial.println(" mb");     

          pSeaLevel = bmp180.sealevel(pres, ALTITUDE);
          Serial.print("Rel. pressure: ");
          Serial.print(pSeaLevel,2);
          Serial.println(" mb");              

          alt = bmp180.altitude(pres, pSeaLevel);
          Serial.print("Altitude: ");
          Serial.print(alt,2);
          Serial.println(" m"); 
          
          //Enviar valores Firebase     
          firebaseJson.add("absoluta", pres);
          firebaseJson.add("relativa", pSeaLevel);
          firebaseJson.add("altitud", alt);
          firebaseJson.add("createdAt", "11-06-20");
          
          if(Firebase.pushJSON(fireData, "/naves/1/sensores/presion/datos", firebaseJson)){
            Serial.println(fireData.dataPath());
            Serial.println(fireData.pushName());
            Serial.println(fireData.dataPath() + "/"+ fireData.pushName());
          } else Serial.println(fireData.errorReason());
                    
        }
        else Serial.println("error retrieving pressure measurement\n");
      }
      else Serial.println("error starting pressure measurement\n");
    }
    else Serial.println("error retrieving temperature measurement\n");
  }
  else Serial.println("error starting temperature measurement\n");
}
