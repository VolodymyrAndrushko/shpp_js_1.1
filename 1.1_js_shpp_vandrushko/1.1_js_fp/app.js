
let text = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
            sda,,,
#45.40,34.29,Джанкой,43343,

# в этом файле три строки-коммента :)`

let replacedText = `Місто біла церква чудове, до речі бІЛА ЦЕрква, і місто вінНиця нічим не гірше.`

const parseCSV = (data) => {
    const parsed = data
        .split("\n")
        .filter(city => /^[^#](.*,.*){4}/.test(city))
        .map(element => {
            const elements = element.split(",");
            return { x: elements[0], y: elements[1], name: elements[2], population: elements[3] };
        })
        .sort((city2, city1) => city1.population - city2.population)
        .slice(0, 10)
        .reduce((accumulator, currentValue, rating) => {
                accumulator[currentValue.name] = {
                    population: currentValue.population,
                    rating: rating + 1
                };
            return accumulator;
        }, {});

    return (text) => text
        .replace(new RegExp(Object.keys(parsed).join("|"), "ig"),
            (city) => {
                const cityName = Object.keys(parsed).find(name => city.toLowerCase() === name.toLowerCase())
                return `${cityName} (${parsed[cityName].rating} місце в ТОП-10 найбільших міст України, населення ${parsed[cityName].population})`;
            }
        );
};

const parsed = parseCSV(text);
console.log(parsed(replacedText));
