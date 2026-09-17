'use client';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { setStoreRef } from './store.reference';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    setStoreRef(store);
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
