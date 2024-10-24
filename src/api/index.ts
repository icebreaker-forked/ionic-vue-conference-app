export function loadLocalStore() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  }
  catch {
    return undefined
  }
}

export function saveToLocalStore(state: any) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  }
  catch {
    // ignore errors
  }
}
