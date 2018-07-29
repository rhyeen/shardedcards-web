[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")

# Sharded Cards Web App
Is a web browser-based trading card game that is built mobile-first and ready to play on modern browsers (except IE; he's not invited to the party).

Sharded Cards is proudly built using the [PWA Starter Kit](https://github.com/PolymerLabs/pwa-starter-kit), using the [Flash Cards Game](https://github.com/notwaldorf/flash-cards) as the starting point and the [wiki](https://github.com/PolymerLabs/pwa-starter-kit/wiki) for configuring and personalizing.

## Development

### Contributing

If you want to get started on contributing, head over the [Sharded Cards Wiki](https://github.com/rhyeen/shardedcards) and either check out the [Issues](https://github.com/rhyeen/shardedcards/issues) or [Projects](https://github.com/rhyeen/shardedcards/projects).  Not sure where to start?  You can [post your interest here](https://github.com/rhyeen/shardedcards/issues/2) and I'll get you started.

We keep a separate repo for Issues/Projects because the project will span more than one repo (front-end, back-end, etc).  If there is an issue specific to only this project, you can just [post an issue here](https://github.com/rhyeen/shardedcards-web/issues).

### Setup

```
git clone https://github.com/rhyeen/shardedcards-web
cd shardedcards-web
npm install
npm start
```

### Testing

To run the tests, you can run `npm run test`.  However, for the alpha stages we are not focused on automated testing.

### Build

To build the app, run `npm run build`. This will create a `build` folder that has all the minified 
bundles and assets you need to deploy. If you want to test that the build output works, you can run

```
npm run serve
```

## Notes

### Deployment

For deployment, I use [Netlify](https://www.netlify.com/). Since **Sharded Cards** does not have an Open Source license, you are not permitted to deploy the code to a public URL.

### Supported browsers
This app uses the `es6-bundled` bundle -- this means that it will not work on IE11. It could be deployed with the `es5-bundled` bundle, but nobody likes IE11 anyway.