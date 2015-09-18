function MyViewModel() {
    this.textContents = ko.observable()
    this.doMyStuff = function() { alert('enter pressed!!') }
}

ko.bindingHandlers.onEnterPress = {
  init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
    var allBindings;
    allBindings = allBindingsAccessor();
    return $(element).keypress(function(event) {
      var keyCode;
      keyCode = event.which != null ? event.which : event.keyCode;
      if (keyCode === 13 && !event.shiftKey) {
        allBindings.onEnterPress.call(viewModel);
        return false;
      } else {
        return true;
      }
    });
  }
};

ko.applyBindings(new MyViewModel());
