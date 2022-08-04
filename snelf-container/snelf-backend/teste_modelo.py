#from fastText.python.fasttext_module.fasttext.FastText import _FastText as fasttext
import fasttext
from matplotlib.pyplot import text

model = fasttext.supervised('dados/data.train.txt','modelo/modelo')
texto = ['CIPROFIBRATO']
teste = model.predict_proba(texto,k=3)
print (teste)