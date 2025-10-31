---
---
(function(){

var articleEl = document.querySelector('main article');
var asideEl = document.querySelector('main aside ul');

var json = document.querySelector('script[type="application/json"][id="tome"]').innerHTML;
var tome = JSON.parse(json);
var store = tome.store ? tome.config.stores[tome.store] : tome.config.store;
var id = (tome.folder ? tome.slug.split('/')[0] : tome.slug);
var hash = '';

if (tome.file) {
    articleEl.innerHTML += '<span class="h2">Download tome</span><ul><li><a target="_blank">' + tome.file + '</a></li></ul>';
    articleEl.querySelector('ul > li > a').href = store + '/tomes/' + id + '/' + tome.folder + '/' + tome.file;
} else if (tome.chapters) {
    var chapters = '';
    tome.chapters.forEach(function(chapter){
        chapters += '<li><a target="_blank">' + chapter + '</a></li>';
    });
    articleEl.innerHTML += '<span class="h2">Download chapters</span><ul>' + chapters + '</ul>';
    articleEl.querySelectorAll('ul > li > a').forEach(function(link){
        link.href = store + '/tomes/' + id + '/' + tome.folder + '/' + link.textContent;
    });
    var tryhash = decodeURIComponent(location.hash.slice(1));
    if (tome.chapters.includes(tryhash)) {
        hash = '#' + encodeURIComponent(JSON.stringify({ chapter: tryhash, showChapters: true }));
    }
}

articleEl.innerHTML += '<span class="h2">Embed code &amp; link</span>' +
    '<code>' + '&lt;iframe src="' + '</code>' +
    '<code style="font-style: italic;">' + location.protocol + '//' + location.host + '{{ "/reader/" | prepend: site.baseurl }}#/' + tome.locale + '/' + tome.slug + '</code>' +
    '<code>' + '" allowfullscreen&gt;&lt;/iframe&gt;' + '</code>';

asideEl.insertBefore(Object.assign(document.createElement('li'), {
    innerHTML: '<iframe src="{{ "/reader/" | prepend: site.baseurl }}#' + encodeURIComponent(json) + hash + '" style="width: 100%; height: 90vh; border: none; position: relative; z-index: 1;" allow="fullscreen" allowfullscreen="allowfullscreen"></iframe>',
}), asideEl.children[0]);

})();