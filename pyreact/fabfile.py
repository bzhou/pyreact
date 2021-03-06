from fabric.api import *

env.hosts = ['localhost']

lookup = {
    'vips': ['room1', 'room2'],
    'services' : ['bacon', 'eggs', 'ham', 'sausage'],
}

try:
    import cStringIO as StringIO
except ImportError:
    import StringIO

def init(vip):
    with settings(warn_only=True):
        run("touch %s" % vip, shell=False, pty=False)

def status(vip):
    s = ""
    with settings(warn_only=True):
        result = run("cat %s" % vip, shell=False, pty=False)
        s = result.stdout
    status_dict = {}
    for service in lookup['services']:
        vip_and_service = vip + "/" + service
        status_dict[vip_and_service] = False
    for line in StringIO.StringIO(s):
        for service in lookup['services']:
            vip_and_service = vip + "/" + service
            if line.strip() == "%s=true" % (service):
                status_dict[vip_and_service] = True
                break
    return status_dict

def _change(vip, service, target_status):
    with settings(warn_only=True):
        run("grep -q %s= %s" % (service, vip) +
            " && ( (echo 'g/^%s=/s/=.*/=%s/'; echo wq) | ex %s )" % (service, target_status, vip) +
            " || (echo %s=%s >> %s)" % (service, target_status, vip),
           shell=False)

def enable(vip, service):
    _change(vip, service, "true")

def disable(vip, service):
    _change(vip, service, "false")

def get_vips():
    return {'vips': lookup['vips']}
