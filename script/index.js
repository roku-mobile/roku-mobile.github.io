const Storage = {
    keys: {
        access: 'settings',
        whoami: 'access_whoami'
    },

    Get: function (key = this.keys.access) {
        return JSON.parse(localStorage.getItem(key));
    },

    Set: function (value, key = this.keys.access) {
        if (typeof (value) == 'object') {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },

    Clear: function () {
        for (let val in this.keys) {
            localStorage.removeItem(this.keys[val]);
        }
    },

    Remove: function (key = this.keys.access) {
        localStorage.removeItem(key);
    }
}
const RokuRuntime = {
    protocol: 'http://',
    base_url: '/launch/63218',
    ip: '',
    port: '',
    url: '',

    query: function () {
        return "?live=false&autoCookie=false&debugVideoHud=true&url=" + encodeURIComponent(this.url) + "&fmt=Auto&drmParams=%7B%7D&headers=%7B%7D&metadata=%7B%22isFullHD%22%3Afalse%7D&cookies=%5B%5D";
    },

    SetUrl: function (url) {
        this.url = url;
    },

    GetUrl: function () {
        return this.protocol + this.ip + ':' + this.port + this.base_url + this.query()
    },

    Play: function () {
        fetch(this.GetUrl(), {
            method: 'POST'
        }).then((response) => {
            console.log(response);
        });
    }
}

let settings = {
    ip: '0.0.0.0',
    port: '8060'
}

if(Storage.Get()){
    settings = Storage.Get();
    $('.ip-input').val(settings.ip);
    $('.port-input').val(settings.port);
}

$('.btn-send').click(() => {
    console.log(settings);
    RokuRuntime.SetUrl($('.roku-input').val());
    RokuRuntime.ip = settings.ip;
    RokuRuntime.port = settings.port;
    RokuRuntime.Play();
})
$('.btn-settings > svg').click(() => {
    $('.settings').css('display', 'flex');
});

$('.content > button').click(() => {
    $('.settings').css('display', 'none');
    settings.ip = $('.ip-input').val();
    settings.port = $('.port-input').val();
    Storage.Set(settings);
    console.log(settings);
});

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js', { scope: '/' }).then(() => {
            console.log('Service Worker registered successfully.');
        }).catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    }
}

registerServiceWorker();