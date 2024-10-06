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
    while True:
        for i in range(4):
            send_string_to_arduino("0")

            sensor_data = read_sensor_data()
            if sensor_data:
                print("Sensor Data:", sensor_data)

            time.sleep(1)

        send_string_to_arduino("hello world")

        time.sleep(3) #need longer delay to prevent buffer overflow
