$.webshims.setOptions("forms-ext", {
  replaceUI: 'auto',
  types: 'date',
  'date': {
    'startView': 2,
    'minView': 2,
    'calculateWidth': false,
    'classes': 'hide-spinbtns'
  },
});

$.webshims.polyfill('forms forms-ext');

function MyViewModel() {
    this.selectedDate = ko.observable()
    this.selectedDateNotEmpty = ko.observable()
}

ko.bindingHandlers.webshimDatepicker = {
  init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    this.setTodayAsDefault = allBindings().setTodayAsDefault;
    if (this.setTodayAsDefault == undefined ) {
      this.setTodayAsDefault = true;
    }
    $(element).updatePolyfill();
    return $(element).on('change', function() {
      var date, serviceDate;
      date = $(this).val();
      serviceDate = valueAccessor();
      return serviceDate(date);
    });
  },
  update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    var serviceDate;
    serviceDate = valueAccessor();
    if (serviceDate() || !this.setTodayAsDefault) {
      return $(element).val(serviceDate());
    } else if (this.setTodayAsDefault) {
      $(element).val(moment().format('YYYY-MM-DD'));
      return serviceDate($(element).val());
    }
  }
};

ko.applyBindings(new MyViewModel());
