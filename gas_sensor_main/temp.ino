#include <ThingSpeak.h>
long prevMillisThingSpeak = 0;
int intervalThingSpeak = 1000;

ThingSpeak.begin(client); // Initialize ThingSpeak

ThingSpeak.setField(1, gassensorAnalog);
ThingSpeak.setField(2, aboveThreshold);
int x = ThingSpeak.writeFields(CHANNEL, WRITE_API);
