import serial
import time

arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600, timeout=.1) 

time.sleep(2)  # Wait for the connection to establish

def send_string_to_arduino(data):
    # Send the string as bytes
    arduino.write(data.encode())

def read_sensor_data():
    data = arduino.readline().decode('utf-8').rstrip()
    return data

if __name__ == "__main__":

    itemname = "chip bag"
    binType = 2

    #send_string_to_arduino(itemname)

    if(binType == 1):
        send_string_to_arduino(itemname+".recycle")
    elif(binType == 2):
        send_string_to_arduino(itemname+".landfill")
    elif(binType == 3):
        send_string_to_arduino(itemname+".glass")
    elif(binType == 4):
        send_string_to_arduino(itemname+".compost")
    else:
        send_string_to_arduino(itemname+".error")
