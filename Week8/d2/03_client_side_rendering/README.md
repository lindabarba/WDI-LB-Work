## Client Side Rendering With Underscore.js Templating

![underscore](https://cdn-images-1.medium.com/max/624/1*6NkpTUi00kskQdCx-ZRvvA.png)

---

### What is Underscore?

- Underscore.js is a highly useful complement to JavaScript’s rather sparse standard library. In a pinch, Underscore gives you simple templating, too.
- Underscore gives you a large list of helper functions, similar to what ruby might have waiting for you out of the box
- We will be using underscore for this in the Node.js REPL, which has the advantage of Underscore.js being easy to install
  - `npm install underscore`
- Although Underscore.js is a fantastic library, we will only be using 1 component of it: templating

---

### What is templating?

- A web templating system is content from a database or api, and "presentation specifications" (in a web template), are combined through a template engine to mass-produce web documents.
- We have used engines such as `erb` in rails, and `ejs` for express

---

### Working with Underscore templates

- The template function has the following signature:
    `_.template(templateString, data?, settings?) `
- `templateString` holds the template. settings allow you to override the global settings. If you omit data, you compile a template that has to be applied to data as a function:

```javascript
var testTemplate = _.template("Hello <%= user %>!");  // compile
testTemplate({ user: "Jane" })  // inserting data
'Hello Jane!'
```

- First, you compile a template function `testTemplate`, then you use that function to produce a string. You can also specify the parameter data and directly insert it into the template, without an extra compilation step:

```javascript
> _.template("Hello <%= user %>!", { user: "Jane" })
'Hello Jane!'
```

---

### Inserting data

- Data in underscore templates can be inserted dynamically in three ways:

`<%= interpolate %>`

- Insert the result of an expression. The properties of the data object are all available as variables (see property user, above). No escaping happens, values are inserted verbatim.


`<%-escape%>`

- Insert the result of an expression, but escape the following characters via `_.escape()` => & < > " ' /
- Example:

```javascript
> _.template("Hello <%- user %>!", { user: "<Jane>" })
'Hello &lt;Jane&gt;!'
```

`<%evaluate%>`

- Evaluate the given code. This allows you to do loops and conditions (see next section).

---

### Loops and conditions

- The escape directive lets you insert arbitrary code. In the following template, we iterate over an array of names that is stored in property users:

```javascript
var templateTwo = _.template(
    "Users: <%_.forEach(users, function (u) { %>"
    + "<%= u %>, "
    + "<% }) %>"
);
```

`templateTwo` is used as follows.

```javascript
templateTwo({ users: [ "Huey", "Dewey", "Louie" ]})
// outputs => 'Users: Huey, Dewey, Louie, '
```

By referring to the index of the current element, you can avoid the trailing comma:

```javascript
var templateThree = _.template(
    "Users: <%_.forEach(users, function (u,i) { %>"
    + "<% if (i > 0) { %>, <% } %>"
    + "<%= u %>"
    + "<% }) %>"
);

templateThree({ users: [ "Huey", "Dewey", "Louie" ]})
// outputs => 'Users: Huey, Dewey, Louie'
```
---

### Printing content

- You can use the print function to imperatively insert content. For example, the previous example could be rewritten as follows:

```javascript
var templateThree = _.template(
    "Users: <%_.forEach(users, function (u,i) {%>"
    + "<%if (i>0) { print(', ') }%>"
    + "<%=u%>"
    + "<%})%>"
);
```

---

### Referring to the data object

- You can also refer to the properties of the data object via that object, instead of accessing them as variables. Example: The following two expressions are equivalent.

```javascript
_.template("Hello <%= user%>!", { user: "Jane" })
_.template("Hello <%= obj.user%>!", { user: "Jane" })
```

- Using obj makes it easier to check whether a property exists. Compare – the following two templates are equivalent.

```javascript
<% if (typeof title !== 'undefined') { %> Title: <%= title %> <% } %>
<% if (obj.title) { %> Title: <%= title %> <% } %>
```

- The variable holding the data object is obj by default, but can be configured. Below, we use the name data, instead.

```javascript
_.template("<% if (data.title) { %>Title: <%= title %> <% } %>", null, { variable: "data" });
```

- If you specify a variable name in this manner, the properties of data won’t be available as variables.
- That has the advantage that Underscore won’t have to use a with statement (see Sect. 3) and the template function will be faster.

---

## Potential Conflicts?

- Does anyone see how this could be a conflict with another templating language we use?
- The simple solution is to use doubles whenever rendering like so:
`<%% %>`, `<%%= %>`

---

### Putting it all together

- Here is what an example using underscore templating might look like

```javascript
var items = [
        {name:"Phillip"},
        {name:"Carl"},
        {name:"Rick"},
        {name:"Susie"},
        {name:"Sally"},
        {name:"John"},
        {name:"Susan"},
        {name:"Jack"}
    ];

var template = usageList.innerHTML;
target.innerHTML = _.template(template,{items:items});
```

```html
<script type="text/html" id='usageList'>
    <table>
      <thead>
         <tr>
            <th> Id </th> <th>Name</th>
         </tr>
      </thead>
      <tbody>
        <% _.each(items, function(item, key, list) { %>
             <% var f = item.name; %>
              <tr>
                  <td> <%= key %></td>
                   <td class="<%= f %>"><%= item.name %></td >
              </tr>
        <% });%>
    </tbody >
   </table>
</script>
<!-- Create your target -->
<div id="target"></div>
```

---

### Conclusion

- Underscore templates are very similar to `erb` or `ejs`
- They offer flexibility to write them how you want
- You must escape them when pairing with `ejs` like we showed above

---