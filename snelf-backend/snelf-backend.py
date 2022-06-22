import csv
from flask import Flask, redirect, request
from pre_processamento import inicia_pre_processamento

app = Flask(__name__)

@app.route('/importarCsv', methods=['GET', 'POST'])
def importarCsv():
    if request.method == 'POST':
        file = request.files['csvFile']
        file.save('/importacao/medicamentos.csv')
        with open(file) as file:
            csvFile = csv.reader(file)
            inicia_pre_processamento(csvFile)
            #inicia importação        
        return redirect(request.url)
    else:
        #retorna no get se a importação foi feita ou não
        return