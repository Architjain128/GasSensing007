#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <ThingSpeak.h>
#include <ESP_Mail_Client.h>
#include "RTClib.h"
#include "mbedtls/aes.h"
// just some comment
const long CHANNEL = 1504402;
const char *WRITE_API = "ZHCU1BHIGMOIDMZU";
RTC_DS3231 rtc;

//int Gas_analog = 4;    // used for ESP32
#define Gas_analog 34   // used for ESP32

#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels
#define OLED_RESET     -1 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
#define LOGO_HEIGHT   16
#define LOGO_WIDTH    16

#define WIFI_SSID "realme 3"
#define WIFI_PASSWORD "pppppppp"
WiFiClient client;

#define SMTP_HOST "smtp.gmail.com"
#define SMTP_PORT 465
#define AUTHOR_EMAIL "eswtry@gmail.com"  /* The sign in credentials */
#define AUTHOR_PASSWORD "eswsms32"
#define RECIPIENT_EMAIL "sharma.palash021@gmail.com" /* Recipient's email*/
#define serverName "https://esw-onem2m.iiit.ac.in/~/in-cse/in-name/Team-15/Node-1/Data/"

SMTPSession smtp;
void smtpCallback(SMTP_Status status);

int freq = 2000;
int channel = 0;
int m2mInterval = 30;
int timeCount = 0;
int resolution = 8;
long prevMillisSensor = 0;
int intervalSensor = 2000;
long prevMillisThingSpeak = 0;
int intervalThingSpeak = 1000;

void encrypt(char * plainText, char * key, unsigned char * outputBuffer){
  mbedtls_aes_context aes;
  mbedtls_aes_init( &aes );
  mbedtls_aes_setkey_enc( &aes, (const unsigned char*) key, strlen(key) * 8 );
  mbedtls_aes_crypt_ecb( &aes, MBEDTLS_AES_ENCRYPT, (const unsigned char*)plainText, outputBuffer);
  mbedtls_aes_free( &aes );
}

void setup() {
  Serial.begin(115200);
  
  delay(10);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print('.');
  }
  Serial.println("\n Wifi Connected");
  ThingSpeak.begin(client); // Initialize ThingSpe

  if (! rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }
  rtc.adjust(DateTime(__DATE__, __TIME__));
  
  // SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { 
    Serial.println(F("SSD1306 allocation failed"));
    for(;;); // Don't proceed, loop forever
  }

  display.display();
  delay(2000); // Pause for 2 seconds
  display.clearDisplay();   // Clear the buffer
  display.drawPixel(10, 10, WHITE);
  display.display();  

  smtp.debug(1);
  smtp.callback(smtpCallback);
  delay(2000);
}

void loop() {
  int gassensorAnalog = analogRead(Gas_analog);
  Serial.println(gassensorAnalog);
  displayData(gassensorAnalog);
  
  // Connect or reconnect to WiFi
  checkConnection();
 
  bool aboveThreshold = false;
  if(gassensorAnalog > 3000){
    aboveThreshold = true;
    displayDanger();
    sendMail(gassensorAnalog);
  }
  ThingSpeak.setField(1, gassensorAnalog);
  ThingSpeak.setField(2, aboveThreshold);
  int x = ThingSpeak.writeFields(CHANNEL, WRITE_API);
  timeCount += 1;
  if(timeCount = 6) {
    timeCount = 0;
    sendDataToOneM2M(gassensorAnalog, aboveThreshold);
  }
  delay(5000);
}

void sendDataToOneM2M(int reading, bool aboveT) {
  HTTPClient http;
  // Your Domain name with URL path or IP address with path
  http.begin(serverName);
  // Specify content-type header
  http.addHeader("X-M2M-Origin", "fRZvzNA7Bp:i43Yn0WPem");
  http.addHeader("Content-Type", "application/json;ty=4");
  http.addHeader("Content-Length", "500");
  http.addHeader("Connection", "close");
  
  DateTime now = rtc.now();
  int sec = now.second(), minut = now.minute(), hr = now.hour(), mont = now.month(), dayy = now.day();
  String Sec = String(sec), Min = String(minut), Hr = String(hr), Month = String(mont), Day = String(dayy);
  if(sec < 10){
    Sec = "0" + Sec;
  }
  if(minut < 10) {
    Min = "0" + Min;
  }
  if(hr < 10) {
    Hr = "0" + Hr;
  }
  if(mont < 10) {
    Month = "0" + Month;
  }
  if(dayy < 10) {
    Day = "0" + Day;
  }
  String timeStamp = Hr + ":" + Min + ":" + Sec;
  String date = String(now.year()) + '/' + Month + '/' + Day;

  String message = String(reading);
  String p = "%$6@#2&*()__-+=;,.<>3/~`%$7@#^&8()55_-+9";
  int len = message.length();
  char ch;
  String encrypted_mes = "";
  for(int i = 0; i<len; ++i){
    ch = message[i];
        encrypted_mes += ch + p;      
  }

  mbedtls_aes_context aes;
  char *key = "zyqonqidsgqfshzz";
  char *input_text  ="2599.69";
//  unsigned char decrypted_text_output[16];
  unsigned char encrypted_text_output[16];
  encrypt(input_text, key, encrypted_text_output);
  String tempStr;

  for (int i = 0; i < 16; i++) {
    char str[1];
    sprintf(str, "%02x", (int)encrypted_text_output[i]);
    tempStr += str;
  }
  
  int httpResponseCode = http.POST("{\"m2m:cin\":{\"lbl\":[ \"Label-1\",\"Label-2\"],\"con\": \"[7  ," + date + " " + timeStamp + ", " +tempStr + "]\"}}");
  if(httpResponseCode>0){
    String response = http.getString();                       
    Serial.println(httpResponseCode);   
    Serial.println(response);
  }
}

/* Callback function to get the Email sending status */
void smtpCallback(SMTP_Status status){
  /* Print the current status */
  Serial.println(status.info());

  /* Print the sending result */
  if (status.success()){
    Serial.println("----------------");
    ESP_MAIL_PRINTF("Message sent success: %d\n", status.completedCount());
    ESP_MAIL_PRINTF("Message sent failled: %d\n", status.failedCount());
    Serial.println("----------------\n");
    struct tm dt;

    for (size_t i = 0; i < smtp.sendingResult.size(); i++){
      /* Get the result item */
      SMTP_Result result = smtp.sendingResult.getItem(i);
      time_t ts = (time_t)result.timestamp;
      localtime_r(&ts, &dt);

      ESP_MAIL_PRINTF("Message No: %d\n", i + 1);
      ESP_MAIL_PRINTF("Status: %s\n", result.completed ? "success" : "failed");
      ESP_MAIL_PRINTF("Date/Time: %d/%d/%d %d:%d:%d\n", dt.tm_year + 1900, dt.tm_mon + 1, dt.tm_mday, dt.tm_hour, dt.tm_min, dt.tm_sec);
      ESP_MAIL_PRINTF("Recipient: %s\n", result.recipients);
      ESP_MAIL_PRINTF("Subject: %s\n", result.subject);
    }
    Serial.println("----------------\n");
  }
}

void displayData(int reading) {
  display.clearDisplay();
  display.setTextSize(1);             // Normal 1:1 pixel scale
  display.setTextColor(WHITE);        // Draw white text
  display.setCursor(0,0);             // Start at top-left corner
  display.print(F("Gas Sensor reading = "));
  display.println(reading);
  display.display();
}

void checkConnection() {
  if (WiFi.status() != WL_CONNECTED) {
     Serial.print("Attempting to connect to SSID: ");
     Serial.println(WIFI_SSID);
     while (WiFi.status() != WL_CONNECTED) {
       WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
       Serial.print(".");
       delay(5000);
     }
     Serial.println("\nConnected.");
   }
}

void sendMail(int reading) {
  ESP_Mail_Session session;
  session.server.host_name = SMTP_HOST;
  session.server.port = SMTP_PORT;
  session.login.email = AUTHOR_EMAIL;
  session.login.password = AUTHOR_PASSWORD;
  session.login.user_domain = "";
  SMTP_Message message;

  /* Set the message headers */
  message.sender.name = "ESP";
  message.sender.email = AUTHOR_EMAIL;
  message.subject = "ESP Test Email";
  message.addRecipient("Pulkit", RECIPIENT_EMAIL);

  String htmlMsg = "<div style=\"color:#2f4468;\"><h1>Danger! LPG Gas levels above threshold." + String(reading) + " is the current value.</h1><p>- Sent from ESP board</p></div>";
  message.html.content = htmlMsg.c_str();
  message.html.content = htmlMsg.c_str();
  message.text.charSet = "us-ascii";
  message.html.transfer_encoding = Content_Transfer_Encoding::enc_7bit;

  if (!smtp.connect(&session))
    return;
  if (!MailClient.sendMail(&smtp, &message))
    Serial.println("Error sending Email, " + smtp.errorReason());
}

void displayDanger() {
  display.clearDisplay();
  display.setTextSize(3);             // Normal 1:1 pixel scale
  display.setTextColor(WHITE);        // Draw white text
  display.setCursor(0,0);             // Start at top-left corner
  display.println(F("Danger! LPG gas leak. Act quickly!!!"));
  display.display();
}