#project-starter-dan

A scaffolding tool for building node projects.

```npm i -g project-starter-dan```.

NOTE: This module requires node version >=6.2 It uses ```.include()```.


```
usage: dank [template] [yourdirname]
       dank add <yourdirname>

Without any arguments, project-starter will prompt for a template to use.
With [template], project-starter will copy the template into the current dir.
With [yourdirname], project-starter will give the new folder the specified name.

add <yourdirname> will add your (relative or absolute) dir to the usable templates.

```

If you are generating a project, a directory will be created (within the current directory) with the given name.

Template is one of:

```barebones-react``` for a basic react setup (webpack dev server with hot reloading).

```react-express``` for react with express (still has webpack with hot reloading).

WIP.