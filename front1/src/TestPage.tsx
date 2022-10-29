import React from 'react'

// https://stackoverflow.com/questions/4079280/communication-between-browser-tabs-windows-using-javascript

// https://github.com/auth0/auth0-spa-js/issues/819

// https://datatracker.ietf.org/doc/html/rfc6265#section-7.2
// Some user agents provide users the option of preventing persistent
// storage of cookies across sessions.  When configured thusly, user
// agents MUST treat all received cookies as if the persistent-flag were
// set to false.  Some popular user agents expose this functionality via
// "private browsing" mode [Aggarwal2010].

export interface TestState {
  isAuthenticated: boolean
  isAuthenticating: boolean
}

const defaultValue: TestState = {
  isAuthenticated: false,
  isAuthenticating: true,
}

const MyContext = React.createContext<TestState>(defaultValue)

// @ts-ignore
if (!window.TEST_STUFF) {
  setTimeout(() => {
    // @ts-ignore
    window.TEST_STUFF = new Date().toISOString()
  }, 2000)
}

export function TestUser() {
  return <MyContext.Consumer>{(c) => JSON.stringify(c, null, 4)}</MyContext.Consumer>
}

let counter = 0

export function TestPage() {
  const [state, setState] = React.useState<TestState>({
    isAuthenticated: false,
    isAuthenticating: true,
  })

  // @ts-ignore
  const token = window.TEST_STUFF
  console.debug('--0--', { token })

  React.useEffect(() => {
    console.debug('--1--', { token })
    if (token && !state.isAuthenticated) {
      setState((prev) => ({ isAuthenticating: false, isAuthenticated: true }))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  React.useEffect(() => {
    ++counter
    if (counter > 100) return
    console.debug('--2--', JSON.stringify(state, null, 2))
    setTimeout(() => setState(() => ({ isAuthenticated: false, isAuthenticating: false })), 200)
  }, [state])

  return (
    <MyContext.Provider value={state}>
      <div style={{ margin: '3em 5em' }}>
        Hello world!
        <div>token: {token}</div>
        <TestUser />
        <div>{counter}</div>
        {/* @ts-ignore */}
        <div>TEST_STUFF: {`${JSON.stringify(window.TEST_STUFF)}`}</div>
      </div>
    </MyContext.Provider>
  )
}
