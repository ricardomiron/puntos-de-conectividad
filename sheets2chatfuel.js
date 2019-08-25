function doGet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  elements = create_elements(data)
  if (elements.length != 0) {
     return buildImageGallery(elements);
  } else {
    return notFound()
  }
}

function create_elements(data) {
  var elements = [];
  for (var i = 1; i < data.length; i++) {
    var object = {
      title : data[i][0],
      image_url : data[i][2],
      subtitle : data[i][1],
      buttons : [
        {
          type: "web_url",
          url: data[i][3],
          title: "Ver en el mapa"
        }
      ]
    }
    elements.push(object)
  }
  return elements
}

function buildImageGallery(elements) {
  var output = JSON.stringify({
    messages: [
      {
        attachment: {
          type: "template",
          payload: {
            template_type:"generic",
            image_aspect_ratio: "square",
            elements: elements
          }
        }
      }
    ]
  });

  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

function notFound() {
  var output = JSON.stringify({
    messages: [
      {
        text: "There are no items in this category"
      }
    ]
  });
  return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}
