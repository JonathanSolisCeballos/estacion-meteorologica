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

//Time
#include <TimeLib.h>

//Firebase
#define FIREBASE_HOST "invernadero-iot-2020.firebaseio.com" //Without http:// or https:// schemes
#define FIREBASE_AUTH "PhpIGPF49PPvmCTPMQpS1SWqnLI3c5x0f7Oc0Ytx"
#define WIFI_SSID ""
#define WIFI_PASSWORD ""
String ID_NAVE = "1";
FirebaseData firebaseData;
FirebaseJson firebaseJson;

//DHT11 
#define DHTPIN 0 //D3
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
#define ALTITUDE 470 //metros

//LEDs sensores
#define D8 15 //PresAbs
#define D7 13 //PresRel
#define D6 12 //Alt
#define D5 14 //Temp
#define D4 02 //Hum

//Globales para los LEDs
float gTemp = -1;
float gPres = -1;
float gPresRel = -1;
float gAlt = -1;
float gHum = -1;

//IDs cada sensor
String idTemp = "";
String idAlt = "";
String idHum = "";
String idPres = "";
String idLuz = "";
String idPresRel = "";

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

  //Hr-Min-Sec DD-MM-YY
  setTime(11,10,00,14,06,2020);

  //Crear nave en BD
  ID_NAVE = initNewNave();

  //Eliminar sensores actuales
  Firebase.deleteNode(firebaseData, "/sensores"); 
  initSensors();

  //Pines LEDs modo salida
  pinMode(D8, OUTPUT);
  pinMode(D7, OUTPUT);
  pinMode(D6, OUTPUT);
  pinMode(D5, OUTPUT);
  pinMode(D4, OUTPUT);
  
  Serial.println("------------------------------------");
}

void loop()
{   
  //DHT11
  dht11Sensor();   

  //Fotorresistor
  fotorresistor();

  //BMP180
  bmp180Sensor();

  Serial.println("------------------------------------");
}

String initNewNave(){
  firebaseJson.add("descripcion", "Add description");
  firebaseJson.add("nombre", "Add a name");
  firebaseJson.add("ubicacion", "Add location");

  if(Firebase.pushJSON(firebaseData, "/naves/", firebaseJson))
    Serial.println(firebaseData.pushName());
  else Serial.println(firebaseData.errorReason());
  firebaseJson.clear();

  return (String)firebaseData.pushName();
}

void dht11Sensor(){
  //DHT11
  float hum = dht.readHumidity();
  float temp = dht.readTemperature();

  //Validar si falló la lectura
  if (isnan(hum) || isnan(temp)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }

  //Enviar valores Firebase
  //Temperatura
  firebaseJson.add("dato", temp);
  firebaseJson.add("createdAt", (String)now());
  
  if(Firebase.pushJSON(firebaseData, "/sensores/"+ idTemp +"/datos/", firebaseJson))
    Serial.println(firebaseData.dataPath() + "/"+ firebaseData.pushName());
  else Serial.println(firebaseData.errorReason());
  firebaseJson.clear();

  //Humedad
  firebaseJson.add("dato", hum);
  firebaseJson.add("createdAt", (String)now());
  
  if(Firebase.pushJSON(firebaseData, "/sensores/"+ idHum +"/datos/", firebaseJson))
    Serial.println(firebaseData.dataPath() + "/"+ firebaseData.pushName());
  else Serial.println(firebaseData.errorReason());
  firebaseJson.clear();

  printVal("Humidity: ", (String)hum, "%");
  printVal("Temperature: ", (String)temp, "°C");

  gTemp = temp;
  gHum = hum;
  ledsControl(); 
}

void fotorresistor(){
  float luz = analogRead(A0);
  Serial.println("Luz: " + (String)luz);

  //Luz
  firebaseJson.add("dato", luz);
  firebaseJson.add("createdAt", (String)now());

  if(Firebase.pushJSON(firebaseData, "/sensores/"+ idLuz +"/datos/", firebaseJson))
    Serial.println(firebaseData.dataPath() + "/"+ firebaseData.pushName());
  else Serial.println(firebaseData.errorReason());
  firebaseJson.clear();
  ledsControl();
}

void bmp180Sensor(){
  //BMP180
  char status;
  double temp, pres, pSeaLevel, alt;

  Serial.println("BMP180");

  status = bmp180.startTemperature();
  if (status != 0){
    delay(status);
    status = bmp180.getTemperature(temp);
    
    if (status != 0){      
      printVal("Temp: ", (String)temp, "°C");
      
      status = bmp180.startPressure(3);
      if (status != 0){
        delay(status);    
        status = bmp180.getPressure(pres, temp);
        
        if (status != 0){          
          printVal("PresAbs: ", (String)pres, "mb");

          pSeaLevel = bmp180.sealevel(pres, ALTITUDE);                       
          printVal("PresRel: ", (String)pSeaLevel, "mb"); 

          alt = bmp180.altitude(pres, pSeaLevel);          
          printVal("Altitude: ", (String)alt, "m");
                    
          //Presión absoluta 
          firebaseJson.add("dato", pres);
          firebaseJson.add("createdAt", (String)now());

          if(Firebase.pushJSON(firebaseData, "/sensores/"+ idPres +"/datos/", firebaseJson))
            Serial.println(firebaseData.dataPath() + "/"+ firebaseData.pushName());
          else Serial.println(firebaseData.errorReason());
          firebaseJson.clear();

          //Presión relativa        
          firebaseJson.add("dato", pSeaLevel);
          firebaseJson.add("createdAt", (String)now());

          if(Firebase.pushJSON(firebaseData, "/sensores/"+ idPresRel +"/datos/", firebaseJson))
            Serial.println(firebaseData.dataPath() + "/"+ firebaseData.pushName());
          else Serial.println(firebaseData.errorReason());
          firebaseJson.clear();

          //Altitud
          firebaseJson.add("dato", alt);
          firebaseJson.add("createdAt", (String)now());          
          
          if(Firebase.pushJSON(firebaseData, "/sensores/"+ idAlt +"/datos/", firebaseJson))
            Serial.println(firebaseData.dataPath() + "/"+ firebaseData.pushName());
          else Serial.println(firebaseData.errorReason()); 
          firebaseJson.clear();

          //Valores para ledControl
          gPres = pres;
          gPresRel = pSeaLevel;
          gAlt = alt;
          ledsControl(); 
        }
        else Serial.println("error retrieving pressure measurement\n");
      }
      else Serial.println("error starting pressure measurement\n");
    }
    else Serial.println("error retrieving temperature measurement\n");
  }
  else Serial.println("error starting temperature measurement\n");
}

void blinkLEDFast(int led){
  int i = 3;
  while(i >= 0){
    i = i - 1;
    digitalWrite(led, HIGH);
    delay(50);
    digitalWrite(led, LOW);
    delay(50);
  }   
}

void blinkLEDSlow(int led){   
  digitalWrite(led, HIGH);
  delay(600);
  digitalWrite(led, LOW);
}

float readValue(String sensor, String type){
  float valor = NULL;
  if (!Firebase.getFloat(firebaseData, "/sensores/"+ sensor +"/" + type)){
   Serial.println(firebaseData.errorReason()); 
   Serial.println(firebaseData.floatData()); 
  }else{
    printVal(sensor, " - ", (String)firebaseData.floatData());
    valor = (float)firebaseData.floatData();
  }
  return valor;  
}

void ledControl(String sensor, int pin, float valSensor){
  float maxValue, minValue;

  maxValue = readValue(sensor, "maxVal");
  if(valSensor >= maxValue && maxValue != NULL){
    Serial.println("Fast");
    blinkLEDFast(pin);
  }
  minValue = readValue(sensor, "minVal");      
  if(valSensor <= minValue && maxValue != NULL){
    Serial.println("Slow");
    blinkLEDSlow(pin);  
  }
}

void ledsControl(){
  //gPres - D8
  ledControl(idPres, D8, gPres);

  //gPresRel - D7
  ledControl(idPresRel, D7, gPresRel);

  //gAlt - D6
  ledControl(idAlt, D6, gAlt);

  //gTemp - D5
  ledControl(idTemp, D5, gTemp);

  //gHum - D4
  ledControl(idHum, D4, gHum);
}

void initSensors(){
  idTemp = initSensor("Temperatura");
  idHum = initSensor("Humedad");
  idAlt = initSensor("Altitud");
  idPres = initSensor("Presión absoluta");
  idPresRel = initSensor("Presión relativa");
  idLuz = initSensor("Fotorresistor");
}

String initSensor(String nombre){
  //Luz
  firebaseJson.add("nombre", nombre);
  firebaseJson.add("datos", "");
  firebaseJson.add("minVal", NULL);
  firebaseJson.add("maxVal", NULL);
  firebaseJson.add("msgMinVal", "");
  firebaseJson.add("msgMaxVal", "");

  if(Firebase.pushJSON(firebaseData, "/sensores/", firebaseJson))
    Serial.println(firebaseData.dataPath() + "/"+ firebaseData.pushName());
  else Serial.println(firebaseData.errorReason());
  firebaseJson.clear();
  return (String)firebaseData.pushName();  
}

void printVal(String val1, String val2, String val3){
  Serial.print(val1);
  Serial.print(val2);
  Serial.println(val3);
}
