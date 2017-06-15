import React from 'react';
import css from './hello.css';

export default class Hello extends React.Component {
    render() {
        return <div className={css.helloWorld}>Hello world</div>
    }
}