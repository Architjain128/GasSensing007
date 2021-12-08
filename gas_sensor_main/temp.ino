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
