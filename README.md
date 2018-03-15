# react-form-helper

## requirements
`bootstrap`

## install
```bash
> npm install git+https://git@github.com/kalppi/react-form-helper.git
```

## example
```js
import React, { Component } from 'react';
import { Field, SingleRow } from 'react-form-helper';

class UserForm extends Component {
  render() {
    return <form>
      <Field name='name' value={name} />
      <Field name='email' value={email} />

      <SingleRow>
        <Field name='start' value={start} />
        <Field name='end' value={end} />
        <Field name='total' text='#' value={end - start} size='2' />
      </SingleRow>
    </form>;
  }
}
```
