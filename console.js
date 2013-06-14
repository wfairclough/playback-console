var $console = null;
var in_command = false;

function validate(line) {
  return line != '';
}

function scrollDown() {
  $('body').scrollTop($('body').innerHeight());
  window.scroll(0,$('body').innerHeight());
}

function handle(line) {
  in_command = true;
  setTimeout(function() {in_command = false;}, 0);
  setTimeout(scrollDown, 0);
  try {
    var swf = $('#rdio_api').get(0);
    with(swf) {
      var result = eval(line.toLowerCase());
    }
    if (typeof result == 'undefined') {
      return true;
    } else {
      try {
        result = stringify(result);
      } catch(e) {
        result = result.toString();
      }
      return [{'msg': result, 'className': 'result'}];
    }
  } catch(e) {
    return [{'msg': e.toString(), 'className': 'error'}];
  }
}

$(document).ready(function() {
	
  $console = $('#console').console({
    promptLabel: '>>> ',
    autofocus: true,
    commandValidate: validate,
    commandHandle: handle
  });

  $console.typer.insertAfter($console.inner).wrap($('<form>')).css({
    'position':'relative',
    'top':'-1px',
    'height':'1px',
    'resize': 'none',
    'font-size':'1px',
    'line-height': '1px',
    'margin': 0,
    'padding': 0,
    'border': 0
  }).parent().css('margin-top', '-20px');

  var playbackToken = tokens[document.domain];
  if (playbackToken == null) {
    $console.inner.prepend($('<div>').text('ERROR: no playback token found for: '+document.domain).addClass('error'));
    return;
  }

  $('#welcome-text').detach().prependTo($console.inner).removeAttr('id');

  var flashvars = {
    'playbackToken': playbackToken, // from token.js
    'domain': document.domain,                // from token.js
    'listener': 'callback'           // the global name of the object that will receive callbacks from the SWF
    };
  var params = {
    'allowScriptAccess': 'always'
  };
  var attributes = {};
  swfobject.embedSWF('http://www.rdio.com/api/swf/', // the location of the Rdio Playback API SWF
      'rdio_api', // the ID of the element that will be replaced with the SWF
      1, 1, '9.0.0', 'expressInstall.swf', flashvars, params, attributes);
});

$('html').click(function() { $('#console').click(); });

function logCallback(message) {
  var prompt = $('.jquery-console-prompt-box', $console.inner).last();
  var div = $('<div></div>').text(message).addClass('callback');
  if (in_command) {
    div.insertAfter(prompt);
  } else {
    div.insertBefore(prompt);
  }
  scrollDown();
}
function stringify(o) {
  return JSON.stringify(o);
}

window.callback = { };
window.callback.ready = function (a) {
  logCallback('ready('+stringify(a)+')');
};
window.callback.freeRemainingChanged = function (a) {
  logCallback('freeRemainingChanged('+stringify(a)+')');
};
window.callback.playStateChanged = function (a) {
  logCallback('playStateChanged('+stringify(a)+')');
};
window.callback.playingTrackChanged = function (a, b) {
  logCallback('playingTrackChanged('+stringify(a, b)+')');
};
window.callback.playingSourceChanged = function (a) {
  logCallback('playingSourceChanged('+stringify(a)+')');
};
window.callback.volumeChanged = function (a) {
  logCallback('volumeChanged('+stringify(a)+')');
};
window.callback.muteChanged = function (a) {
  logCallback('muteChanged('+stringify(a)+')');
};
window.callback.positionChanged = function (a) {
  logCallback('positionChanged('+stringify(a)+')');
};
window.callback.queueChanged = function (a) {
  logCallback('queueChanged('+stringify(a)+')');
};
window.callback.shuffleChanged = function (a) {
  logCallback('shuffleChanged('+stringify(a)+')');
};
window.callback.repeatChanged = function (a) {
  logCallback('repeatChanged('+stringify(a)+')');
};
window.callback.playingSomewhereElse = function () {
  logCallback('playingSomewhereElse()');
};
window.callback.updateFrequencyData = function (a) {
  logCallback('updateFrequencyData('+stringify(a)+')');
};


