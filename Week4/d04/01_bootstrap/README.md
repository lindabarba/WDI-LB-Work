## Welcome to Bootstrap
![uncle derry](http://i.somethingawful.com/cliff/ihateyou/page-119-02.jpg)

| Lesson Objectives |
| :--- |
| Use an HTML/CSS/JS Framework |
| Describe the grid system |
| Create a responsive website with Bootstrap |


#### Road Map
1. What is Bootstrap?
2. An example
3. Installing Bootstrap
4. Bootstraps Goodies
5. Fix Uncle Derry's Site - Practice

#### What is Bootstrap?

Bootstrap is a CSS/JS Framework. It makes styling a breeze!

Bootstrap easily and efficiently scales your websites and applications
from phones to tablets to desktops with a single code base.

With Bootstrap, you get extensive and beautiful documentation for
common HTML elements, dozens of custom HTML and CSS components, and
awesome jQuery plugins.

Bootstrap ships with vanilla CSS, but its source code utilizes the two
most popular CSS preprocessors, Less and Sass. You can quickly get
started with precompiled CSS or build on the source.

## Installing Bootstrap

To use bootstrap in a Rails project, I recommend the [bootstrap-sass](https://github.com/twbs/bootstrap-sass) gem. It has pretty straightforward instructions on how get it installed in your Rails project.

But for this lesson, we'll just be using a good ol' CDN.

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

```

You may need to include jQuery as well depending on which Bootstrap features you use.

```html
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
```

For this example, include all these in your head tag.


## Bootstrap Goodies

Bootstrap comes with quite a bit. Too much to cover in one lesson in
fact, but lets look at the most essential features of [Bootstrap](http://getbootstrap.com/).

#### Break into Pairs!

1. [Navbars](http://getbootstrap.com/components/#navbar)
2. [Buttons](http://getbootstrap.com/css/#buttons) and [Tables](http://getbootstrap.com/css/#tables)
3. [Grid System/Containers](http://getbootstrap.com/css/#grid)
4. [Modals](https://www.w3schools.com/bootstrap/bootstrap_modal.asp)
5. [Input Groups](http://getbootstrap.com/components/#input-groups) and [Jumbotron](http://getbootstrap.com/components/#jumbotron)

Each group should take about 15 minutes to research their topic, and be able to present it to the class with a small
amount of sample code to demonstrate what they've learned.

__Keep it very small!!__

## Fix Up Uncle Derry's Site

Take 20 minutes to use what you've learned in bootstrap to fix up
Uncle Derry's Site. Try and use __NO custom CSS__ when styling his
site! Make sure it looks something like this when you're done:

__navbar__:

![derry_nav](https://github.com/ga-students/WDI_SM_38/raw/master/work/05-week/09_bootstrap_and_more/page_design/derry_navbar.png)

<br>

__overall page__:

![derry_page](https://github.com/ga-students/WDI_SM_38/raw/master/work/05-week/09_bootstrap_and_more/page_design/derry_page.png)


## Conclusion

Uncle Derry is thrilled at your styling (or as thrilled as Uncle Derry
can be). Let's see what we've learned.

1. What is a CSS Framework?
2. How does Bootstrap help us optimize our websites for different screen sizes?
3. Why would a developer bother to use a CSS Framework's grid system?

## References

[Bootstrap Documentation](http://getbootstrap.com/)

Remember to look at other frameworks such as:

- Google's [Materialize](http://materializecss.com/)
- [Skeleton CSS](http://getskeleton.com/)
- Zurb [Foundation](http://foundation.zurb.com/)
