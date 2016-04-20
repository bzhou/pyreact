from os import path
from flask import Flask, render_template, send_from_directory, jsonify
from flask_webpack import Webpack
from version import __version__
import fabfile
import fabric
import time

here = path.abspath(path.dirname(__file__))

app = Flask(__name__)

webpack = Webpack()
app.config["WEBPACK_MANIFEST_PATH"] = path.join(here, "manifest.json")
webpack.init_app(app)

lb_host = 'localhost'


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/assets/<path:filename>")
def send_asset(filename):
    return send_from_directory(path.join(here, "public"), filename)


@app.route("/vips")
def vips():
    return jsonify(fabfile.get_vips())


@app.route("/vip_status/<vip>")
def vip_status(vip):
    r = fabric.api.execute(fabfile.status, vip, hosts=[lb_host])
    time.sleep(2)
    return jsonify(r[lb_host])


@app.route("/enable_service/<vip>/<service>")
def enable_service(vip, service):
    fabric.api.execute(fabfile.enable, vip, service, hosts=[lb_host])
    return jsonify({})


@app.route("/disable_service/<vip>/<service>")
def disable_service(vip, service):
    fabric.api.execute(fabfile.disable, vip, service, hosts=[lb_host])
    return jsonify({})
