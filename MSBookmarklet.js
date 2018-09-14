javascript: (function() {
  $.ajax({
    url: window.location.origin + document.getElementById('ServicePath').innerHTML + '/GetPlayerOptions',
    type: 'POST',
    data: JSON.stringify({
      'getPlayerOptionsRequest': {
        'ResourceId': document.getElementById('ResourceId').innerHTML,
        'QueryString': '',
        'UseScreenReader': 'false',
        'UrlReferrer': ''
      }
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(playerOpts) {
      var allMedia = playerOpts.d.Presentation.Streams[1].VideoUrls;
      for (var i = 0; i < allMedia.length; i++) {
        if (allMedia[i].MediaType == 'MP4') {
          var mp4Url = allMedia[i].Location;
          $('body').append(
              '<div id="dialog"><ul><li>Copy the title:<br><input type="text" onClick="this.select();" value="' +
              document.title + '"></li><li><a href=' + mp4Url +
              ' target="_blank">Right click on this link and then "Save as..."</a></li><li>Paste in to rename file correctly and save it</li><li>Click <a href="https://klvn.github.io/MediasiteDownloader/" target="_blank">here<a/> for more detailed instructions</li></ul></div>');
          $('<style type=\'text/css\'>.ui-dialog{ z-index:999;} li{padding-bottom:20px;}</style>')
              .appendTo('head');
          $(function() {
            $('#dialog').dialog()
          })
        }
      }
    }
  })
})()