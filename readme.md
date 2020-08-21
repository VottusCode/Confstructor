# Confstructor

### Validate your configuration with ease!

<br/>

## Who is Confstructor for, and what exactly does it do?

Imagine that you are a developer creating a brand new unique JS library.
No matter if it's a pretty Hello World, or something really advanced, you have put your effort in making this library.

Now you've realized that in order to make your library more efficient and user-friendly, you need to create a way for the user to configure
the library to his/her needs. Sure, no problem, easy right?

And so you have something like this:

```js
const coolPlugin = new CoolPlugin({
    color: "#fff",
    ananasOnPizza: true,
});
```

And under the hood, you have something like this:

```js
class CoolPlugin {
    options;

    constructor(coolOptions) {
        this.options = coolOptions;
    }

    doCoolStuff() {
        console.log(
            `Hello World, I ${
                this.options.ananasOnPizza === true ? "like" : "dislike"
            } ananas on pizza.`
        );
    }
}
```

You test it out and you find out that it works! You publish your work to GitHub, and you're waiting for the stars to arise. A new user of your library
decides to test your brand new library, but doesn't read the README or the documentation, and so he does:

```js
const coolPlugin = new CoolPlugin();
```

Oh no! He forgot to pass options, and so the famous `Cannot read property foo of undefined` shows up, and the unsatsified user is coming right
your GitHub repository's way to create a issue and possibly unstar.

### Okay, but what is your point? What is Confstructor useful for?

You can prevent these types of scenarios by using Confstructor, which will validate the options that the user has passed.u
Confstructor will warn the user that he needs to pass options to the constructor.

You just need to refactor your code like so:

```diff
+ import Confstructor from 'confstructor'

class CoolPlugin {
  options;

  constructor(coolOptions) {
+    const schema = {
+      color: {
+        required: true
+      },
+      annanasOnPizza: {
+        required: true,
+        default: true
+      }
+    }
+    try {
+       this.options = new Confstructor(schema, coolOptions).validate().return();
+    } catch(e) {
+       console.error(e.message)
+    }
-    this.options = coolOptions;
  }

  doCoolStuff() {
    console.log(`Hello World, I ${this.options.ananasOnPizza === true ? 'like' : 'dislike'} ananas on pizza.`)
  }
}
```

That's all! Confstructor will automatically warn the user that they're doing something wrong! Neat, right?

### Children

Let's say that you need more configuration about something, so the user is supposed to pass an object

```js
const coolPlugin = new CoolPlugin({
    color: "#fff",
    annanasOnPizza: true,
    thatSomething: {
        importantInfo: "Ananas is healthy, they said",
        moreImportant: "Wear masks - 2020",
    },
});
```

How do I validate this? Easy, use the children property:

```diff
import Confstructor from "confstructor";

class CoolPlugin {
    options;

    constructor(coolOptions) {
        const schema = {
            color: {
                required: true,
            },
            annanasOnPizza: {
                required: true,
                default: true,
            },
+            thatSomething: {
+                required: true,
+                children: {
+                    importantInfo: {
+                        required: true,
+                        default: "Very important information."
+                    },
+                    moreImportant: {
+                        required: true,
+                        default: "Duh."
+                    }
+                }
+            },
        };
        try {
            this.options = new Confstructor(schema, coolOptions)
                .validate()
                .return();
        } catch (e) {
            console.error(e.message);
        }
        this.options = coolOptions;
    }

    doCoolStuff() {
        console.log(
            `Hello World, I ${
                this.options.ananasOnPizza === true ? "like" : "dislike"
            } ananas on pizza.`
        );
    }
}
```

## License

Confstructor is licensed under MIT, meaning you can use it however you like,
however it doesn't come without warranty whatsoever.

## More annoying stuff

With that said, if you find a issue, feel free to report it!
If you want to contribute, don't be shy and feel free to PR.

## That guy who made this

2020 Ⓒ Filip Vottus
