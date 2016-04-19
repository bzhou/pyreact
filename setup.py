from setuptools import setup, find_packages

with open('pyreact/version.py') as f:
    exec(f.read())

setup(
        name="pyreact",
        version=__version__,
        description="Flask + React",
        author="Brian Zhou",
        author_email="b88zhou@gmail.com",
        packages=find_packages(),
        include_package_data=True,
        install_requires=[
                    "Flask>=0.10.0",
                    "Flask-Webpack>=0.0.7"
                ]
)
