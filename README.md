<img src='https://raw.githubusercontent.com/msavin/Parrot/master/PARROT.png'>

**Parrot is an easy to use router designed for Meteor.** It gives you reactivity in all the right places while costing your visitors less than four kilobytes of bandwidth. 

**An easy way to undestand Parrot is to think of it in two ways.** First, as if every URL change is basically a function call. Second, it's like having Session/Reactive-Dict on the URL instead of in memory. 

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

The code above will route the application from the default `http://localhost:3000/#home` to `http://localhost:3000/#documentation/section=Mongol/type=pro` and run the appropriate callback. 

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

Once you have that set, you can use `Router.register()` anywhere you'd like to configure the routes. 

```
# Reactive Key/Value Parameters

Whatever key/value pair you set through on URL will be set as a reactive value in the application, and whatever reactive value you set in the application will be displayed in the URL. It's like a parrot - hah!

```javascript
// Sets key/value pair on URL
// Turns this: http://meteor.toys/#documentation/section=Mongol
//       into: http://meteor.toys/#documentation/section=Mongol/showMenu=true
Router.set("showMenu", "true");

// Removes key/value pair from URL
// Turns this: http://meteor.toys/#documentation/section=Mongol/showMenu=true
//       into: http://meteor.toys/#documentation/section=Mongol
Router.delete("showMenu");

// This is a reactive data source powered by ReactiveDict
// the router itself is not reactive; this is only set on URL change
Router.get("showMenu");
```

With this approach, it's really easy to control small parts of your application while embracing the full capabilities of browser navigation. Generally speaking, a URL can contain 2000 characters, so you can keep a lot of data there.

Every time you update the parameters, it counts as a record in the browser history and navigation. Therefore, you might want to update multiple parameters at once, and you can:

```javascript
Router.set({
    'a':'1',
    'b':'2'
}); 
// URL becomes: http://localhost:3000/#/a=1/b=2
```

Finally, you can use Parrot just for the parameters and not for the callbacks. At that point, it becomes like `Session` except the data is stored on the URL instead of just in memory.

# How To Go Places

With Parrot, you can specify your routes just the way you want them to be.

	Router.go("documentation/section=Mongol/showMenu=true");

However, in other cases you may want to set the parameters dynamically. Additionally, you may want to cache the parameters. Here's how that would look: 

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

Parameter caching can be handy for "remembering" where the user was. For example, if a user opens a section of the documentation, then navigates back into the website, and then back into the documentation, they would be exactly where they left off.

# Ready for Production

Parrot is light and stable - if it fits your needs then you should have no problems using it. Parrot is intended to be used for applications only. If you are building a content/SEO-driven website, you may prefer something like Flow-Router.

To get started, just run:

    meteor add msavin:parrot

In the future, Parrot may integrate with Meteor's build system and/or become framework agnostic. For more information, see FUTURE.md.

**Thanks to Moshe Berman for helping with the URL parser! 
[(GitHub)](http://github.com/mosheberman) [(Twitter)](http://twitter.com/bermaniastudios)**
