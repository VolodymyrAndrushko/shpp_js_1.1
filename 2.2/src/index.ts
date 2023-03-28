import fetch from 'node-fetch';

//1

// const response: Response = await fetch('https://api.ipify.org/?format=json');
// const data: {ip:string} = await response.json();
// const ip: string = data.ip;
// console.log(ip);

//2

async function getMyIP(url: string) {
    try {
        const response: Response = await fetch('https://api.ipify.org/?format=json');
        const data: { ip: string } = await response.json();
        const ip: string = data.ip;
        return ip;
    } catch (error) {
        console.log(error);
    }
}

// console.log(await getMyIP('https://api.ipify.org/?format=json'));


//3.1

async function threeNames1(url: string) {
    try {
        const responses: Promise<string>[] = Array.from({ length: 3 }, async () => {
            const response: Response = await fetch(url);
            const data: { first_name: string } = await response.json();
            return data.first_name;
        });
        const names: string[] = await Promise.all(responses);
        return names;
    } catch (error) {
        console.log(error);
    }
}

// console.log(await threeNames1("https://random-data-api.com/api/name/random_name"));

//3.2

async function threeNames2(url: string) {
    try {
        const responses: Promise<string>[] = Array.from({ length: 3 }, async () => {
            const response: Response = await fetch(url);
            const data: { first_name: string } = await response.json();
            return data.first_name;
        });
        const names: string[] = new Array<string>(responses.length);
        for (let i = 0; i < responses.length; i++) {
            const element: Promise<string> = responses[i];
            names[i] = await Promise.resolve(element);
        }
        return names;
    } catch (error) {
        console.log(error);
    }
}

// console.log(await threeNames2("https://random-data-api.com/api/name/random_name"));
//3.3

function threeNames3(url: string) {
    const promises: Promise<string>[] = Array.from({ length: 3 }, () => {
        return new Promise((resolve, rejected) => {
            fetch(url)
                .then((response: Response) => response.json())
                .then((data: { first_name: string }) => resolve(data.first_name))
                .catch((error) => rejected(error));
        });
    });

    return new Promise((resolve, reject) => {
        let count: number = promises.length;
        const results: string[] = [];
        for (let i = 0; i < promises.length; i++) {
            const promise: Promise<string> = promises[i];
            promise
                .then((result) => {
                    results[i] = result;
                    count--;
                    if (count === 0) {
                        resolve(results);
                    }
                })
                .catch((error: string) => console.log(error));
        }
    })
}


// threeNames3("https://random-data-api.com/api/name/random_name")
//     .then((name) => console.log(name))
//     .catch((error) => console.log(error));

//4.1

function getFemale1(url: string, retryLimit: number) {
    const female: RegExp = new RegExp("female", 'i')

    return new Promise((resolve, reject) => {
        let found: boolean = false;
        for (let i = 0; i < retryLimit; i++) {
            fetch(url)
                .then((response: Response) => response.json())
                .then((data: { gender: string }) => {
                    if (female.test(data.gender)) {
                        found = true;
                        resolve(data);
                    }
                })
                .catch((error: string) => console.error(error));
        }
        setTimeout(() => {
            if (!found) reject(`Cannot find female in ${retryLimit} requests!`);
        }, retryLimit * 100);
    });
}

// getFemale1(`https://random-data-api.com/api/users/random_user`, 5)
//     .then((user) => console.log(user))
//     .catch((error) => console.log(error));

//4.2

async function getFemale2(url: string, retryLimit: number) {
    const female: RegExp = new RegExp("female", 'i')
    try {
        for (let i = 0; i < retryLimit; i++) {
            const response: Response = await fetch(url);
            const data: { gender: string } = await response.json();
            if (female.test(data.gender)) {
                return data;
            }
        }
        throw new Error(`Cannot find female in ${retryLimit} requests!`);
    } catch (error) {
        console.log(error);
    }
}

// console.log(await getFemale2(`https://random-data-api.com/api/users/random_user`, 5));

//5

type CallbackType = (ipAddress: Promise<string | undefined>) => void;

function func1(callback: CallbackType) {
    const ipAddress: Promise<string | undefined> = getMyIP('https://api.ipify.org/?format=json');
    callback(ipAddress);
}

async function func2(): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        try {
            func1((ipAddress) => resolve(ipAddress));
        } catch (error) {
            reject(error);
        }
    });
}

// console.log(await func2())

//6

async function function1() {
    return await getMyIP('https://api.ipify.org/?format=json');
}

function function2(callback: (ip: Promise<string | undefined>) => void) {
    const ip: Promise<string | undefined> = function1();
    callback(ip);
}

function2(function (ip) {
    ip.then((ip) => console.log(ip))
})