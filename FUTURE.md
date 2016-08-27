# Future Plans

Parrot works fine but it doesn't mean it can't get better. Here are some thoughts as to what could be done:

 - Integrate with Meteor Build Tool: Parrot assembles the routes when the client loads, but I suppose we can skip that step by integrating with the build tool.

 - Implement support for strange encodings: I have yet to run into this issue, but I suppose someone might try to put in weird characters into the URL. 

 - Making Parrot Universal: Parrot could technically work with any data library. After getting some feedback on how its working for people, I will probably make a v2 that could be plugged into any app.

 - Persistent parameters: parameters that will stick to the URL even the Parrot is being told to navigate to a completely different URL. This is tricky though.

 - Allow code execution before and after a route is ran, as well as when a route is being navigated away from.

Do you like these ideas, and/or would you prefer something else? Let me know.
