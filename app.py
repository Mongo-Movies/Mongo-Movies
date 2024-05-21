from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return """Project has been archived, sources got broken and i do not feel like fixing them, sourcecode is still avalible at https://github.com/Mongo-Movies/Mongo-Movies<br>maybe i will update it oneday, who knows? just provide me some sources that i can easly get to the video file from and i may update, who knows?"""

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')