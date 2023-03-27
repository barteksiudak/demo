## setup

Tested on:

```
  yarn v1.22.11
  node v14.17.6
  npm v6.14.15
```

`yarn install`

## run

Run app as develpment mode: `yarn start`. The app will start on port 4200 [http://localhost:4200](http://localhost:4200) - it's set in `webpack.common.js`

## build

Before build run `yarn test` && `yarn lint`
`yarn build` and the application will be in `dist/`

## tests

`yarn test` or `yarn test:watch`
We use `Jest` & `Enzyme`

- All `src/compositions/*.ts` must be covered by tests.
- All Components from `components/` should have at least one test which check rendering.

## icons

https://www.flaticon.com/packs/situations-and-choices-2?word=tick
