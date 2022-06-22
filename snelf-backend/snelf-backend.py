import csv
from flask import Flask, redirect, request
from pre_processamento import inicia_pre_processamento
import asyncio


app = Flask(__name__)

@app.route('/importarCsv', methods=['GET', 'POST'])
def importarCsv():
    if request.method == 'POST':
        csvFile = request.files['csvFile']
        csvFile.save('./datasets/produtos_farmaceuticos.csv')
        asyncio.run(inicia_pre_processamento(csvFile)) 
        #inicia importação        
        return redirect(request.url)
    else:
        #retorna no get se a importação foi feita ou não
        return