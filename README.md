<img src="https://raw.githubusercontent.com/msavin/Parrot/master/PARROT.png">

**Parrot is a hash router for Meteor.** An easy way to understand it to think of it as having `Session` stored on the URL instead of in-memory. Then, picture that every time the URL changes, a function runs with all the parameters passed into it. 

Parrot works great with Lamma (coming soon), a layout manage for Meteor-Blaze applications, and a friend of Parrot.

```javascript
/*____________________________________________________________________
|                      |                  |                           |
|  http://meteor.toys  /  #documentation  /  section=Mongol/type=pro  |
|  Origin              |  Section         |  Key/Value Parameters     |
|______________________|__________________|__________________________*/

Router.register({
    "documentation": function (parameters) {
        console.log("Person is viewing: " +  parameters.section); 
        console.log("The version is: " +  parameters.type);
    },
    "buyMeteorToys": function () {
        // ... 
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
// Output -> 
//            console: Person is viewing: Mongol
//            console: The version is: pro
```

The code above will route the application from the default of `http://meteor.toys/#home` to `http://meteor.toys/#documentation/section=Mongol/type=pro`, and run the appropriate callback.

# Copy and Paste to Start

Getting started with Parrot is as easy as running:

		meteor add msavin:parrot

and then tuning this chunk of code on your client:

```javascript
Router.init({
    home: "home",
    onError: function () {
        // Display error notice
        FancyUI.error("404");
    },
    onChange: function (newRoute, oldRoute) {
        Analytics.track(newRoute.name);
    }
});
```

Once you have that set, you can use `Router.register()` to register routes, as show in the example on top. 

If a route is not registered, Parrot will run on the `onError` callback. If a route is defined, Parrot will run it along with the `onChange` callback, which can be used to bake in additional guards, tracking, etc.

# How To Go Places

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

# Parameter Caching

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

Parameter caching can be handy for letting your application "remember" where it's user was. For example, if a user navigates to "documentation" in your app, then to "dashboard", and then back to "documentation", you can drop them off exactly where they were, as shown in the example above.

# Sticky Parameters

**Coming Soon.** In addition to setting parameters on the URL and being able to cache their values, you may also want to have parameters that stick around even if they were not declared in the `Router.go()` call. To do so, simply prefix the parameter with an underscore (`_`).

```
Router.set("_showMenu", "true");
```

For as long as that value is present on the URL, and the navigation is handled with-in the application, the parameter will "stick" around. Therefore, if the user switches to back-forward browser navigation, it should work smoothly.

# Reactive Key/Value Parameters

Whatever key/value pair you set through on URL will be set as a reactive value in the application, and whatever reactive value you set in the application will be displayed in the URL. It's like a parrot - hah!

```javascript
// Set key/value pair just like with Session
Router.set("showMenu", "true");
// Turns this: http://meteor.toys/#documentation/section=Mongol
//       into: http://meteor.toys/#documentation/section=Mongol/showMenu=true

// Remove key/value pair
Router.delete("showMenu");
// Turns this: http://meteor.toys/#documentation/section=Mongol/showMenu=true
//       into: http://meteor.toys/#documentation/section=Mongol

// This is a reactive data source powered by ReactiveDict
Router.get("showMenu");
```

With this approach, it's really easy to control small parts of your application while embracing the full capabilities of browser navigation. A URL can usually contain 2000 characters, so you can keep a lot of data there.

# Setting Multiple Parameters at Once

Every time you set or remove a parameter, it counts as an entry in the browsers history, and therefore the back-forward navigaton. Therefore, when you need to step multiple parameters at once, you might prefer to do so in one shot. Here's how you can do that:

```javascript
Router.set({
    'a':'1',
    'b':'2'
}); 
// URL becomes: http://localhost:3000/#/a=1/b=2

Router.delete(['a','b']); 
// URL becomes: http://localhost:3000/#/
```

You can use Parrot for the parameters functionality alone by not using the `Router.init` function. At that point, it becomes like `Session` except the key/value pairs are stored on the URL instead of just in memory. With that, you get all the benefits of `Session`, plus support for reloads, link sharing, and back-forward navigation.

# Project State

Parrot is light, stable, and designed to work closely with Meteor. If it fits your needs then you should have no problems using it. 

Parrot is intended to be used for applications only. If you are building a content/SEO-driven website, you may prefer something like [Flow-Router](http://github.com/kadira/flow-router).

**Thanks to [Moshe Berman](http://github.com/mosheberman) for helping with the URL parser!**
