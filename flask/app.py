from pymongo import MongoClient 
from langchain.schema import HumanMessage, AIMessage
from langchain_community.chat_models.huggingface import ChatHuggingFace
from langchain.prompts import PromptTemplate
from flask import Flask, jsonify, request
from langchain_community.llms import HuggingFaceHub
from flask_cors import CORS
import yfinance as yf
import os
import requests
import json
import base64
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo

from dotenv import load_dotenv, get_key
load_dotenv()

app = Flask(__name__)

CORS(app)

os.environ["HUGGINGFACEHUB_API_TOKEN"] = get_key(key_to_get="HUGGINGFACEHUB_API_KEY",dotenv_path=".env")

# app.config["MONGO_URI"] = "mongodb+srv://sonarsiddhesh105:K5NuO27RwuV2R986@cluster0.0aedb3y.mongodb.net/"
# mongo = PyMongo(app)
client = MongoClient("mongodb+srv://sonarsiddhesh105:K5NuO27RwuV2R986@cluster0.0aedb3y.mongodb.net/")
db = client["test"]
mongo = db["recur-users"]

llm = HuggingFaceHub(
    repo_id="mistralai/Mixtral-8x7B-Instruct-v0.1",
    task="text-generation",
    model_kwargs={
        "max_new_tokens": 512,
        "top_k": 30,
        "temperature": 0.3,
        "repetition_penalty": 1.03,
    },
)

def chatwithbot(txt:str):
    chat_model = ChatHuggingFace(llm=llm)
    user_template= PromptTemplate(template="{user_input}", input_variables=["user_input"])
    messages = [
    HumanMessage(content="..."),
    AIMessage(content="You're a helpful travel planner and tour guide, user asks their query and you have to respond accuretly and strictly in same language."),
    HumanMessage(content=user_template.format(user_input=txt)),
    ]
    res = chat_model(messages).content
    return res


@app.route('/chat',methods=["POST"])
def chat():
    try:
        txt = request.form['query']
        email = request.form['email']
        start = request.form['start']
        end = request.form['end']
        print(txt, email, start, end)

        # find user in db
        user = mongo.find_one({"email": email})
        if user is None:
            return jsonify({"error": "User not found"})
        
        res = chatwithbot(txt)
        res = str(res)
        last_inst_index = res.rfind("[/INST]")
        res = res[last_inst_index + len("[/INST]"):].strip()
        print(res)
        c1msg = txt.split('#')[0]
        image_file = request.files['image']
        print(image_file.filename)
        imgName = image_file.filename
        chat1 = {
            "name": "User",
            "message": c1msg,
            "startLocation": start,
            "destination": end,
            "picture": {
                "is_attached": True,
                "pic_name": imgName,
                "pic_type": "image"
            }
        }

        chat2 = {
            "name": "Travel Buddy",
            "message": res,
        }
        
        if 'chat' not in user or len(user['chat']) == 0:
            newChat = {
            "chatName": "Chat 1",
            "chatInfo": [],
            }
            user.setdefault('chat', []).append(newChat)

        user['chat'][-1]['chatInfo'].append(chat1)
        user['chat'][-1]['chatInfo'].append(chat2)

        # Update the user document in the database
        mongo.update_one({"email": email}, {"$set": user})

        return jsonify({"message": "success", "text": res}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@app.route('/classify-image', methods=['POST'])
def classify_image():
    try:
        url = "https://picarta.ai/classify"
        api_token = "08CPS63DU3BANXP5EBC8"
        headers = {"Content-Type": "application/json"}

        # Read the image from a local file
        # with open("./Taj-Mahal.jpg", "rb") as image_file:
        #     img_path = base64.b64encode(image_file.read()).decode('utf-8')
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"})

        # Read the image from form data
        image_file = request.files['image']
        img_path = base64.b64encode(image_file.read()).decode('utf-8')

        # Prepare the payload
        payload = {"TOKEN": api_token, "IMAGE": img_path}

        # Send the POST request with the payload as JSON data
        response = requests.post(url, headers=headers, json=payload)

        if response.status_code == 200:
            result = response.json()
            return jsonify(result)
        else:
            return jsonify({"error": f"Request failed with status code: {response.status_code}"})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)