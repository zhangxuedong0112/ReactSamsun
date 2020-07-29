import React from 'react';

const Intensify = (packages: any, component: React.FC) => {
  for (let index = 0; index < packages.length; index++) {
    const p = packages[index];
    component = p(component);
  }

  return component;
};

export default Intensify;
