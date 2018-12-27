int const analogInA0 = A0;
int const analogInA1 = A1;
int const pushButton = 2;
int const ledPin = 9;

bool lastButtonState = 0;
int a0LastValue = 0;
int a1LastValue = 0;

String const a0String = "A0";
String const a1String = "A1";
String const pushButtonString = "BP";

int serverValueRemapped = 0;
char charRead;
String inputString = "";

void setup()
{
    Serial.begin(9600);
    pinMode(pushButton, INPUT_PULLUP);
}

void loop()
{
    int const a0Value = map(analogRead(analogInA0), 0, 1023, 0, 10);
    int const a1Value = map(analogRead(analogInA1), 0, 1023, 0, 10);
    a0LastValue = CheckValue(a0Value, a0LastValue, a0String);
    a1LastValue = CheckValue(a1Value, a1LastValue, a1String);

    bool const buttonStateUp = digitalRead(pushButton);

    if (lastButtonState != buttonStateUp) {
        lastButtonState = buttonStateUp;
        if (buttonStateUp == false) {
            Serial.println(pushButtonString + a0Value + "," + a1Value);
        }
    }
    checkSerialRead();
}

int CheckValue(int const aValue, int const aLastValue, String const aString)
{
    int curLastValue = aLastValue;

    if (aValue != aLastValue) {
        Serial.println(aString + aValue);
        curLastValue = aValue;
    }

    return curLastValue;
}

void checkSerialRead()
{
    if (Serial.available()) {
        charRead = Serial.read();
        if (charRead != 'T') {
            inputString += charRead;
        } else {
            int convertedString = inputString.toInt();
            serverValueRemapped = map(convertedString, 0, 100, 0, 255);
            analogWrite(ledPin, serverValueRemapped);
            inputString = "";
        }
    }
}
