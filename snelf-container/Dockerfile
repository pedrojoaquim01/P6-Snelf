
FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip3 install -v --no-cache-dir --upgrade -r /code/requirements.txt

RUN pip3 install fasttext_win

COPY ./snelf-backend /code/snelf-backend

WORKDIR /code/snelf-backend

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--reload"]