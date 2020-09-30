var RSS_FEED_URL = "http://googleappsupdates.blogspot.com/atom.xml";

// Webhook URL of the Google Chat room
var WEBHOOK_URL = "";

function fetchNews() {
  var xml = UrlFetchApp.fetch(RSS_FEED_URL).getContentText();
  var document = XmlService.parse(xml);
  
  var root = document.getRootElement();
  var atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  var feedburner = XmlService.getNamespace('http://rssnamespace.org/feedburner/ext/1.0');
  
  var items = root.getChildren('entry', atom);
  
  Logger.log(items.length + " entrie(s) found");
  
  var count = 0;
  
  for (var i = 0; i < items.length; i++) {
    
    var id = items[i].getChild('id', atom).getText();
    
    if(PropertiesService.getScriptProperties().getProperty(id) == null) {
      
      var pubDate = new Date(items[i].getChild('published', atom).getText());
      var link = items[i].getChild('origLink', feedburner).getText();
      var title = items[i].getChild('title', atom).getText();
      var description = '';
      PropertiesService.getScriptProperties().setProperty(id, link);
      postTopic_(title, description, link);
      PropertiesService.getScriptProperties().setProperty("lastUpdate", pubDate.getTime());
    }
    count++;
  }
}

function postTopic_(title, description, link) {
  var text = "*" + title + "*" + "\n";
  
  if (description){
    text += description + "\n";
  }
  
  text += link;
  
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify({
      "text": text 
    })
  };
  
  UrlFetchApp.fetch(WEBHOOK_URL, options);
}
