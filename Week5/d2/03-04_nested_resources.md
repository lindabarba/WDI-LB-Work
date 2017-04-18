<img src="https://i.imgur.com/4pK7Q5f.png" width="900">

# Nested Resources and Routing in Rails

### Lesson Objectives

| SWBAT: |
| :--- |
| Nest routes based on relationships between models |
| Write a migration to add a column to an existing table |
| Set default values for attributes using the DB and the Model |
| Define "shallow" routes for nested resources |
| Using `form_for` with nested resources |

## Nested Resources

A _nested resource_ is a result of two models having an association with each other.

The _nested resource_ is the child (`belongs_to`), or _many_ side of the relationship.  For example:

```
a Scientist has many Experiments, which has many Logs
```
Both `experiments` and `logs` are nested resources - **Why?**

### Set Up a New Rails app

Create a new rails app named _experiments\_app_.

Don't forget to specify the `-d` and `-T` options.  You've got this!

Now would be a great time to create our database too!

## Creating the Models

In our database, we'll have three models: `Scientist`, `Experiment`, & `Log`.

As already discussed, these models have the following `belongs_to`/`has_many` relationships between them:

```
Scientist |----< Experiment |----< Log
```

Now let's generate our models:

#### `Scientist`

We'll first give the `Scientist` model the following attributes:

| Attribute  | Data Type   |
| :---       | :---    |
| name       | String  |
| discipline | String  |
| mad     | Boolean |

`rails g model Scientist name discipline mad:boolean`

As this is the base of our relationships, the Scientist model is the **one** side of each relationship.  Accordingly, the schema will not require a foreign key.

This is why we are generating this model first because the other two models will require a foreign key and it's easier to generate a FK when we generate the models.

##### Default Values

Establishing default values for attributes means that the attribute will be set to a value if we don't provide one at the time we are creating the model instance.

First, let's see how we can use the database engine to assign default values.

Go ahead and open up that migration file. Since we've yet to `rails db:migrate`, we can still edit this file. Add `, default: true` to the end of the `mad` column, so it looks like this:

```ruby
# migration for ...create_scientists.rb
      # other code...
      t.boolean :mad, default: true
```

Now every new Scientist will have a default value of `true` for the `mad` attribute unless otherwise stated.

#### `Experiment`

Experiments `belongs_to` the `Scientist` model , so we'll need a 
reference to our previous model in our migration.

| Attribute    | Data Type   |
| :----------- | :------ |
| summary      | Text    |
| budget       | Integer |
| scientist_id | Integer |

`rails g model Experiment summary:text budget:integer scientist:references`

The `scientist:references` will result in a foreign-key column named `scientist_id`.  

The FK is how the database and ActiveRecord are able to keep track of which `Scientist` an `Experiment` belongs to.

Let's generate another migration before we migrate the one we just did.

#### `Log`

Logs `belongs_to` `Experiment`.

| Key           | Data Type   |
| :------------ | :------ |
| subject_name  | String  |
| comment       | Text    |
| deceased      | Boolean |
| experiment_id | Integer |


Okay, we're going to purposely make a little mistake on this next command:

`rails g model Log subject_name comment:text deceased:boolean`

Now let's `rails db:migrate`.

![](http://www.northalsted.com/wp-content/uploads/2015/10/ItsAlive.jpg)

##### Oh no! We forgot to the `references` foreign-key link for Logs to Experiments!!

Have no fear! This will happen and adding columns to an existing table is a common use case for migrations.

However, with all things rails, there's a convention:

``` bash
# DO NOT TYPE THIS IN!
$ rails g migration AddColumnNameToModel column_name:type
```

Whenever you're adding columns to a table (attributes to a model), you need to specify what you're doing in your migration name. This will help rails locate what you're changing.

```bash
# USE THIS ONE:
$ rails g migration AddExperimentRefToLogs experiment:references
```

Check out the migration to make sure it looks right, then

```
rails db:migrate
```

#### Rolling back migrations

Perhaps you've generated a model and the migration would not run due to a typo, etc.  We would be able to edit the migration file because it was in the "down" state and re-run the migration.

However, let's say your migration ran, but you noticed that you made a mistake.  For example, perhaps you meant to make an attribute a `float` instead of an `integer`.

Remember, we can only edit a migration file if it has not been ran successfully!

**Who remembers how to check the status of our migrations?**

Again, we can only modify previous migration files if their status is **down**!

Luckily, we can turn a migration's status from **up** to **down** with this command:

`rails db:rollback`
ApplicationRecord
The above command will rollback one migration at a time - always the most recent migration whose status is **up**.

You may need to rollback a few times to get to the migration file you'd like to modify.

You can then edit the migration you want and `rails db:migrate` again!

### Establish Model Relationships

Now that we've generated our models, we can now add our relationships to our models:

```ruby
# scientist.rb
class Scientist < ApplicationRecord
  after_initialize :set_defaults

  has_many :experiments, dependent: :destroy

  private

  def set_defaults
    self.discipline = "General Science" if self.discipline.nil?
  end
end
```

Okay, there's a bit going on here.  Let's review...

First, understand that `has_many`, `belongs_to`, etc. associations inform ActiveRecord how to generate proper SQL. They do not modify the database in any way.

We've also added `dependent: :destroy`, meaning to remove all child (dependent) model instances if the parent resource is removed. This prevents what is known as "orphaned" records.

We are using the `after_initialize` method in ActiveRecord to implement default values in our model vs. how we did it with the database engine when we modified the migration for the _Scientist_ model when we set _mad_ to default to true.

Similar to how the `before_action` method is used to call methods in controllers, `after_initialize` allows us to specify a method to run immediately after the model has been initialized when being created.

Now let's inform ActiveRecord of the associations for the other two models, first the `Experiment` model:

```ruby
# experiment.rb
class Experiment < ApplicationRecord
  belongs_to :scientist
  has_many :logs, dependent: :destroy
end
```
Notice how Rails had already written the `belongs_to` relationship for us. This was because we used `scientist:references` when we generated the `Experiment` model.

We purposely forgot to use `scientist:references` when we generated the `Log` model, so we'll have to set the `belongs_to` ourselves:

```ruby
# log.rb
class Log < ApplicationRecord
  belongs_to :experiment
end
```

We now have our relationships set up in our database - every scientist has a list of experiments, which each have a list of logs.

### Let there be data!

It's time to create some data!

Use `new` + `save` and/or `create` to build out some seed data in `seeds.rb`!

>Note: If things ever go really bad, you can always use `rails db:drop` (…then `rails db:create`, `rails db:migrate`) to delete and re-create the database.

Take the next 15-20 minutes to build the following:

- 1 scientist with 1 experiment that has 1 log

- Another scientist with 2 experiments, one with 2 logs, the other with no logs

If you forgot the attributes for a model, **where do we look?**

Don't forget to use `shift-cmd-D` to duplicate lines of code! Combine with `cmd-L` to select multiple lines will make short order of duplicating sections.

### Nested Resource Routing

When we talk about _resources_, it ultimately leads to talking about REST:

**What URI path would we post to create a new `Scientist`?**

The path is simple because the `Scientist` model does not depend on any other model.

Now let's think about what happens when we want to create a new `Experiment`...

**If we do a `POST` to `/experiments`, what info would be missing that we would need in the `experiments#create` action?**

The REST methodology has a solution for us...

Here's the path we'd `POST` to if we wanted to create an `Experiment` for the `Scientist` with an _id_ of 3: `/scientists/3/experiments`

The above URI would also work well as the `index` route for _experiments_ - it makes sense that we would want to list all experiments for a given scientist.  If for some reason your app called for listing **all** experiments in the database regardless of scientist, then a custom action such as `all` could be used with a route such as `get 'experiments', to: 'experiments#all'`.

>Note: Let's not forget that real-world applications may have needs beyond the default patterns at times.

### Using the `resources` method in `routes.rb`

Okay, you got a glimpse of how the `resources` method can be used to generate all **_how many_** routes for a resource?

Here's what we would type for the `scientists` resource:

``` ruby
# routes.rb

  resources :scientists
```

`$ rails routes` and count 'em.

Luckily, it can be used to create the routes for nested resources as well.

In `routes.rb`:

```ruby
# routes.rb

  resources :scientists do
    resources :experiments
  end
```

Notice that we put a nested resource within a Ruby code block (`do ... end`).

Let's `rails routes` again.

Holy Human Experiments that's a lot of routes!

However, closer inspection reveals a certain amount of unnecessary routes.  Take this route for example:

`PATCH  /scientists/:scientist_id/experiments/:id      experiments#update`

**Do you see anything else that's "unnecessary"?**

>Note: Pay attention to how how Rails names the **named parameters** in nested routes. For example, in `POST   /scientists/:scientist_id/experiments`, in the controller code you would need to use `params[:scientist_id]` to access the id of the scientist.
>
>_When in doubt... rails your routes!_

Let's say we want to update an experiment with an id of 13, wouldn't the URI path of `/experiments/13` be sufficient?

"Shorter" paths work well for nested resources, except for the actions where we need to know the id of the parent resource. **Discuss with your pair which actions would these be?**.

To implement these "shorter" routes, we could define our routes like this:

```ruby
# routes.rb

  resources :scientists do
    resources :experiments, only: [:index, :new, :create]
  end
  resources :experiments, only: [:show, :edit, :update, :destroy]
```

Rails knows that using shorter paths is a good thing and thus has a way of generating the same routes as above more easily:

```ruby
# routes.rb

  resources :scientists do
    resources :experiments, shallow: true
  end
```

`rails routes` Not bad - thanks `shallow` option!

#### But I don't need all of these routes!

Chances are, you won't actually need all of those routes.

For example, would be we commonly need the `index` action for a nested resource?  For example, **in what action/view would we typically want to list all of the experiments for a given scientist?**

Another example, instead of using a dedicated `experiments/new.html.erb`, maybe you would like the form for creating a new experiment to be on _show_ view for a scientist.  Makes sense - no?

However, the choice of removing unnecessary routes with `only` and/or `except` is up to you.  Keeping them around doesn't break your app!

### Handling Resources Nested More Than One Level Deep

Let's not forget about the `logs` resource which is nested two levels within `scientists`.

Well, as we saw with `experiments`, we only need to know the immediate parent's `id` for the `create` and maybe `index` & `new` actions (if you want them).

There is absolutely no need to concern ourselves with the `scientists` resource when dealing with `logs` - just its immediate parent, `experiments`.

Let's see what happens with this code:

```ruby
# routes.rb

  resources :scientists do
    resources :experiments, shallow: true do
    	resources :logs
    end
  end
```

`rails routes` and we'll find that Rails has done it again!  Note that we didn't need to specify `shallow: true` on the `logs` resource thanks to it already being on `experiments`.

### Using `form_for` with Nested Resources

We've already seen how to use `form_for` to generate forms in our views for a resource like this:

```html
<%= form_for @scientist do |f| %>
    <div>
        <%= f.label :name, "Name of the scientist:" %>
        <%= f.text_field :name %>
    </div>
    # other fields here
    <%= f.submit "Save New Scientist!" %>
<% end %>
```

>Note how we can "override" the text rendered in a label.

The above `form_for` would result in the following _action_ attribute (the path) in the form element:  `<form action="/scientists" method="POST"...>`.

Now turning to a nested resource such as `experiments`.  If we simply provide a new'd up `Experiment` model like we did for the `Scientist` model above, we would end up with a path of `/experiments` in the form, but checking our routes, this is not what we need.

We need something like `<form action="/scientists/13/experiments"...>`

So, we need a way to tell the `form_for` to write out the correct HTML form for a nested resource.

Here's how we can use `form_for` to generate the correct HTML to create a new `Experiment`:

```html
<%= form_for [@scientist, @experiment] do |f| %>
    <div>
        <%= f.label :name %>
        <%= f.text_field :name %>
    </div>
    <div>
        <%= f.label :summary, "Summary Description:" %>
        <%= f.text_area :summary %>
    </div>
    # other fields here
    <%= f.submit "Save New Experiment" %>
<% end %>
```

By providing both `@scientist` (an existing model instance) and `@experiment` (a new empty instance) in an array, `form_for` will know to generate the form for an experiment that belongs to `@scientist`.

Whichever _controller#action_ was related to the view where the form is displayed - it would be responsible for creating both the `@scientist` and `@experiment` instance variables!

The form would correctly look like something like this:

`<form action="/scientists/13/experiments" method="POST"...>`

#### Practice Exercise

To see this in action let's code the `scientists#show` action that, in addition to displaying a particular scientist, includes a `form` under the scientist's details to create an experiment for that scientist.

The routes are done, best start by creating a controller...

Don't worry about styling (yes, "jagged" forms are okay for this exercise).

I'll check in with you in 15-20 minutes...

### Accessing and Displaying Nested Models

As you've seen, ActiveRecord creates methods we can use to access the related models on a parent.

```ruby
@scientist.experiments  # returns an array of the scientist's experiments
```

**How could we access all of the `logs` for the first experiment for `@scientist`?**

Cool.

For reference, here's how we might code the `experiments#show` action and view...

#### First the controller:

```ruby
# experiments_controller.rb

class ExperimentsController < ApplicationController
    
    def show
    	@experiment = Experiment.find(params[:id])
    	@log = Log.new
    end
    
end
```

#### Now the view:

```html
# experiments/show.html.erb

<h1 class="jumbotron">Experiment Detail</h1>

<%= link_to "Return to All Experiments", scientist_path(@experiment.scientist) %>

<hr>

<div class="panel panel-default">
    <div class="panel-heading">
        <h4>Experiment Last updated: <%= @experiment.updated_at %></h4>
        <h5>Budget: <%= @experiment.budget %></h5>
    </div>
    <div class="panel-body">
        <p><%= @experiment.summary %></p>
    </div>
    <div class="panel-footer">
        <h4>Logs</h4>
        <% if @experiment.logs.count > 0 %>
            <% @experiment.logs.each do |log| %>
                <div class="panel panel-default">
                    <div class="panel-body">
                        <h5><%= log.subject_name %></h5>
                        <p><%= log.comment %></p>
                    </div>
                </div>
            <% end %>
        <% else %>
            <p>No Logs Yet</p>
        <% end %>
    </div>
</div>
<hr>

<%= form_for [@experiment, @log] do |f| %>
    <div class="form-group">
        <%= f.label :subject_name, "Subject:" %>
        <%= f.text_field :subject_name, class: "form-control" %>
    </div>
    # other fields
    <%= f.submit "Add Log", class: "btn btn-success" %>
<% end %>
```

**Take a few minutes to read the code above and note any questions/comments you may have. We'll review in 5 minutes.**

### It's Your App! (Flexibility)

We've witnessed many conventions of Rails.  However, Rails conventions do not restrict what we can do in our apps.

For example, take a look at how we stubbed up a new `Log` for the `form_for` in the _experiments#show_ action.  Perhaps you didn't realize that you could create a new model instance of _any_ model within a controller for a different model. Absolutely you can. It's just code. It's your app!

Maybe in this science app we would like a view that displays all _logs_ with a certain _subject\_name_ for an experiment...

One way for us to implement this would be to use a form, not for a model, but for entering a filter value in an input like this:

```html
<%= form_tag scientist_path(@scientist), method: :get do %>
  <div>
  	Show Experiments with this <%= text_field_tag :filter %> subject only
  </div>
  <%= submit_tag 'Filter', name: nil %>
<% end %>
```

We're using a `form_tag` vs. `form_for` to generate a generic form not tied to a model.

With `form_tag` we need to specify the path for the _action_ attribute in the `<form>` element.

Also note how we are specifying that the form should issue a `GET` instead of a `POST`.

Then something like this in the controller:

```ruby
class ExperimentsController < ApplicationController

  def show
    @experiment = Experiment.find(params[:id])
    if params[:filter].present?
    	@logs = @experiment.logs.where("lower(subject_name) = ?", params[:filter].downcase)
    else
    	@logs = @experiment.logs
    end
    @log = Log.new
  end

end
```

There's some good stuff in there.

We're using the `.where` method to select only the logs with a certain `subject_name` and store them in a separate `@logs` instance variable for use in the view.

We've made the filtering case insensitive by using the version of `where` that allows us to specify a SQL _where clause_ and provide a value for the `?` placeholder.

Note that since we're now creating a separate `@logs` variable, we would need to refactor the view to use `@logs.each` instead of the `@experiment.logs.each` we used earlier.

## Practice Lab

For practice:

- Create an _index_ view for scientists.
- Clicking on a scientist would render a _show_ view for that scientist.
- In the _show_ view for a scientist, list all of that scientist's experiments.  If there are no experiments for a scientist, display a message "This Scientist Currently Has No Experiments".
- Also in the _show_ view for a scientist, show a button to click to add a new experiment which would render the _new_ view for an experiment.
- After the user submits a new experiment, return to the scientist's _show_ view where the newly added experiment will be displayed along with the others.
- Provide a way to view a _show_ view for an experiment displayed on the scientist's _show_ view.
- On the _show_ view for an experiment, provide links for editing and deleting that experiment.
- Implement editing of an experiment.
- Implement deleting an experiment.

#### Bonus

- Implement CRUD for logs.

