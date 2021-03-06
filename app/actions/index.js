import fetch from 'isomorphic-fetch'

export const REQUEST_STEPS = 'REQUEST_STEPS'
export const RECEIVE_STEPS = 'RECEIVE_STEPS'
export const SELECT_PATH = 'SELECT_PATH'
export const INVALIDATE_PATH = 'INVALIDATE_PATH'

export function selectPath(path) {
  return {
    type: SELECT_PATH,
    path
  }
}

export function invalidatePath(path) {
  return {
    type: INVALIDATE_PATH,
    path
  }
}

function requestSteps(selectedPath = "basicDefault") {
    return {
        type: REQUEST_STEPS,
        selectedPath
    }
}

function receiveSteps(selectedPath, json) {
    return {
        type: RECEIVE_STEPS,
        selectedPath,
        steps: json,
        receivedAt: Date.now()
    }
}

export function fetchPosts(path) {
  return function (dispatch) {
    dispatch(requestSteps(path))
    // when we really grab all steps for a selected path
    // return fetch(`/api/$(path)/`)
    return fetch('/api/step')
      .then(response => response.json())
      .then(json => dispatch(receiveSteps(path, json)))
  }
}
