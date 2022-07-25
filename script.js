const url_kenya = 'http://de1.api.radio-browser.info/json/stations/search?country=Kenya'
const list_container = document.getElementById('app')
const theul = document.createElement('ul')
theul.classList.add('station-list')
list_container.appendChild(theul)

let all_stations = null


function doit() {
    return fetch('./kenya_stations.json') //IMPORTANT: To be able to assign the result of fetch to a variable, you need to return the fetch promise.
        .then(response => response.json())
        .then(data => setit(data))
        .catch(err => console.log(err))
}

function setit(data) {
    all_stations = data
    // let filtered = arr_stations.map(({ name, url, favicon, tags }) => ({ name, url, favicon, tags }))
    let filtered = all_stations.map(station => {
        return {
            name: station.name,
            url: station.url,
            favicon: station.favicon,
            tags: station.tags
        }
    }).reduce((unique, o) => {
        if (!unique.some(station => station.name === o.name && station.url === o.url)) {
            unique.push(o);
        }
        return unique;
    }, []) //.filter(station => !station.name.toLowerCase().includes('inooro')) //
    return filtered
}

function add_to_list(station) {

    let li = document.createElement('li')
    li.innerHTML = `<a href="${station.url}" target="_blank">${station.name}</a>`
    theul.appendChild(li)
}

let ans = await doit()
// console.log(ans);
ans.forEach(station => add_to_list(station))