(function() {
  var showError = function(message) {
    if (!message)
      return

    var el = document.getElementById('error-message')

    el.innerHTML = message
    el.style.display = 'block'
  }

  var main = function() {
    var containerEl = document.getElementById('sourcecode-container')
    var codeEl = containerEl.getElementsByTagName('code')[0]
    var url = new URL(window.location.href)
    var jsonSourceStr = url.searchParams.get('json')

    var jsonStr = jsonSourceStr || '{}'

    if (jsonSourceStr) {
      try {
        var json = JSON.parse(jsonSourceStr)
        jsonStr = JSON.stringify(json, null, 4)
      } catch(e) {
        // show that the JSON is not valid
        showError('JSON parsing failed. ' + e.message)
      }
    } else {
      showError('Parameter "json" not provided or empty.')
    }

    codeEl.innerHTML = jsonStr

    Prism.highlightAllUnder(containerEl)
  }

  // Run it
  main()
})()