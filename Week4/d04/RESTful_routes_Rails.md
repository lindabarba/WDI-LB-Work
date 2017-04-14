HTTP Verb | Path/URI | Rails controller#method | Default View | Purpose  
--------- | -------- | ----------------------- | ---------- | ------ |
GET | /posts | posts#index | index.html.erb | List all posts |
GET | /posts/:id | posts#show | show.html.erb | Show a single post |
GET | /posts/new | posts#new | new.html.erb | Provide form for submitting new post to the create action |
POST | /posts | posts#create | *no default* | Create a new post then redirect to ? |
GET | /posts/:id/edit | posts#edit | edit.html.erb | Provide form for editing a post and sending to the update action |
PUT | /posts/:id | posts#update | *no default* | Update a post then redirect to ? |
PATCH | posts/:id | posts#update | *no default* | Update a post then redirect to ? (*same as PUT*) |
DELETE | posts/:id | posts#destroy | *no default* | Delete a post, then redirect to ? |

