import string
import pandas as pd
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#burlando cors
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#rota de importação do csv. estudando como fazer para upload em csv maior
@app.post("/importacaoCsv")
async def importacaoCsv(csvFile: UploadFile = File(...)):
    #Chamar o pipeline de importação
    #   -> primeiro chamar a função que inicia o treinamento do modelo passando o csv
    #   -> chamar a função que cria o banco sqlite
    return "Importação feita com sucesso"