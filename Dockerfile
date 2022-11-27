# syntax=docker/dockerfile:1
FROM python:3.9-slim
#FROM tiangolo/uvicorn-gunicorn-starlette:python3.9
WORKDIR /kaituna-website
COPY ./requirements.txt /var/www/requirements.txt
RUN pip install -r /var/www/requirements.txt
COPY  app /kaituna-website/app
COPY flowsite.py /kaituna-website
ENV FLASK_APP=app.py
CMD ["flask","run", "--host=0.0.0.0"]
