<img align="right" width="200" src="https://github.com/msavin/Parrot/raw/master/PARROT.png" />

# Parrot

## A New Kind of Router for Single Page Applications

Parrot is a PARameter ROUTer made just for building SPAs. It brings state management to a whole new level by letting you store any kind of data on the URL in a fast and convenient way.

Parrot simplifies route management in the same way that template-level subscriptions simplify data management. The two are a great combination, especially because the parameters are a reactive data source.

An easy way to understand Parrot to think of it as having `Session` stored on the URL instead of in-memory. Another way to look at it is, as if each URL is a function call. The `section` refers to the function name, and the `parameters` are its arguments. The best part is, you can use it however you would like.


```javascript
/*____________________________________________________________________
|                      |                  |                           |
|  http://meteor.toys  /  #documentation  /  section=Mongol/type=pro  |
|  Origin              |  Section         |  Parameters               |
|______________________|__________________|__________________________*/

Router.register({
    "documentation": function (parameters) {
        console.log("Person is viewing: " +  parameters.section); 
        console.log("The version is: " +  parameters.type);
    }
});

Router.go("documentation", {
	section: "Mongol",
	type: function () {
		if (Meteor.user().subscriber) {
			return "pro";
		} else {
			return "free";
		}
	}
});

// URL     -> http://meteor.toys/#documentation/section=Mongol/type=pro
// Output ->  Person is viewing: Mongol
//            The version is: pro
```

The code above will route the application from the default of `http://meteor.toys/#home` to `http://meteor.toys/#documentation/section=Mongol/type=pro`, and run the appropriate callback.

Parrot works great with [Lamma](https://www.github.com/msavin/Lamma), a layout manage for Meteor-Blaze applications, and a friend of Parrot.

## Quick Start

First, add Parrot to your Meteor application.

```bash
meteor add msavin:parrot
```

Then, configure the route _if_ you would like to:

```javascript
Router.init({
    home: "home",
    onError: function () {
        FancyUI.error("404");
    },
    onChange: function (newRoute, oldRoute) {
        ga('send', 'pageview', newRoute.hash);
    }
});
```

Finally, register your routes _if_ you would like to:

```javascript
Router.register({
    "documentation": function (parameters) {
        console.log("Person is viewing: " +  parameters.section); 
        console.log("The version is: " +  parameters.type);
    }
});
```

If a route is defined, Parrot will run its respective function along with the `onChange` callback. If it is not not registered, Parrot will run on the `onError` callback, if one is present. 

These features are completely optional. If you would prefer, you can use Parrot for just the `get` and `set` functions, and even stack it with other routers.

## How To Go Places

With Parrot, you can specify your routes as a string:

```javascript
Router.go("documentation/section=Mongol/showMenu=true");
```

However, in other cases you may want to set the parameters dynamically. To do that, you just pass in each parameter and its value as an object:

```javascript
Router.go('documentation', {
	section: function () {
		return "introduction";
	},
	type: "pro"
});
```

## Parameter Memory

Parrot caches the parameter values you set under each section. When specifying parameters in `Router.go`, you can pass the `cache` into your functions to leverage that value.

```javascript
Router.go('documentation', {
    section: function (cache) {
        if (cache) {
            return cache;
        } else {
            return "introduction";
        }
    },
    type: "pro"
});
```

Parameter memory can be handy for letting your application "remember" where the user was. For example, if a user navigates to "documentation" in your app, then to "dashboard", and then back to "documentation", you can drop them off exactly where they were, as shown in the example above.

## Reactive Key/Value Parameters

Whatever key/value pair you set through on URL will be set as a reactive value in the application, and whatever reactive value you set in the application will be displayed in the URL. It's like a parrot - hah!

```javascript
// Set key/value pair just like with Session
Router.set("section", "Mongol");
// Turns this: http://meteor.toys/#documentation/section=Mongol
//       into: http://meteor.toys/#documentation/section=Mongol

// This is a reactive data source powered by ReactiveDict
Router.get("section");
// Returns: "Mongol"

// Remove key/value pair
Router.delete("section");
// Turns this: http://meteor.toys/#documentation/section=Mongol
//       into: http://meteor.toys/#documentation
```

Parrot will automatically convert your values in and out of JSON, and encode and decode them where necessary, so you can store any kind of data there. 

With this approach, it's really easy to control small parts of your application while embracing the full capabilities of browser navigation. A URL can contain like 2000 characters, so you can keep a lot of data there. 

## Setting Multiple Parameters at Once

Every time you set or remove a parameter, it counts as an entry in the browsers navigation history, and therefore the back-forward navigaton. Thus, when you need to set multiple parameters at once, you might prefer to do so in one shot. Here's how you can do that:

```javascript
Router.set({
    'a': 1,
    'b': 2,
    'c': 3
}); 
// URL becomes: http://localhost:3000/#/a=1/b=2/c=3

Router.delete(['a','b']); 
// URL becomes: http://localhost:3000/#/c=3
```

You can use Parrot for the parameters functionality alone by not using the `Router.init` function. At that point, it becomes like `Session` except the key/value pairs are stored on the URL instead of just in memory. With that, you get all the benefits of `Session`, plus support for reloads, link sharing, and back-forward navigation.

## Project State and Intended Use

Parrot is designed for small and large single-page web applications. The package is light, stable, and designed to work closely with Meteor. If you run into any issues, please let me know.

**Thanks to [Moshe Berman](http://github.com/mosheberman) for helping with the URL parser!**
