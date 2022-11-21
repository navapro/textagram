from authtoken import auth_token
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from diffusers import StableDiffusionPipeline
from io import BytesIO
from firebase_upload import upload_to_firebase
from test import esrgan
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_credentials=True, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, revision="fp16", use_auth_token=auth_token)
pipe = pipe.to("cuda")

@app.get("/")
def generate(prompt: str): 
    with torch.cuda.amp.autocast(True): 
        image = pipe(prompt, guidance_scale=8.5).images[0]

    image.save("LR/image.png")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    esrgan()
    filename = upload_to_firebase()
    return_json = {"filename": filename}
    json_str = json.dumps(return_json, indent=4, default=str)
    return Response(content=json_str, media_type='application/json')