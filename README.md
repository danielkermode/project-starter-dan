#project-starter-dan

[![Build Status](https://travis-ci.org/danielkermode/project-starter-dan.svg?branch=master)](https://travis-ci.org/danielkermode/project-starter-dan)

A scaffolding tool for building node projects.

```npm i -g project-starter-dan```.

Recommended to use with node >=6.2.1.

```
usage: dank [template] [yourdirname]
       dank add <yourdirname>
       dank config

Without any arguments, dank will prompt for a template to use.
With [template], dank will copy the template into the current dir.
With [yourdirname], dank will give the new folder the specified name.

add <yourdirname> will add your (relative or absolute) dir to the usable templates.
config will walk through a setup that specifies default package.json values.

```

If you are generating a project, a directory will be created (within the current directory) with the given name.

Template is one of:

```barebones-react``` for a basic react setup (webpack dev server with hot reloading).

```react-express``` for react with express (still has webpack with hot reloading).

```fullstack-db``` A full stack setup with react-router, redux bindings, express and knex on the backend with code for a postgres db.

```basic-angular``` A basic Angular 2 setup with Typescript, taken from the tutorial https://angular.io/docs/ts/latest/quickstart.html.

```basic-auth``` An express server with authentication and encryption using passport and bcrypt, in conjunction with a postgres database. Uses handlebars for the frontend.

All templates come with a README.md for further information/scripts.

WIP.