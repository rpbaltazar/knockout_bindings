ko.extenders.paginationManager = (target, pageSize) ->
  _pageSize = ko.observable pageSize || 10
  _currentPage = ko.observable 1
  _maxPages = 10

  target.currentPage = ko.computed {
    read: _currentPage,
    write: (newValue) ->
      if newValue > target.pageCount()
        _currentPage target.pageCount()
      else if newValue < 1
        _currentPage 1
      else
        _currentPage newValue
  }

  target.totalItems = ko.observable 0
  target.resultsMessage = ko.computed ->
    "#{target.totalItems()} results found"

  target.reset = ->
    target.totalItems 0
    target.currentPage 1

  target.pageCount = ko.computed ->
    Math.ceil(target.totalItems() / _pageSize()) || 1

  target.moveFirst = ->
    target.currentPage 1

  target.movePrevious = ->
    target.currentPage target.currentPage() - 1

  target.moveNext = ->
    target.currentPage target.currentPage() + 1

  target.moveLast = ->
    target.currentPage target.pageCount()

  target.goToPage = (pageNumber) ->
    target.currentPage pageNumber

  target.pageList = ko.computed ->
    split = _maxPages/2
    if target.currentPage() <= split + 1
      lowerBound = 1
      upperBound = Math.min(_maxPages, target.pageCount())
    else if target.currentPage() + (split-1) >= target.pageCount()
      lowerBound = Math.max(target.currentPage() - (_maxPages-1), target.pageCount() - (_maxPages-1))
      upperBound = target.pageCount()
    else
      lowerBound = target.currentPage() - split
      upperBound = target.currentPage() + (split-1)

    for num in [lowerBound..upperBound]
      num

  target
