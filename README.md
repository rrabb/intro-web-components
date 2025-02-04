# Tutorial/Guide for CustomElement/WebComponent

  * [Web Components Introduction](https://academind.com/tutorials/web-components-introduction)
  * [Quick Tutorial for Web Components](https://medium.com/apprendre-le-web-avec-lior/a-brief-history-of-webcomponents-and-a-tutorial-to-make-yours-a52d329913e7)
  * [Custom Elements v1:Reusable Web Components](https://developers.google.com/web/fundamentals/web-components/customelements)
  * [Shadow DOM and slots for Self-contained Web Components aka Custom Elements](https://developers.google.com/web/fundamentals/web-components/shadowdom)
  * [Custom Elements Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
  * [Custom Elements walk-through](https://javascript.info/custom-elements)
  * [MDN Web Components intro](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
    * ⚓ Basic terms: life cycle callbacks, css pseudo-classes (:host, :defined, :host-context(), :host()), SLOT, TEMPLATE
  * [MDN Using creating and custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
    * [MDN ExpandingListItem example](https://mdn.github.io/web-components-examples/expanding-list-web-component/)
    * [JS file containing CustomElement - ExpandingListItem](https://mdn.github.io/web-components-examples/expanding-list-web-component/main.js)
    * [Git Repo of ExpandingListItem example](https://github.com/mdn/web-components-examples/tree/master/expanding-list-web-component)
    * [Another simple example - Adding Squares (Lifecycle callbacks)](https://mdn.github.io/web-components-examples/life-cycle-callbacks/)

# MyEmployeeCards.html 
Simple example of creating a CustomElement / Web Component using plain js (no frameworks). 
![Screenshot of MyEmployeeCards.html using MyEmployeeCard CustomElement](/MyEmployeeCards.html.jpg)

## Usage:
###  In plain html page:

```js
    <script type='text/javascript' src='MyEmployeeCard.js' />
```
### In svelte: 

```
    <script>
      import "./util/MyEmployeeCard";
      ...  
    </script>
```    
### HTML/Svelte markup:   
```html
  <div class="view card-container">
    <my-employee-card eid="121111" full-name="Lion Heart" job-position="Developer">
      <p slot="top"><i>** Star Employee **</i></p>
      <p slot="bottom"><b>** Star Employee **</b></p>
    </my-employee-card>
    <my-employee-card eid="133531" full-name="Goat Blah" job-position="Blabberer">
    </my-employee-card>
    <my-employee-card eid="444467" full-name="Brave Heart" job-position="Developer">
    </my-employee-card>
    <my-employee-card eid="561289" full-name="Sheep Blah" job-position="Blabberer">
    </my-employee-card>
  </div>
```
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
