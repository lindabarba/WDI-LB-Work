1. Terminal command: ```rails new <name_of_app> -d postgresql -T```
2. Get in the new app directory cd <name_of_app>
3. Github repo steps here: http://railsapps.github.io/rails-git.html
4. Open files in Sublime if you want ```subl .```
5. Create Rails database: ```rails db:create```
6. Start Rails server: ```rails s```
7. Check & see if it is up via browser: ```localhost:3000```
8. Create new model & generate some data for first model ```rails g model <Model_Name> <attribute1> <attribute2:><data_type> <attribute3:><data_type>```etc - you don't need to specify data type; default data type is string and Model names are always singular
9. Migrate that data to update your schema: ```rails db:migrate```
10. Set up your routes (/<app_name>/config/routes.rb) - index, show, new, create, edit, update, destroy
sample code:
```Rails.application.routes.draw do
	get 'beans', to: 'beans#index'
end
```
11. Check with ```rails routes```
12. Create a controller: ```rails g controller <plural_name_of_model_name_try_to_make_single_otherwise_snake_case>```
13. Edit the seed file if you want to seed data (<app_name>/db/seeds.rb)
14. Seed the data (initialize the database): ```rails db.seed```
sample code 
```Bean.destroy_all

	beans = Bean.create([
    		{name: "Jim's Jittery Java", roast: "Medium", origin: "The OC Baby", quantity: 50.25},
    		{name: "Jon's FDA-Banned Brew", roast: "Strong", origin: "The Home of Magic Mountain", quantity: 101}
])```
15. Create your actions in the controller (<app_name>/app/controllers/<model_name>_controller.rb) - index, show, new, create, edit, update, destroy
sample code:
```class BeansController < ApplicationController
	def index
     @beans = Bean.all
  end
end```
and (using params)
```def show
  @bean = Bean.find(params[:id])
end```
16. Create the views/templates in the views (app_name>/app/views/) - index.html.erb, show.html.erb, new.html.erb, edit.html.erb
sample code with ERB tags:
```<h1>Today's Beans</h1>
<ul>
    <% @beans.each do |bean| %>
        <li>
            <strong><%= bean.name %></strong> - <%= bean.roast %>
        </li>
    <% end %>
</ul>
```
Use ```form_for``` helper method on new & edit forms
17. Set up a root route:
Sample code:
```Rails.application.routes.draw do
  root to: "beans#index"
  get 'beans', to: 'beans#index'
end```
18. Add some links to this stuff using ```link_to``` helper & ERB tags:
Sample code:
```<h1>Today's Beans</h1>
<ul>
  <% @beans.each do |bean| %>
    <li>
      <strong> <%= link_to bean.name, bean_path(bean) %> </strong> - <%= bean.roast %>
    </li>
  <% end %>
</ul>```
19. Do this too