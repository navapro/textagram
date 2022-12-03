import os
import json
import importlib.util
import sys
#from inference_model import InferenceModel
 
from azureml.contrib.services.aml_request import rawhttp
from azureml.contrib.services.aml_response import AMLResponse
 

class InferenceModel():
    def __init__(self, model_path, module_path):
        self.module_path = module_path
        self.model_path = model_path
 
    def predict(self, comment):
        spec = importlib.util.spec_from_file_location("module.name", self.module_path)
        lib = importlib.util.module_from_spec(spec)
        sys.modules["module.name"] = lib
        spec.loader.exec_module(lib)
        filename = lib.esrgan(self.model_path)
        return filename

def init():
    global model
    global df
    model_path = os.path.join(os.getenv("AZUREML_MODEL_DIR"), "main/models/RRDB_ESRGAN_x4.pth")
    module_path = os.path.join(os.getenv("AZUREML_MODEL_DIR"), "main/gan.py")
    model = InferenceModel(model_path, module_path)
 
@rawhttp
def run(request):
    if request.method != 'POST':
        return AMLResponse(f"Unsupported verb: {request.method}", 400)
    input_data = json.loads(request.data)
    preds = model.predict(input_data)
    
    return AMLResponse(json.dumps({"preds": preds}), 200)