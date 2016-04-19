
    $ git clone this_pyreact_repo
    $ pip install virtualenv
    $ virtualenv pyreact
    $ cd pyreact
    $ . bin/activate
    $ pip install -U pip
    $ pip install Flask Flask-Webpack Fabric
    $ echo '{}' > package.json
    $ npm install -save webpack \
      react react-dom react-toggle \
      babel-core babel-loader babel-preset-es2015 babel-preset-es2015 \
      style-loader css-loader sass-loader node-sass \
      manifest-revision-webpack-plugin extract-text-webpack-plugin \
    term2 $ cd pyreact
    term2 $ ./node_modules/.bin/webpack --watch
    $ DEBUG=1 bin/python run.py




