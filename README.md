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

run flask

    $ DEBUG=1 bin/python run.py

javascript & webpack prep

    term2 $ cd pyreact
    term2 $ echo '{}' > package.json
    term2 $ npm install -save webpack \
      react react-dom react-toggle \
      babel-core babel-loader babel-preset-es2015 babel-preset-es2015 \
      style-loader css-loader sass-loader node-sass \
      manifest-revision-webpack-plugin extract-text-webpack-plugin \

run webpack

    term2 $ ./node_modules/.bin/webpack --watch


Reference and Credit
--------------------

* https://medium.com/@greut/react-and-sass-with-flask-webpack-9c13cb3a5c56#.9ktrs5x6o
* https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html
* https://github.com/instructure-react/react-toggle
