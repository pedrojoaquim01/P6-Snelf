from pathlib import Path
import sqlite3
import pandas as pd

def importa_csv_para_sql(csvFile):
    Path('my_data.db').touch()
    conn = sqlite3.connect('my_data.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE produtos_farmaceuticos (CodigoNFe int, DataEmissao date, MunicipioEmitente text, unidadecomercial text, quantidadecomercial real, valorunitariocomercial real, DescricaoProduto text, CLEAN text)''')
    produtos_farmaceuticos = pd.read_csv(csvFile)
    produtos_farmaceuticos.to_sql('produtos_farmaceuticos', conn, if_exists='append', index = False)
    #c.execute('''SELECT * FROM produtos_farmaceuticos''').fetchall()