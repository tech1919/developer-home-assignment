FROM python:3.10.5

ENV PYTHONUNBUFFERED 1 

WORKDIR /backend

COPY . .

RUN pip3 install --no-cache-dir --upgrade -r ./backend/requirements.txt

CMD [ "python3", "-m", "app" ]
