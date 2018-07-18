Circus Tour Manager
===

Create a server for tracking travelling circus tours, including stops. 

On this tours the stops are not known until they happen, so
the API needs to be able to add, update and remove stops.

## Add Common Error Handling

1. Use standard Error Handler (you can use the one from classwork reference)
1. Make sure to `.catch(next)` in routes!

## Basic CRUD

The `/tours` API should offer CRUD for `GET`, `GET` by id, and `POST`

The schema structure of a tours looks like:

path | type info
---|---
title | required title of the tour
activities | array of string activites that will happen during the show
launchDate | date tour will start. default to now
stops | array of stop objects, see stop schema below

## Sub Documents (stops)

In addition there are the following APIs for managing tour stops:

* `POST` `/tours/:id/stops` - add a stop to this tour
* `DELETE` `/tours/:id/stops/:stopId` - remove a stop that got cancelled
* `POST` `/tours/:id/stops/:stopId/attendence` - update a stop (after complete) with number of attendees (NOTE:
this should _only_ update the attendence field of the stop, not other updates allowed)

The schema structure of a stop looks like:

path | type info
---|---
location | object with city, state, and zip
weather | object with weather conditions (see demo, choose some fields)
attendence | number with min of 1

## Wunderground Middleware

When adding a stop, the API takes a `zip`, but needs to look up additional information. 
for info on getting a key, plus a request function you can use (or use as a guide to create your own).

You need to TDD this as middleware, but keep in mind you do **not** use the actual api function to unit test the middleware. 
Check that it augments the `request.body` with the required inforation.


## Rubric **15pts**

* Tour CRUD Testing and API **5pts**
* Common Error Handling and catch(next) **2pts**
* TDD Wunderground middleware **3pts**
* Stop Testing and API **5pts**
