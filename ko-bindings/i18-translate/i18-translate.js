function MyViewModel() {
  window.Dictionaries = {};
  window.Dictionaries.i18 = {};
  window.Dictionaries.i18["en-US"] = {
    introText: "This is a text that has translation in multiple languages",
    toggleLanguage: "Toggle language"
  };
  window.Dictionaries.i18["pt-PT"] = {
    introText: "Este e um texto que tem traducao em varias linguas",
    toggleLanguage: "Alternar lingua"
  };
  window.Dictionaries.i18["sp-SP"] = {
    introText: "Este es un texto que tiene traducción en varios idiomas",
    toggleLanguage: "Alternar idioma"
  };

  this.languagesAvailable = Object.keys(window.Dictionaries.i18);
  this.currentLanguageIndex = ko.observable(0);

  this.currentLanguage = ko.pureComputed((function(_this) {
    return function() {
      return _this.languagesAvailable[_this.currentLanguageIndex()];
    };
  })(this));

  this.toggleLanguage = function(){
    // NOTE: this relies on navigator.language,
    // so for demo purposes we need to change the default behaviour of the
    // language fetching. This should not be the case unless the user
    // explicitly requires another language to be set, you should rely on
    // browsers default
    this.currentLanguageIndex((this.currentLanguageIndex() + 1) % this.languagesAvailable.length);
  }
}

ko.bindingHandlers.i18Text = {
  update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    var children, currentLanguage, i18Text, ref, ref1;
    let key = valueAccessor().i18;
    // NOTE: Please refer to above NOTE
    //currentLanguage = window.navigator.language;
    currentLanguage = viewModel.currentLanguage();
    i18Text = ((ref = Dictionaries.i18[currentLanguage]) != null ? ref[key] : void 0) || ((ref1 = Dictionaries.i18['en-US']) != null ? ref1[key] : void 0) || ("Translation missing for " + key + " - " + currentLanguage);
    children = $(element).children();
    $(element).text(i18Text + " ");
    return children.each(function(index, child) {
      return $(element).append(child);
    });
  }
};

ko.applyBindings(new MyViewModel());
