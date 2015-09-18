# knockout custom extenders/bindings

In this repository you can see some knockout bindings that I've written or found throughout time.

This repo contains working examples for each custom knockout binding and extenders

Requirements:
 - knockout 3.2.x

## Currently available bindings:

1. **enter-press**

  On Enter press perform an action, while pressing shift+Enter adds a new line to the input
2. **webshim-datepicker**

  Initialize the datepicker by himself, avoiding having to call updatePolyfill whenever a new datepicker is added.

## Currently available extenders:

1. **ko-pagination-manager**

  (Lacks example)
  This extender empowers an observable with the capability of working as a pagination manager.
  It provides *all* methods and counts you might need to build a pagination navigator.

  Methods/Observables available:
  - currentPage
  - moveFirst - go to first page
  - movePrevious - go to previous page
  - moveNext - go to next page
  - moveLast - go to last page
  - goToPage
  - totalItems
  - pageCount (based on page size and total count)
  - pageList - array of numbers representing available pages. It is a shortened list of total pages
  - reset
