from gevent import monkey
monkey.patch_all(thread=False)
from gevent.pywsgi import WSGIServer
from flask import Flask , Response , render_template, request , redirect, url_for
from flask_cors import CORS,cross_origin
import requests
import time
import json
import os

app = Flask(__name__)
CORS(app)

def length():
    handle = json.loads(open('./config.json').read())['handle']
    response = requests.get(f'https://codeforces.com/api/user.status?handle={handle}').json()
    return [len(response['result']), response['result'][0]['verdict']]

def retrieve():
    handle = json.loads(open('./config.json').read())['handle']
    response = requests.get(f'https://codeforces.com/api/user.status?handle={handle}')
    if(response.status_code == 204):
        return 'Server stopped unexpectedly'
    response = response.json()
    change = response['result'][0]
    user = change['author']['members'][0]['handle']
    changeVerdict = ('Accepted' if change['verdict'] == 'OK' else change['verdict']).replace('_', ' ')
    problem = change['problem']['index']
    notification = f'{user} got verdict {changeVerdict} on problem {problem}'
    return notification

@app.route('/')
def base():
    return render_template('base.html')

@app.route('/notifications')
def load():
    return render_template('index.html')

@app.route('/checkUser/<user>')
@cross_origin(origin = '*')
def check(user):
    print('Checking for ' , user)
    response = requests.get('https://codeforces.com/api/user.info?handles={}'.format(user)).json()
    return response['status']

@app.route('/streaming')
def streaming():
    def eventStream():
        prev = [''] * 2
        while True:
            possible_newdata = length()
            if (possible_newdata[0] != prev[0] and possible_newdata[1] != 'TESTING') or (possible_newdata[0] == prev[0] and prev[1] == 'TESTING' and possible_newdata[1] != 'TESTING'):
                yield f'data: {retrieve()}\nevent: online\n\n'
            prev = possible_newdata
            time.sleep(5)
    return Response(eventStream(), mimetype="text/event-stream")


@app.route('/index/<name>' , methods=['POST', 'GET'])
@cross_origin(origin='*')
def render_index(name):
    if(request.method == 'GET'):
        print('Hitting index')
        data = json.loads(open('./config.json').read())
        data['handle'] = name
        with open('./config.json' ,'w+') as configfile:
            configfile.write(json.dumps(data))
        return redirect('/streaming')

if __name__ == '__main__':
    httpserver = WSGIServer(('localhost' , 8000) , app)
    httpserver.serve_forever()
