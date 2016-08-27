# DRAFT

# The Background

Meteor's reactive variables are a great way to control the application state, to the point where I've developed a preference for using them instead of a router. However, I've noticed two problems with them: 1) they are "hidden" in the application, which makes it hard for leveraging URLs 2) URL and browser navigation is a key part of the web experience, and they're essential to a good user experience.

I figured what was needed was a simple router that just lets me run a callback on certain URLs, but oddly I couldn't find it. Everything felt complex, and being the lazy person that I am, I figured it'd be easier to build my own router than figure out someone elses. The result is a router that I believe fits great with the rest of Meteor's simple APIs.

# Easy Configuration

To get started, just copy and paste this block and customize to your needs: 

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
```

When your application loads, Parrot will check if there is a hash set on the URL. If not, you can specify the default one by passing a string or function into the `defaultRoute` key.

# Router.go and Parameter Caching

Setting the app location through a string can become inconvenient, especially if you have a lot of parameters. That's why there is a more elaborate way of navigating: 

```
Router.go('documentation', {
    section: 'introduction'
});

// => http://app.com/#documentation/section=introduction
```

One of the benefits of this approach is that you can define parameters through functions instead of strings. Building on top of that, Parrot allows you to pass in cached values if you'd prefer. 

```
Router.go('documentation', {
    section: function (cache) {
        if (cache) {
            return cache;
        } else {
            return "introduction";
        }
    }
});
```

The benefit of caching parameters is your interface can "remember" which section the person was in previously. For example, if you are reading the "Users" section of a frameworks documentation, and then navigate to a different page, and then back to documentation, you can take them back to the "Users" section instead of back to the introduction.

Every parameter is cached under the route name. For example, if you cache "section" for the "documentation" route, and then cache the value of "section" under "dashboard" route, they would return different values in their context.

# Use It Just For Parameters

If you do not wish to use the callback functionality, you can use Parrot to only set only set reactive parameters on the URL. This should make Parrot stackable with other routes.

```javascript
Router.set({
    'a':'1',
    'b':'2'
}); 
// URL becomes: http://localhost:3000/#/a=1/b=2

Router.get('a');     // returns "1"
```

It's sort of like having Session functionality on the URL, except the applicatoin state can be preserved with the URL and managed with browser navigation.


# For Meteor: Working with Tracker

Even though Parrot is not a reactive router, the parameters are. You can use them with Tracker just like you would any other reactive data source in Meteor.

```javascript

FancyFunction = function (value) {
    console.log(value);
}

Tracker.autorun(function () {
    value = Router.get('reveal');
    
    if (value) {
        FancyFunction(value);
    }
});
```