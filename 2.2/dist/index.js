import fetch from 'node-fetch';
//1
// const response: Response = await fetch('https://api.ipify.org/?format=json');
// const data: {ip:string} = await response.json();
// const ip: string = data.ip;
// console.log(ip);
//2
async function getMyIP(url) {
    try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const data = await response.json();
        const ip = data.ip;
        return ip;
    }
    catch (error) {
        console.log(error);
    }
}
// console.log(await getMyIP('https://api.ipify.org/?format=json'));
//3.1
async function threeNames1(url) {
    try {
        const responses = Array.from({ length: 3 }, async () => {
            const response = await fetch(url);
            const data = await response.json();
            return data.first_name;
        });
        const names = await Promise.all(responses);
        return names;
    }
    catch (error) {
        console.log(error);
    }
}
// console.log(await threeNames1("https://random-data-api.com/api/name/random_name"));
//3.2
async function threeNames2(url) {
    try {
        const responses = Array.from({ length: 3 }, async () => {
            const response = await fetch(url);
            const data = await response.json();
            return data.first_name;
        });
        const names = new Array(responses.length);
        for (let i = 0; i < responses.length; i++) {
            const element = responses[i];
            names[i] = await Promise.resolve(element);
        }
        return names;
    }
    catch (error) {
        console.log(error);
    }
}
// console.log(await threeNames2("https://random-data-api.com/api/name/random_name"));
//3.3
function threeNames3(url) {
    const promises = Array.from({ length: 3 }, () => {
        return new Promise((resolve, rejected) => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => resolve(data.first_name))
                .catch((error) => rejected(error));
        });
    });
    return new Promise((resolve, reject) => {
        let count = promises.length;
        const results = [];
        for (let i = 0; i < promises.length; i++) {
            const promise = promises[i];
            promise
                .then((result) => {
                results[i] = result;
                count--;
                if (count === 0) {
                    resolve(results);
                }
            })
                .catch((error) => console.log(error));
        }
    });
}
// threeNames3("https://random-data-api.com/api/name/random_name")
//     .then((name) => console.log(name))
//     .catch((error) => console.log(error));
//4.1
function getFemale1(url, retryLimit) {
    const female = new RegExp("female", 'i');
    return new Promise((resolve, reject) => {
        let found = false;
        for (let i = 0; i < retryLimit; i++) {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                if (female.test(data.gender)) {
                    found = true;
                    resolve(data);
                }
            })
                .catch((error) => console.error(error));
        }
        setTimeout(() => {
            if (!found)
                reject(`Cannot find female in ${retryLimit} requests!`);
        }, retryLimit * 100);
    });
}
// getFemale1(`https://random-data-api.com/api/users/random_user`, 5)
//     .then((user) => console.log(user))
//     .catch((error) => console.log(error));
//4.2
async function getFemale2(url, retryLimit) {
    const female = new RegExp("female", 'i');
    try {
        for (let i = 0; i < retryLimit; i++) {
            const response = await fetch(url);
            const data = await response.json();
            if (female.test(data.gender)) {
                return data;
            }
        }
        throw new Error(`Cannot find female in ${retryLimit} requests!`);
    }
    catch (error) {
        console.log(error);
    }
}
function func1(callback) {
    const ipAddress = getMyIP('https://api.ipify.org/?format=json');
    callback(ipAddress);
}
async function func2() {
    return new Promise((resolve, reject) => {
        try {
            func1((ipAddress) => resolve(ipAddress));
        }
        catch (error) {
            reject(error);
        }
    });
}
// console.log(await func2())
//6
async function function1() {
    return await getMyIP('https://api.ipify.org/?format=json');
}
function function2(callback) {
    const ip = function1();
    callback(ip);
}
function2(function (ip) {
    ip.then((ip) => console.log(ip));
});
//# sourceMappingURL=index.js.map