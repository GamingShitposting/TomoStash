---
---
(function(){

var articleEl = document.querySelector('main article');
var asideEl = document.querySelector('main aside ul');

var json = document.querySelector('script[type="application/json"][id="tome"]').innerHTML;
var tome = JSON.parse(json);
var id = (tome.folder ? tome.slug.split('/')[0] : tome.slug);

if (tome.file) {
    articleEl.innerHTML += '<span class="h2">Download tome</span><ul><li><button>' + tome.file + '</button></li></ul>';
    articleEl.querySelector('button').addEventListener('click', function(){
        location.href = tome.config.store + '/tomes/' + id + '/' + tome.folder + '/' + tome.file;
    });
} else if (tome.chapters) {
    var chapters = '';
    tome.chapters.forEach(function(chapter){
        chapters += '<li><button>' + chapter + '</button></li>';
    });
    articleEl.innerHTML += '<span class="h2">Download chapters</span><ul>' + chapters + '</ul>';
    articleEl.querySelectorAll('button').forEach(function(button){
        button.addEventListener('click', function(){
            location.href = tome.config.store + '/tomes/' + id + '/' + tome.folder + '/' + button.textContent;
        });
    });
}

asideEl.insertBefore(Object.assign(document.createElement('li'), {
    innerHTML: '<iframe src="{{ "/reader/" | prepend: site.baseurl }}#' + encodeURIComponent(json) + '" style="width: 100%; height: 90vh; border: none; position: relative; z-index: 1;" allow="fullscreen" allowfullscreen="allowfullscreen"></iframe>',
}), asideEl.children[0]);

})();