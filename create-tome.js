(async function(){

async function request(query) {
    return (await (await fetch(`https://www.googleapis.com/books/v1/volumes/${query}`)).json());
}

async function query(arg) {
    if (arg.includes(' ')) {
        arg = (await request(`?q=${encodeURIComponent(arg)}`)).items[0].id;
    }
    return (await request(arg));
}

function tome(data) {
    const get = (val) => JSON.stringify(val || '');
    return `---
title: ${get(data.volumeInfo.title)}
subtitle: ${get(data.volumeInfo.subtitle)}
authors: ${get(data.volumeInfo.authors.join(', '))}
publisher: ${get(data.volumeInfo.publisher)}
date: ${data.volumeInfo.publishedDate.includes('-') ? get(data.volumeInfo.publishedDate) : ''}
isbn: ${get(data.volumeInfo.industryIdentifiers.map(item => item.identifier).join(', '))}
gbooks: ${get(data.id)}
file: ""
cover: ${get(data.volumeInfo.imageLinks.medium || data.volumeInfo.imageLinks.thumbnail)}
webpage: ""
---

${data.volumeInfo.description}`;
}

if (process.argv.length == 3) {
    const data = await query(process.argv[2]);
    console.log(tome(data));
}

})();