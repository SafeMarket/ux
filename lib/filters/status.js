const statusLabels = [
  'Processing',
  'Cancelled',
  'Shipped',
  'Disputed',
  'Dispute Resolved',
  'Finalized'
]

module.exports = function statusFilter() {
  return function statusFilterFunction(status) {
    if (!status) {
      return
    }
    return statusLabels[status.to('number')]
  }
}
