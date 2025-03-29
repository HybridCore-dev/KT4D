FROM python:3.12.1

COPY . /backend

WORKDIR /backend/src

RUN python -m pip install --upgrade pip
RUN pip install -r /backend/requirements.txt

CMD ["uvicorn", "webservice:app", "--host", "0.0.0.0", "--port", "80", "--workers", "2", "--timeout-keep-alive", "30"]