FROM python:3.14.0-alpine3.22

WORKDIR /server
COPY . .


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN python -m venv /py && /py/bin/pip install -r requirements/base.txt

ENV PATH="/py/bin:$PATH"





