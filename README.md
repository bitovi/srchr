<!--
@page srchr
-->

# Srchr

[![Build Status](https://travis-ci.org/bitovi/srchr.png?branch=master)](https://travis-ci.org/bitovi/srchr)

Srchr is a crowdsourced exercise in collecting JavaScript
wisdom. For more information about the project, visit
http://blog.rebeccamurphey.com/2010/03/15/srchr-crowdsourcing-javascript-wisdom/.

This is a JavaScriptMVC version created by [Bitovi](http://bitovi.com).  

## Installing

Clone srchr and install its dependencies:

    git clone git://github.com/bitovi/srchr srchr
    cd srchr
    npm install
    bower install

## Running

Open [http://bitovi.github.com/srchr/](/).

## Testing

In your browser, open [http://bitovi.github.com/srchr/srchr/test.html]. To run it automated, open an console to
the `srchr` folder and run:

    npm test

## Building

Open a console to the `srchr` folder and run:

    grunt build

Open `index.html` in a text editor and change:

    <script src="bower_components/steal/steal.js" data-main="srchr/srchr"></script>

to

     <script type="text/javascript" src="/dist/bundles/srchr.js"></script>  

Open [http://bitovi.github.com/srchr/index.html](index.html) in your browser.

## Documenting

Open a console to the `srchr` folder and run:

    grunt document

Open `docs/index.html`.
