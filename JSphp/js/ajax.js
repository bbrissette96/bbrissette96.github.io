function makeRequest(url, verb, data, callback) {

    var httpRequest = new XMLHttpRequest();

    httpRequest.open(verb, url);


    if (verb === 'GET') {
        httpRequest.send(null);
    } else {
        httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        httpRequest.send(data);
    }

    httpRequest.addEventListener('load', callback.bind(httpRequest));
    httpRequest.addEventListener('error', callback.bind(httpRequest));
}

function makeRequestPromise(url, verb, data) {

    var promise = new Promise (httpPromise);
    
    function httpPromise(resolve, reject) {

        var httpRequest = new XMLHttpRequest();

        httpRequest.open(verb, url, true);

        if (verb === 'GET') {
            httpRequest.send(null);
        } else {
            httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            httpRequest.send(data);
        }

        httpRequest.addEventListener('load', httpResolve.bind(httpRequest));
        httpRequest.addEventListener('error', httpReject.bind(httpRequest));
        
        function httpResolve(){
            if(this.status >= 200 && this.status < 300 ){
                resolve(JSON.parse(this.response));
            }else{
                reject(this.statusText);
            }
        }
        
        function httpReject(){
            reject(this.statusText);
        }
    }
    
    return promise;
}


