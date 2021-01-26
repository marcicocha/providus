
import flask
import requests

app = flask.Flask(__name__)

method_requests_mapping = {
    'GET': requests.get,
    'HEAD': requests.head,
    'POST': requests.post,
    'PUT': requests.put,
    'DELETE': requests.delete,
    'PATCH': requests.patch,
    'OPTIONS': requests.options,
}


@app.route('/<path:url>', methods=method_requests_mapping.keys())
def proxy(url):
    print(flask.request.headers.get("Referer"))
    #print(url)
    #print(flask.request.method)
    #print(flask.request.data)
    #flask.request.headers["Referer"] = "https://emea.identityx-cloud.com"
    headers = {'Content-type': 'application/octet-stream'}
    requests_function = method_requests_mapping[flask.request.method]
    request = requests_function(url,headers=headers,data = flask.request.data , params=flask.request.args)
    request.headers["Referer"] = "https://emea.identityx-cloud.com"
    request.headers["Origin"] = "https://emea.identityx-cloud.com"
    request.headers["Content-Type"] = "application/octet-stream"

    response = flask.Response(flask.stream_with_context(request.iter_content()),
                              content_type='application/json',
                              status=request.status_code)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response


if __name__ == '__main__':
    app.debug = True
    app.run()