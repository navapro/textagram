import pyrebase
from PIL import Image
import uuid

def upload_to_firebase():
    config = {
    "apiKey": "AIzaSyDMblnk5FHlRwFQw6fLlz_RVj5Ym5Q46u8",
    "authDomain": "diffusion-368905.firebaseapp.com",
    "projectId": "diffusion-368905",
    "storageBucket": "diffusion-368905.appspot.com",
    "messagingSenderId": "509845638934",
    "appId": "1:509845638934:web:201185247d992d31ed4a37",
    "serviceAccount": "service_account_key.json",
    "databaseURL": "https://diffusion-368905-default-rtdb.firebaseio.com/"
    }

    firebase_storage = pyrebase.initialize_app(config)
    storage = firebase_storage.storage()

    im = Image.open("image.png")
    rgb_im = im.convert('RGB')
    rgb_im.save('image.jpg')
    storage.child(f"{str(uuid.uuid4())}.jpg").put("image.jpg")

upload_to_firebase()