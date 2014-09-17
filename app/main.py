import requests
import os
import json

from flask import Flask, Response, request, session, g, redirect, url_for, abort, render_template, flash
from urlparse import urljoin

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('base.html')

@app.route('/api/<path:path>', methods=['GET'])
def api(path):
    clientToken = ''
    clientSecret = ''
    baseUrl = 'https://suggestqueries.google.com'
    accessToken = ''

    # Authentication
    #
    # session.auth = EdgeGridAuth (
    #     client_token = clientToken,
    #     client_secret = clientSecret,
    #     access_token = accessToken
    # )

    r = requests.get(urljoin(baseUrl, path), params=request.args)

    if r.status_code != requests.codes.ok:
        return None

    return Response(r.content,  mimetype='application/json')

if __name__ == "__main__":
    app.run(debug=True)
