# Currency Evergreen

> Below, I described the entire presentation on the project environment, project structure, configuration files and description, etc.

## Getting started

- **Before check in your system node.js, if in your system not have nodeJS please download package with [nodejs.org](https://nodejs.org/en/) and install node**

- **Install all packages and dependencies** :
```
   $ npm install
```

- **Launch project in dev mode**:
```
   $ npm run start
```

- **Project build**:
```
   $ npm run build
```

- **Others commands**:
```
   $ npm run precompile       // This command is simply a combination of the cleaning and copying
                                 files in the output directory

   $ npm run build-map        // Build project used create source map file

   $ npm run clean-dist       // Complete cleaning of the directory
   $ npm run copy-img         // Copying images files `assets/img/*.*` to a directory `distDir`,
                                 ignoring the parcel dimanical path/file.hash

   $ npm run copy-seo         // Copying seo files `assets/seo/*.*` to a directory `distDir`
   $ npm run copy-img     // Copying all files `assets/images/*.*` to a directory `distDir`
   $ npm run copy-host-files  // Copying host configs files `assets/host/*.*` to a directory `distDir`
```

## How to edit in localhost
- First to do this, you need start localhost server, just simple i your terminal run next command:
  $ npm run start
- Then open in you browser [localhost](http://localhost:1234/)

##  How testing production version
- Open in you browser [currency-evergreen.justtwic.art](https://currency-evergreen.justtwic.art/)
