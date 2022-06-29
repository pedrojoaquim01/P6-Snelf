import pandas as pd
import seaborn as sns
import string 
import io
import numpy as np
import re
import nltk
#nltk.download('stopwords')
#nltk.download('punkt')
import os
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from string import punctuation
import time
import imblearn
import asyncio
from imblearn.over_sampling import RandomOverSampler
from sklearn.model_selection import train_test_split

from lib.extractor1 import Extractor as xtc

#Carrega dados
#data_path = '../datasets/medicamentos/'
#data_file = 'produtos_farmaceuticos.csv'

async def inicia_pre_processamento(csvFile):
    cols = ['DescricaoProduto','CLEAN']
    
    data_path = './dados/'
    if not os.path.exists(data_path) :
        os.mkdir(data_path)

    df = pd.read_csv(csvFile.file, usecols=cols, dtype={0:str, 1:int})
    print(df.head())
    #df = pd.read_csv(content, usecols=cols, dtype={0:str, 1:int})
 
    
    # Removendo rows com EAN nulo
    df.dropna(subset=['CLEAN'], inplace=True)
    non_clean = ['N/I','-1','0']
    df = df[~df['CLEAN'].isin(non_clean)]

    # Removendo rows em que o EAN não é numérico
    df = df[df['CLEAN'].str.isdigit()]

    #Removendo rows com EANs inválidos (conforme regra do cálculo do dígito verificador)
    def is_ean_valid(row):
        return not sum(int(d)*i for d,i in zip(row['CLEAN'],[1,3]*7))%10

    indices = df.apply(is_ean_valid, axis=1)
    df = df[indices]

    #Valores Nulos
    df[df['DescricaoProduto'].isnull()]
    patt = '^NI\s|^NC\s'  # regex pattern
    df[df['DescricaoProduto'].str.contains(patt, regex=True)]

    #Upper
    df['DescricaoProduto'] = df['DescricaoProduto'].str.upper()

    #Removendo duplicados
    df.drop_duplicates(subset=['DescricaoProduto'], inplace=True)

    # Removendo informações de lote e validade
    pattern = ("[^A-Z0-9]"
               "("
               "LOTE|"
               "LO?T?:|"
               "LO?T(\.|\s)|"
               "LO?T?(\.|\:)\s*[0-9A-Z]+\s*VA?L?(\.|\:)|"
               "VA?L?(\.|\:)\s*[0-9\/A-Z]+\s*LO?T?(\.|\:)|"
               "LO?T?\(.+\)\s*VA?L?\(.+\)|"
               "VA?L?\(.+\)\s*LO?T?\(.+\)|"
               "LO?T?\s*[0-9]+\s*VA?L?\s*[0-9]+"
               ")")
    df['DescricaoProduto'] = df['DescricaoProduto'].str.split(pattern, 1).str[0].str.strip()
    df.drop_duplicates(subset=['DescricaoProduto'], inplace=True)

    #Exportação
    data_file = 'medicamentos.csv'

    async def medicamentos():
        pd.DataFrame(df).to_csv('{}{}'.format(data_path, data_file), 
                        sep=';', 
                        header=['descricao', 'clean'],
                        index=False,
                        encoding='utf-8')
    await medicamentos()

    #Pensar em como executar o data augmentation
    async def data_Augmentation():
        os.system('python ./data_augmentation.py "./dados/medicamentos.csv" "./dados/medicamentos_aumentado.csv" medicamentos 5')

    await data_Augmentation()    
    
    #PRÉ PROCESSAMENTO PÓS AUGMENTATION
    # loading new_stopwords
    with open('./auxiliar/custom_stopwords.txt') as f:
        data = f.read()
    new_stopwords = data.split()

    nltk.download('stopwords')
    nltk.download('punkt')

    # updating stopwords with new_stopwords
    stopword = set(stopwords.words('portuguese') + list(punctuation))
    custom_stopwords = stopword.copy()
    custom_stopwords.update(new_stopwords)

    def clean_desc(words, desc):
        subs = [sub.strip() for sub in re.split('‹|–|::|-|\|', desc)]  # split in substrings
        new_desc = ''
    
        for sub in subs:
            for word in words:
                if word in sub.split():
                    new_desc += ' {}'.format(sub)
                    break
                
        return new_desc.strip()  # return without extra initial space

    def get_words(text):
        return [w for w in word_tokenize(text) if w.lower() not in custom_stopwords]

    def remove_blank(terms):
        return [re.sub('\s', '', t) if t is not None else t for t in terms]

    #data_path = '../datasets/medicamentos/augmented/'
    #Aqui embaixo é medicamentos_aumentado.csv, mas vai ser alterado por enquanto
    data_file = 'medicamentos_aumentado.csv'

    def custom_replace(desc):
        start = desc.find(';') + 1
        end = desc.rfind(';')
        return desc[:start] + desc[start:end].replace(';', ',') + desc[end:]

    src = '{}{}'.format(data_path, data_file)
    target = '{}{}_mod.csv'.format(data_path, data_file[:-4])

    buff = 300
    content = ''

    with open(src, 'r',encoding='latin1') as fs:  
        with open(target, 'w',encoding='latin1') as ft:
            ft.write(fs.readline())  # header
            lines = fs.readlines(buff)
            while lines:
                for line in lines:
                    content += custom_replace(line)
                ft.write(content)
                content = ''
                lines = fs.readlines(buff)

    #Importando dataframe modificado
    data_file = 'medicamentos_aumentado_mod.csv'
    src = '{}{}'.format(data_path, data_file)

    df = pd.read_csv(src, dtype={0:int, 1:str, 2:str}, sep=';',encoding='latin1')
    df.shape

    idxs = list()
    removed = list()

    # iterate over dataframe
    for index, row in df.iterrows():
        if row['cod'] == 1:
            original_words = get_words(row['descricao'])  # get non stopwords
            _, conc, _, qtd = xtc.extract(row['descricao'])  # get principal terms
            conc, qtd = remove_blank([conc, qtd])
            master_idx = index
            continue
        
        new_desc = clean_desc(original_words, row['descricao'])  # remove irrelevant substrings
        if not new_desc:
            idxs.append(index)  # storage index for future drop
            removed.append([master_idx, index])
            continue
    
        _, new_conc, _, new_qtd = xtc.extract(new_desc)  # get principal terms
        new_conc, new_qtd = remove_blank([new_conc, new_qtd])
    
        if conc == new_conc and qtd == new_qtd:
            df.at[index,'descricao'] = new_desc  # replace descricao with cleaned new_desc
        else:
            idxs.append(index)  # storage index for future drop
            removed.append([master_idx, index])

    df_removed = pd.DataFrame(removed, columns=['master_idx', 'removed_idx'])    
    df_grouped = df_removed.groupby('master_idx')['removed_idx'].apply(list).reset_index()

    pd.set_option('display.max_colwidth', -1)

    master, removed = df_grouped.loc[0].values
    indexes = [master] + removed
    df.loc[indexes][['cod', 'descricao']]
    
    #Limpando o conjunto de dados
    df.drop(idxs, inplace=True)
    df.dropna(inplace=True)
    df.drop_duplicates(inplace=True)

    cond1 = df['cod'] == 1
    cond2 = df['cod'] == 3
    cond3 = ~df['descricao'].str.contains('BULA|PREÇO|BARATO', regex=True)

    df = df[cond1 | (cond2 & cond3)]

    pattern1 = r'(?i)(em|no)?\s+mercado\s+livre\s*(brasil)?'
    pattern2 = r'(?i)comprar em (ilha dental|agroforte|farma prata)'
    pattern3 = r'(?i)(onde)?\s*comprar'
    pattern4 = r'(?i)^encontre'
    replaces = {pattern1: '', 
                pattern2: '', 
                pattern3: '', 
                pattern4: '',}
    df.replace(replaces, regex=True, inplace=True)

    cond1 = df['cod'] == 1
    cond2 = ~df['descricao'].str.contains('ENCONTRE')
    df = df[cond1 | cond2]

    pattern = r'(?i)mercado livre|comprar|encontre'
    df[df['descricao'].str.contains(pattern)]

    pattern = r'(?i)oferta'
    df[df['descricao'].str.contains(pattern)].shape

    # after removing, strip again
    df['descricao'] = df['descricao'].str.strip()

    start = 5056
    end = start+20
    cod = df['cod'].tolist()[start:end]
    desc = df['descricao'].tolist()[start:end]
    lista = list(zip(cod,desc))
    for cod, desc in lista:
        if cod == 3:
            tab = '\t'
            br = ''
        else:
            tab = ''
            br = '\n'
            original_words = [w for w in desc if len(w) > 2]
        print('{}{}{}'.format(br,tab,desc))

    #Gravado
    data_file = 'medicamentos_aumentado_preproc.csv'
    df.to_csv('{}{}'.format(data_path, data_file),
          sep=';',
          header=df.columns,
          index=False,
          encoding='utf-8')

    #MAPEAMENTO EAN
    df_mapping = pd.read_pickle('./auxiliar/ean_key_mapping.pkl')

    data_file = 'medicamentos_aumentado_preproc.csv'
    df = pd.read_csv('{}{}'.format(data_path, data_file), 
                 sep=';',
                 dtype={0:int, 1:str, 2:str})
    dfm = pd.merge(df, df_mapping, on='ean')

    del dfm['ean']

    data_file = 'medicamentos_aumentado_preproc_mapped.csv'

    dfm.to_csv('{}{}'.format(data_path, data_file),
            sep=';',
            index=False,
            encoding='utf-8')

    #OVERSAMPLING
    data_medicamentos = './dados/medicamentos_aumentado_preproc_mapped.csv'
    df_medicamentos = pd.read_csv(data_medicamentos, sep=';', dtype=str)
    df = pd.concat([df_medicamentos], ignore_index=True, sort=False)

    start = time.time()
    ros = RandomOverSampler(random_state=0)

    X_resampled, y_resampled = ros.fit_resample(pd.DataFrame(df[['cod', 'descricao']]), df['chave'])
    elapsed_time = (time.time() - start) / 60
    df_oversampled = pd.concat([X_resampled, y_resampled], axis=1)

    data_file = './dados/oversampled.csv'

    df_oversampled.to_csv(data_file,
                      sep=';',
                      header=df.columns,
                      index=False,
                      encoding='utf-8')

    #TREINAMENTO
    df = pd.read_csv('./dados/oversampled.csv', sep=';')

    # Obtendo somente os registros originais de medicamentos
    df = df[df['cod'] == 1]

    # Removendo duplicatas
    df.drop_duplicates(inplace=True)
    df.drop_duplicates(subset=['descricao'], inplace=True)

    # Removendo classes que só possuem 1 único exemplo
    dfg = df.groupby('chave')['descricao'].count().sort_values().reset_index()
    keys_to_remove = dfg[dfg['descricao'] == 1]['chave']
    df = df[~df['chave'].isin(keys_to_remove)]

    # Split
    _, df_test = train_test_split(df, test_size=46, stratify=df['chave'])

    # Gravando em arquivo o conjunto de dados
    df_test['label'] = '__label__' + df_test['chave'].astype(str)
    df_test.drop(['cod', 'chave'], axis=1, inplace=True)
    df_test = df_test[['label', 'descricao']]
    np.savetxt('./dados/data.test.txt', df_test, fmt='%s', encoding='utf-8')

    # Remover do dataset aumentado todos os registros com descrição pertencente ao conjunto de dados
    df = pd.read_csv('./dados/oversampled.csv', sep=';')
    df = df[~df['descricao'].isin(df_test['descricao'])]

    # Gravando em arquivo o conjunto de treino
    df['label'] = '__label__' + df['chave'].astype(str)
    df.drop(['cod', 'chave'], axis=1, inplace=True)
    df = df[['label', 'descricao']]
    np.savetxt('./dados/data.train.txt', df, fmt='%s', encoding='utf-8')

    #inserir condição para validar se ocorreu o pre processamento ou não
    return "Pré processamento feito com sucesso"