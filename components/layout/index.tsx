import { Header } from '../header'
import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
        <main>{children}</main>
      <footer />
    </>
  )
}