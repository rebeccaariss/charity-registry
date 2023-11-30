// References:
// https://www.freecodecamp.org/news/react-context-for-beginners/
// https://react.dev/reference/react/createContext
// https://www.youtube.com/watch?v=q8vzz2cSwCY&ab_channel=LighthouseLectures
// https://www.npmjs.com/package/react-cookie#simple-example-with-react-hooks

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

// Initialize with createContext (establish initial context); context will be
// referenced through this SessionContext variable:
const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(['charityregistry_auth']);

  const [session, setSession] = useState({
    role: 'guest',
    id: null
  });

  // This is how we will update the session from within child components:
  const updateSession = (newSession) => {
    setCookie('charityregistry_auth', JSON.stringify(newSession))
    setSession(newSession);
  };

  // Needed to call useEffect here to console.log cookies because of the nature
  // of the React component lifecycle. The cookies wouldn't have been available
  // yet outside of a call to another lifecycle hook:
  // useEffect(() => {
  //   console.log('!!!!!')
  //   console.log(cookies)
  // }, [cookies]);

  return (
    // This is what will ultimately wrap all other components so that every
    // component within App can access session data:
    // (We need to do it this way because JSX cannot pass down a function; it
    // can only return a single object. Enter: SessionContext.Provider).
    <SessionContext.Provider value={{ session, updateSession }}>
      {/* App is empty without this line (because we're wrapping child components
      in SessionContext, so we need to indicate that at this level): */}
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('component must be a child to SessionProvider');
  }
  return context;
};
