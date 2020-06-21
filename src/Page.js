import React from 'react';
import './styles/Page.css';

const Page = (props) => {
  return <section className='page'>{props.children}</section>;
};

export default Page;
