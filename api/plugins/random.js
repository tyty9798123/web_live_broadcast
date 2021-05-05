var RandomCode=function(a){a=void 0===a?10:a;for(var f="abcdefghijklmnopqrstuvwxyz0123456789".split(""),c=[],b=1,d="";;){var e=Number(Math.random().toString().substr(2,1)+Math.random().toString().substr(2,1));36>e&&(c[b]=f[e],d+=c[b],b++);if(b>a)break}return d};

module.exports = RandomCode;