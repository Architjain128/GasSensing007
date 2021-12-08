 int httpResponseCode = http.POST("{\"m2m:cin\":{\"lbl\":[ \"Label-1\",\"Label-2\"],\"con\": \"[7  ," + date + " " + timeStamp + ", " +tempStr + "]\"}}");
  if(httpResponseCode>0){
    String response = http.getString();                       
    Serial.println(httpResponseCode);   
    Serial.println(response);
  }
}
