# nn-mui 

To keep the size of the git-repo small the node-modules folder is not included. 
After runninng 
```
npm install 
```
you need to edit the webpack.config.js file in `react-scripts/config/` to get 
worker-plugin running. 

Add the import 
```
const WorkerPlugin = require("worker-plugin");
```

and in the plugin array: 
```
plugins: [
      // Generates an `index.html` file with the <script> injected.
      new WorkerPlugin(),
      ...
```

