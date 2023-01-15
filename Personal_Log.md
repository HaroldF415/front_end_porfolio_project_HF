# Personal Log

## 01/15/2023

I've been keeping track of how I build my projects as a reminder of what I tried and how I fixed it. This file will keep track of the bugs that I remember so far from this project. These bugs where not found on the date that is written on the title of this section. I'm just re-writing them down and sort of doing a deep-dive on them so I can remember how I fixed and why that fix worked.

### Bug #1

A few weeks back a fellow from my cohort had an idea of creating 95% of the html elements on the `main.js` file and then render/append them to the DOM. This worked fine for that specific project we worked on but I believe when we introduce Bootstrap something breaks. While writing this bug I will try to recreate the bug and see if I can fix it.

```html
<!-- code inside the body -->
<div class="mainContainer">
  <!-- inside here would be other divs that I would have created in the js file -->
</div>
```
