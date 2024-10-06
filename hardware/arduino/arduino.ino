#include <LiquidCrystal.h> // includes the LiquidCrystal Library
LiquidCrystal lcd(3, 2, 4, 5, 6, 7); // Creates an LCD object. Parameters: (rs, enable, d4, d5, d6, d7)
const int trigPin = 9;
const int echoPin = 10;
long duration;
int distanceCm, distanceInch;

String firstPart = "";  // To store the part before the dot
String secondPart = ""; // To store the part after the dot

void setup() {
  Serial.begin(9600); // Starts the serial communication
  //Serial.print("Setup\n");

  lcd.begin(16, 2); // Initializes the interface to the LCD screen, and specifies the dimensions (width and height) of the display
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void readSensor(){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distanceCm = duration * 0.034 / 2;

  Serial.println(distanceCm);
}

// Function to split the string into two parts
void splitString(String str, char delimiter, String &part1, String &part2) {
  int found = str.indexOf(delimiter); // Find the index of the delimiter
  
  if (found != -1) { // If the delimiter is found
    part1 = str.substring(0, found);      // Get the part before the delimiter
    part2 = str.substring(found + 1);     // Get the part after the delimiter
  } else {
    part1 = str; // If not found, assign the whole string to part1
    part2 = "";  // And set part2 to an empty string
  }
}

void loop() {
  //Serial.print("New Loop: \n");

  // Check if data is available on the serial port
  if (Serial.available() > 0){

    // Read incoming string from serial
    String incomingString = Serial.readString();

    splitString(incomingString, '.', firstPart, secondPart);

    // Clear the previous message on the LCD
    lcd.clear();

    // Print a message to the first line
    lcd.setCursor(0, 0);  // First column, first row
    lcd.print(firstPart);

    // Print another message to the second line
    lcd.setCursor(0, 1);  // First column, second row
    lcd.print(secondPart);

    Serial.flush();  // Clear the serial buffer
  }

  else{
    readSensor();

    delay(1000);
  }

}
