<img src='https://raw.githubusercontent.com/msavin/Parrot/master/PARROT.png'>

Parrot is a router designed for Meteor. It gives you reactivity in all the right places while costing your visitors less than four kilobytes of bandwidth. For maximum pleasure, combine with `Template.dynamic`. For maximum information, see GUIDE.md.

```javascript
/*_____________________________________________________________________
|                      |                  |                            |
|  http://meteor.toys  /  #documentation  /  section=Mongol/type=free  |
|  Origin              |  Section         |  Key/Value Parameters      |
|______________________|__________________|___________________________*/

Router.register({
    'documentation': function (parameters) {
        console.log('Ran `documentation` route');
        console.log('Person is viewing: ' +  parameters.section); 
        console.log('Which is: ' +  parameters.type);
    },
    'buyMeteorToys': function () {
        Session.set("lol", "just a subtle hint");
    }
});

Router.go('documentation/section=Mongol/type=pro');
// URL     -> http://meteor.toys/#documentation/section=Mongol/type=pro
// Console -> Ran `documentation` route
//            Person is viewing: Mongol
//            The version is: pro
```

The code above will route the application from the default `http://localhost:3000/#home` to `http://localhost:3000/#settings/account/updatePassword` and run the appropriate callback. 

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

# Ready for Production

Parrot is light and stable - if it fits your needs then you should have no problems using it. 

Parrot is intended to be used for applications only. If you are building a content/SEO-driven website, you may prefer something like Flow-Router.

To get started, just run:

    meteor add msavin:parrot

In the future, Parrot may integrate with Meteor's build system and/or become framework agnostic. For more information, see FUTURE.md.

**Thanks to Moshe Berman for helping with the URL parser!**
