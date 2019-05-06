#!/usr/bin/env python
import os
from flask import Flask, render_template, request
import numpy
import sys
from io import StringIO
import contextlib
import cv2
import base64


app = Flask(__name__)
@app.route("/")
@app.route("/runcode")
@app.route("/opencv")
def index():
    return render_template('index.html')

@app.route("/runservercode",methods=['POST'])
def runServerCode():
    code = request.get_json().get('code')
    @contextlib.contextmanager
    def stdoutIO(stdout=None):
        old = sys.stdout
        if stdout is None:
            stdout = StringIO()
        sys.stdout = stdout
        yield stdout
        sys.stdout = old

    with stdoutIO() as s:
        try:
            exec(code)
        except:
            print("Something wrong with the code")
    return s.getvalue()

@app.route('/findface', methods = ['POST'])
def uploadfile():
    print("find face")
    if request.method == 'POST':
        filestr = request.files['Files'].read()
        #convert string data to numpy array
        npimg = numpy.fromstring(filestr, numpy.uint8)
        # convert numpy array to image
        image = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
        cascPath = "haarcascade_frontalface_default.xml"
        faceCascade = cv2.CascadeClassifier(cascPath)

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30),
            flags = cv2.CASCADE_SCALE_IMAGE
        )
        face_array = faces.tolist()[0]
        cv2.rectangle(image,(face_array[0],face_array[1]),(face_array[0]+face_array[2],face_array[1]+face_array[3]),(0,0,255),2)
        return (base64.b64encode(cv2.imencode('.jpg', image)[1]))
    return "complete"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)

