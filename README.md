# Web Animation

A collection of tutorials and code examples related to web animation.

## Resources

- [CSS-TRICKS: How SVG Line Animation Works](https://css-tricks.com/svg-line-animation-works/)
- [xahlee.info: SVG tutorial](http://xahlee.info/js/svg_basic_examples.html)

## Gotchas

### Timeline Animation with Pseudo Elements

Most timeline animation tools including GSAP and React-Spring require to have direct access to the dom element. (either by selectors or ref).

Therefore, if you want to animate those multiple layers of backgrounds, you need to create some empty `<div class="bg-overlay__1"></div>` instead of using Pseudo-elements(which is usually something you want to avoid other than this purpose). This is because pseudo elements created with CSS technically don't exist in the DOM to get hold of.
