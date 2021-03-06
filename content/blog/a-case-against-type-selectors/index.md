---
title: A Case Against Type Selectors
date: "2019-04-15T22:12:03.284Z"
---
I’ve been contemplating the use of type selectors in CSS recently. Below are largely opinions and I welcome comments or corrections on the topic.

So let's dig into the issue at hand, type selectors in CSS. 

A common use case for type selectors is for enforcing site-wide styles. This allows you to keep things on brand by setting properties such as color, font-size, and spacing.

Let's take an example. You create some styles for our site.
```css

h1, h2, p {
	color: '#33475b';
}
h1 {
	font-size: 3.2rem;
	font-weight: bold;
	padding: 0.5rem
}

h2 {
	font-size: 2.5rem;
}

p { 
	font-size: 1.2 rem;
}
```

So now we have some base styles for our elements. We want to build out some pages. Let's start with a news section. This will have some images and text.

```html
<section class="news">
	<article>
		<h2>We're launching our new site</h2>
		<p>Check it out for lots of new content</p>
		<img sr="myimage" alt="image" />
	</article>
</section>
```

I want to give my `news` section some styles. I know I will have different types of `section` elements so I give this a class. Time to styles my elements:
```scss
.news {
	// p tag, have some breathing space
	p {
		padding: 0.5;
	}
	// I want my images to stand out from my text so lets give it some padding
	img { 
		padding 1rem;
	}

}
```

Great stuff. Now my page is ready for some new content. 

After adding some content I decide that some of my articles need avatars. I want to have a series of them appear in a row.
```html
<section class="news">
	<article>
		<h2>We're launching our new site</h2>
		<p>Check it out for lots of new content</p>
		<img sr="myimage" alt="image" />
	</article>
	<article>
			<h2>I'm a different article</h2>
      <p>but I need some avatars</p>
		<div class="news__row">
			<img sr="myimage" alt="image" />
			<img sr="myimage" alt="image" />	
		</div>
	</article>
</section>
```

```scss
	.news {
		&__row {
			display: flex;

			img {
				border-radius: 50%;
				width: 2rem;
			}
		}
	}	
```

I load up my webpage. Here is where the problems start. My images have inherited this extra padding. This padding made sense for my initial design of one image per news update.  It has broken my avatar design where I don’t want this spacing.

I could, of course, fix this by overriding the styles, increasing the specificity:
```scss
	.news {
		&__row {
			...
			img {
				...
				padding: 0;
			}
		}
	}	
```
This is not ideal as each time I add a different child element that has an image I woul need to override this padding. This illustrates the first issue of type selector styling.

## Breaking future designs
For each new case where I need different `img` styles in my news section, I am required to override the padding. The default I have imposed on this section only works for my initial use case. My initial use case was not a good candidate for element type styling. It was too specific and was more suited to class selectors. 

By using classes I can ensure that I am being intentional when styling my elements. Aside from my site-wide typography styles, my elements will only be styled by the classes I assign to them.

Take note of the `.news__avatar` selector.
```scss
	.news {
		&__row {
			display: flex;
		}

		&__avatar { // no padding to override
			border-radius: 50%;
			width: 2rem;
		}

		&__feature-image {
			padding 1rem;
		}
	}	
```

```html
<section class="news">
	<article>
		<h2>We're launching our new site</h2>
		<p>Check it out for lots of new content</p>
		<img class="news__feature-image" sr="myimage" alt="image" />
	</article>
	<article>
		<h2>We're launching our new site</h2>
		<p>Check it out for lots of new content</p>
		<div class="news__row">
			<img class="news__avatar" src="myimage" alt="image" />
			<img class="news__avatar" src="myimage" alt="image" />	
		</div>
	</article>
</section>
```

By moving to use classes and BEM notation:
- I’m being more intentional in the styles that I apply to the elements
- When reading my markup I can see where my elements are getting styles from
- I can now search my code base for `__avatar`. I’m helping some other poor developer who has to deal with my code

Another advantage is that my elements are styled like components. As they follow a BEM notation, moving these to reusable components is an easier task:
```jsx
	const NewsItem = ({ heading, text, imageUrl }) => (<article>
		<h2>{heading}</h2>
		<p>{text}</p>
		<img class="news__feature-image" sr={imageUrl} alt="image" />
	</article>);
```
My feature image no longer relies on being within `.news` and being an `img` tag.

This leads to another disadvantage of type selector styling:

## Reliance on element types
By tying styles to an element type I am introducing the need to change CSS if I need to add these styles to another element. Using my old element styling the following markup will require a change in CSS

If I target `img` my `svg` will not pick up the correct styles.
```html
 <article>
		<h2>We're launchin our new site</h2>
		<p>Check it out for lots of new content</p>
		<svg ..... ></svg>
	</article>
```


By associating my styles with a class selector I can apply this to different element types.
```html
<article>
		<h2>We're launchin our new site</h2>
		<p>Check it out for lots of new content</p>
		<svg class="news__feature-image" .... ></svg>
</article>
```

Let's take another use case. I have a  `span` I use in my web app. It's a simple back button that triggers some javascript. I style this by using a type selector:
```html
<section class="news">
	<span>Back</span>
</section>
```
```css
.news {
	span {
		color: '#0091ae';
		text-decoration: underline;
	}
}
```

Later to let SEO crawlers know what this span does I change this to be anchor tag.
```html
<section class="news">
	<a href="mysite.com/homapege">Back</a>
</section>
```

Again here I have broken my styles and need to change my CSS

## Difficult in debugging
Consider the following code:
```
section {
	article {
		div {
			margin-top: 1rem;
			color: '#f2545b';
			img {
				border-radius: 3px;
			}
		}
	}
}
```

There are a number of issues with this. Due to the nested structure altering my DOM will break my design. Having these nested elements create a tight coupling between my styles and my DOM structure. A change in one will likely require a change in the other.

Overuse of this pattern leads to difficulty in debugging. Looking at markup without classes makes finding the applicable CSS difficult. It also requires a developer deal with specificity issues. In the future, if I refactor this CSS to be part of a reusable component, there can be an unintended consequence for child element in the DOM  tree that match these elements.

Of course, the above example is somewhat contrived. Even type selectors nested a single level deep can have an unintended consequence for future markup.

## In summary, avoid overuse of type selectors:
- Styles are bound to specific element types
- It can lead to breaking semantic markup in order to achieve a specific design e.g. `<h3> <h2>` in the wrong order
- Changing the DOM structure can break a design
- Refactoring is needed when new element types are added
- Debugging can be more difficult


## So what’s the solution
- Lean into class names. Be intentional with your styling. There are many tools that can help you avoid names clashes in CSS such as CSS Modules, BEM, styled-components etc, 
- Use type selectors for their intended purpose, for applying styles globally to keep a consistent look and feel.
- HTML tags are for used to semantically structure your page. A `h1` should indicate the purpose of your page.  A `p` should contain some long-form text. You should apply the styles using classes.
- Create classes to reuse styles. Have a `.h1` , `.h2`, `big-image`. 

## Are there cons?
Of course, as with anything, there are potential drawbacks. 
- Using BEM notation you may find yourself using a number of long class names: `.news__article--main`, .`news__cta--primary`
- You are now required to add a class to your new elements `<img class=“featured-image />`

With that being said I think the improved readability, ease of debugging and more robust nature of class selectors outweigh these drawbacks.

You may argue that having to add a class to all your elements is a drawback. In my experience when there are multiple elements with the same class, this is often done programmatically or via a CMS. If you have a list of elements that you need to continually add to manually, that is a separate issue that likely should be automated in some way.

## An Afterword
I believe much of the above also applies to the overuse if `*` `>` `+` selectors. Of course, these have their place, but should not be relied upon when a simple class would do the job. Using a variety of selectors in your code makes developers reading your code have to constantly compute what these selectors are doing. Often the best solution is the simplest one. 

