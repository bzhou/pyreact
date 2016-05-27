Instruction
-----------

clone the repo

    $ git clone this_pyreact_repo

python virtualenv

    $ pip install -U pip    # just make sure pip is up-to-date
    $ pip install virtualenv
    $ virtualenv pyreact
    $ cd pyreact
    $ . bin/activate
    $ pip install Flask Flask-Webpack Fabric

prep fab

    $ ssh-copy-id localhost
    $ touch ~/room1 ~/room2

javascript & webpack prep

    term2 $ cd pyreact
    term2 $ echo '{}' > package.json
    term2 $ npm install -save webpack \
      react react-dom react-addons-update react-toggle \
      babel-core babel-loader babel-preset-es2015 babel-preset-react \
      style-loader css-loader sass-loader node-sass \
      manifest-revision-webpack-plugin extract-text-webpack-plugin \

run webpack

    term2 $ ./node_modules/.bin/webpack --watch

run flask (must be in the python virtualenv terminal)

    $ DEBUG=1 bin/python run.py

point your browser to http://127.0.0.1:5000/


Reference and Credit
--------------------

* https://medium.com/@greut/react-and-sass-with-flask-webpack-9c13cb3a5c56#.9ktrs5x6o
* https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html
* https://github.com/instructure-react/react-toggle
