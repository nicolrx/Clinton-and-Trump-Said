/* global instantsearch */

app({
  appId: 'XXX',
  apiKey: 'XXX',
  indexName: 'president_words'
});

function app(opts) {
  var search = instantsearch({
    appId: opts.appId,
    apiKey: opts.apiKey,
    indexName: opts.indexName,
    searchParameters: {
    	"query": ""
    }
  });

  var widgets = [
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Search what Clinton and Trump said about...'
    }),
    instantsearch.widgets.hits({
      container: '#results',
      hitsPerPage: 9,
      templates: {
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      }
    }),
    instantsearch.widgets.pagination({
      container: '#pagination',
      scrollTo: '#search-input'
    }),
	  instantsearch.widgets.refinementList({
		container: '#candidate',
		attributeName: 'id',
		limit: 3,
		operator: 'or',
		templates: {
      		header: '<h6>Filters</h6>'
    	}
	  })
  ];

  widgets.forEach(search.addWidget, search);
  search.start();
}

function getTemplate(templateName) {
  return document.querySelector('#' + templateName + '-template').innerHTML;
}

function getHeader(title) {
  return '<h5>' + title + '</h5>';
}
