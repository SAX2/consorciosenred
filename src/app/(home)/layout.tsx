import React from 'react'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout