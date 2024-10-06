import threading, time, serial

import os
import openai
from dotenv import load_dotenv

import base64
import requests

from pymongo import MongoClient
from datetime import datetime

import cv2
import mediapipe as mp

# Load environment variables from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
connection = os.getenv("MONGO_DB_URL")

arduino = serial.Serial(port='/dev/ttyACM0', baudrate=9600, timeout=.1) 

def send_string_to_arduino(data):
    # Send the string as bytes
    arduino.write(data.encode())

def whatitem(image_path):

    # Function to encode the image
    def encode_image(image_path):
        with open(image_path, "rb") as image_file:
           return base64.b64encode(image_file.read()).decode('utf-8')

    # Getting the base64 string
    base64_image = encode_image("images/" + image_path)

    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {openai.api_key}"
    }

    payload = {
    "model": "gpt-4o-mini",
    "messages": [
        {
        "role": "user",
        "content": [
            {
            "type": "text",
            "text": "What trash is the person holding in this image and what bin should they put it in? 1 is compost, 2 is recycling, 3 is landfill. Return in python list format with item name first and number (as int) second."
            },
            {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{base64_image}",
                "detail": "low"
            }
            }
        ]
        }
    ],
    "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

    content = response['choices'][0]['message']['content']
    print(content)

    return content

def mediapipe_camera_loop():
    # Initialize MediaPipe Hands
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.7)

    # Initialize OpenCV
    cap = cv2.VideoCapture(0)

    # Parameters for detecting a still hand
    STILL_TIME_THRESHOLD = 2  # seconds to consider the hand still
    CENTER_REGION_TOLERANCE = 0.15  # tolerance for being in the center region
    MOVEMENT_TOLERANCE = 0.05  # tolerance for hand movement

    # Variables for detecting stillness
    last_hand_time = 0
    last_landmarks = None

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Flip the frame horizontally for a mirror effect
        frame = cv2.flip(frame, 1)

        # Convert the image to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process the image and detect hands
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                # Get the wrist position
                wrist_x = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].x
                wrist_y = hand_landmarks.landmark[mp_hands.HandLandmark.WRIST].y

                # Check if the wrist is near the center of the frame with tolerance
                if abs(wrist_x - 0.5) < CENTER_REGION_TOLERANCE and abs(wrist_y - 0.5) < CENTER_REGION_TOLERANCE:
                    current_time = time.time()

                    # Check if the hand is still
                    if last_landmarks is not None:
                        still = True
                        for i in range(21):  # Check each landmark
                            current_x = hand_landmarks.landmark[i].x
                            current_y = hand_landmarks.landmark[i].y
                            previous_x = last_landmarks.landmark[i].x
                            previous_y = last_landmarks.landmark[i].y

                            # If any landmark has moved beyond the tolerance, the hand is not still
                            if abs(current_x - previous_x) > MOVEMENT_TOLERANCE or abs(current_y - previous_y) > MOVEMENT_TOLERANCE:
                                still = False
                                break

                        # If the hand has been still for the required duration, capture the image
                        if still:
                            if current_time - last_hand_time > STILL_TIME_THRESHOLD:
                                # Save the image
                                filename = f'captured_image_{int(current_time)}.jpg'
                                cv2.imwrite("images/"+filename, frame)
                                print(f"Image saved as {filename}")
                                last_hand_time = current_time  # Reset the timer

                                #need code  here
                                itemndetails = whatitem(filename)
                                itemname = itemndetails[0]
                                binType = itemndetails[1]

                                send_string_to_arduino(itemname)

                                time.sleep(0.6)

                                if(binType == 1):
                                    send_string_to_arduino("recycle")
                                elif(binType == 2):
                                    send_string_to_arduino("landfill")
                                elif(binType == 3):
                                    send_string_to_arduino("glass")
                                elif(binType == 4):
                                    send_string_to_arduino("compost")
                                else:
                                    send_string_to_arduino("error")

                    else:
                        # Store the landmarks for the first frame
                        last_landmarks = hand_landmarks

                else:
                    last_landmarks = None  # Reset if not in center

                # Draw hand landmarks
                mp.solutions.drawing_utils.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

        # Display the frame
        cv2.imshow('Hand Detection', frame)
        
        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Clean up
    cap.release()
    cv2.destroyAllWindows()

mediapipe_camera_loop()