var PrismicDOM = require('prismic-dom');

var linkResolver = function(doc) {
  // Pretty URLs for known types
  if (doc.type === 'list') return "/list/" + doc.uid;
  // Fallback for other types, in case new custom types get created
  return "/doc/" + doc.id;
};

var html = PrismicDOM.RichText.asHtml(document.data.body, linkResolver);