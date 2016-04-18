#!/usr/bin/env python

from os import environ
from pyreact import app

if __name__ == "__main__":
    app.debug = "DEBUG" in environ
    app.run(extra_files=[app.config["WEBPACK_MANIFEST_PATH"]])
