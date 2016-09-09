<img src='https://raw.githubusercontent.com/msavin/Parrot/master/PARROT.png'>

**Parrot is an easy to use hash router for Meteor.** An easy way to understand it to think of it as having Session or ReactiveDict stored on the URL instead of in-memory. Then, picture that every time the URL changes, a callback runs with all the parameters specified. 

Parrot feels really simple and thin. It gives you reactivity in all the right places, while costing your visitors less than four kilobytes of bandwidth.

```javascript
/*___________________________________________________________________
|                      |                  |                          |
|  http://meteor.toys  /  #documentation  /  section=Mongol/type=pro |
|  Origin              |  Section         |  Key/Value Parameters    |
|______________________|__________________|_________________________*/

Router.register({
    'documentation': function (parameters) {
        console.log('Ran `documentation` route');
        console.log('Person is viewing: ' +  parameters.section); 
        console.log('The version is: ' +  parameters.type);
    },
    'buyMeteorToys': function () {
        Session.set('lol', 'just a subtle hint');
    }
});

Router.go('documentation/section=Mongol/type=pro');
// URL     -> http://meteor.toys/#documentation/section=Mongol/type=pro
// Console -> Ran `documentation` route
//            Person is viewing: Mongol
//            The version is: pro
```

The code above will route the application from the default `http://meteor.toys/#home` to `http://meteor.toys/#documentation/section=Mongol/type=pro`, and run the appropriate callback.  

# Copy and Paste to Start

Configuring Parrot is as easy as updating this chunk of code:

```javascript
Router.init({
    home: "dashboard",
    onError: function () {
        // Display error notice
        FancyUI.error("404");
    },
    onChange: function (newRoute, oldRoute) {
        Analytics.track(newRoute.name);

        if (!localStorage.get("Meteor.loginToken")) {
            Router.go("signIn");
        }
    }
})

Once you have that set, you can use `Router.register()` anywhere to configure the callbacks. If a route is not defined, then it will run on the `onError` callback. If it is defined, it will run the `onChange` callback, so you can bake in additional guards, analytics tracking, etc.

```
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

Every time you set or remove a parameter, it counts as an entry in the browsers history, and the back-forward navigaton. Therefore, when you need to update multiple parameters, you may want to change them in one shot instead of one at a time. Here's how you can do that:

```javascript
Router.set({
    'a':'1',
    'b':'2'
}); 
// URL becomes: http://localhost:3000/#/a=1/b=2
```

You can use Parrot just for the parameters and not for the callbacks. At that point, it becomes like `Session` except the key/value pairs are stored on the URL instead of just in memory. That way, you get all the benefits of Session, plus support for reloads, link sharing, and back-forward navigation.

When you change parameter values, the callback for the section will not run twice. For example, if you run a callback for the `#documentation` section, then change the parameters, the callback for the section will not run again. It only runs when a section is changed.

# How To Go Places

With Parrot, you can specify your routes just the way you want them to be.

```javascript
Router.go("documentation/section=Mongol/showMenu=true");
```

However, in other cases you may want to set the parameters dynamically. To do that, you just pass in each parameter and its value through an object: 

```javascript
Router.go('documentation', {
    section: function (cache) {
        if (cache) {
            return cache;
        } else {
            return "introduction";
        }
    },
    type: "Pro"
});
```

If you notice, we are passing in a value for `cache` into the section function. Parrot automatically caches parameter values under each section in case you would like to re-use them.

Parameter caching can be handy for "remembering" where the user was. For example, if a user opens a section of the documentation, then navigates back into the website, and then back into the documentation, you can drop them off exactly where they were before.

# Ready for Production

Parrot is light and stable - if it fits your needs then you should have no problems using it. Parrot is intended to be used for applications only. If you are building a content/SEO-driven website, you may prefer something like Flow-Router.

To get started, just run:

    meteor add msavin:parrot

In the future, Parrot may gain new features and/or become framework agnostic. For now, it provides everything one might need to set up an app. For more information, see FUTURE.md.

**Thanks to [Moshe Berman](http://github.com/mosheberman) for helping with the URL parser!**
