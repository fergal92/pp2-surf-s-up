# Car Maintenance Bible
Car maintenance bible is the go to guide for people wanting to know the basic tasks they can undertake to take care of their car and keep it in good running order. The site is easy to navigate and provides the essential information to the user. The site is targeted towards all car owners whether a first timer or a veteran of the road. 

The site offers a contact page to get in touch if the user's questions are not answered after visiting the site. 
The site landing page contains a link to a Top Gear article about the same car that is used for the hero image on the landing page. This article was used to apeal to car enthusiasts and keep them enjoying car related content rather than using a wikipedia article where their attention could get drawn in other directions. This was purposely chosen to ensure the website focused on car based content.

Visit the site [here](https://fergal92.github.io/pp1-car-maintenance/index.html)

![responsive multi screen image](readme-media/responsive-img.png)

## User stories

### As a user I can easily navigate the site
#### Acceptance Criteria:
- The website feautues an easy to use navigation bar
- The website features links within the site for different pages
#### Tasks:
- Build a nav bar with menu items that match the different site pages
- Build a responsive nav bar that works well at all screen sizes
- Include links within the site to redirect to other pages where practical

### As a user I can load a website that features cool car pictures
#### Acceptance Criteria:
- The website feautues a hero image of a cool car
- The website also features pictures of car related maintenance
#### Tasks:
- Feature a picture of a legendary car as the hero image
- Include pictures as part of the maintenance page

### As a user I can easily read the wesbsite writing
#### Acceptance Criteria:
- Selected fonts are web-safe and compatible across browsers/devices.
- Font choices prioritize readability for all users.
#### Tasks:
- Research font options
- Ensure compatibility and accessibility

### As a user I can contact the website owners
#### Acceptance Criteria:
- The website feautues a contact form
- The contact form allows the user to type a message 
#### Tasks:
- Build a contact page
- Build a form in the contact page with a section to allow a message to be typed

### As a user I can easily find the website's social media information
#### Acceptance Criteria:
- The footer will include social media icons
- The icons will be linked to the appropriate social nedia pages
#### Tasks:
- Build a footer
- Include social media icons that link to the appropriate pages and open in a new tab

### As a user of a laptop I can click on different parts of a car engine picture to bring up the corresponding section of maintenance 
#### Acceptance Criteria:
- The website feautues an image that is clickable 
- The clickale image redirects the user to a maintenencae task related to the car part they clicked on
#### Tasks:
- Include an image map with the hero image
- Make the map redirect to the relevant sections of the image and the maintenance page

## Agile Methodologies
### GitHub Projects
Link to the GitHub project page that was used to manage the website build. Items were added to the kanban board and worked through. Items were linked to the project repo and closed off as the project progressed. [github project board](https://github.com/users/fergal92/projects/1/views/2)

## Features
### Existing Features

#### Navigation Bar
- Featured on all three page, the fully responsive navigation bar includes a logo with link to the home page and three list items that link to the home page, maintenance page and the contact page.
- This section will allow users to navigate around the website without having to use the back button

Laptop navbar:

![nav-bar screenshot](readme-media/nav-bar.png)

Mobile navbar closed:

![mobile nav-bar screenshot closed](readme-media/mobile-navbar-closed.png)

Mobile navbar open:

![mobile nav-bar screenshot closed](readme-media/mobile-navbar-open.png)

#### Landing page image
- The landing page image is of an engine bay with an image map overlaid so that the user can click different parts of the photo to be brought to the corresponding section on the maintenance page, for example, clicking the headlights brings the user to the lights section, clicking the engine brings the user to the engine oil section. The photo map feature is only available when the screnn is 1024px and greater.
- The engine bay image is of a beautifully maintained Nissan Skyline R34 GT-R which is a legendary car among car enthusiasts.
![hero-img screenshot](readme-media/index-img.png)


#### The Footer
- The footer section includes links to relevant social media sites. The links open to a new tab to allow for easy navigation for the user.
- The footer sticks to the bottom of the page
![footer screenshot](readme-media/footer.png)


#### Maintenance Page
- Includes all maintenace content
- content includes picture per item and is centered and justified
- each mainteance task is connected to the hero image map on index page
![maintenance page screenshot](readme-media/maintenance-img.png)


#### Contact Page
- The contact page will allow the user to contact the website for more specific questions and to subscribe to hear more from the car maintenance bible
- The user will be asked to submit their full name and and email address and to tick a checkbox to subscribe and to write their message
![contact page screenshot](readme-media/contact-img.png)

#### Thank You Page
- The thank you page thanks users for filling in the contact form
- It features the header and footer and a link in the main section to bring users back to the main site 
![thank you page screenshot](readme-media/thank-you-img.png)

### Features left to implement 

- Further maintenance tasks 
- More image maps for all parts of the car

## Technologies Used
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - was used as the foundation of the site.
- [CSS](https://developer.mozilla.org/en-US/docs/Web/css) - was used to add the styles and layout of the site.
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) - was used to arrange items simmetrically on the pages.
- [Balsamiq](https://balsamiq.com/) - was used to make wireframes for the website.
- [VSCode](https://code.visualstudio.com/) - was used as the main tool to write and edit code.
- [Git](https://git-scm.com/) - was used for the version control of the website.
- [GitHub](https://github.com/) - was used to host the code of the website.
- [Microsoft Paint](https://www.microsoft.com/en-us/windows/paint) - was used to make and resize images for the README file.
- [Perplexity AI](https://www.perplexity.ai/) - was used to help develop design ideas such as colour scheme and font type
- [Am I Responsive](https://ui.dev/amiresponsive) - was used to generate an image of the website across different screen types and resolutions
- [GitHub Pages](https://pages.github.com/) - was used to host the website

## Design
### Colours
I asked perplexity AI to suggest a good colour for a car maintenance website. It had varying suggestions. I settled on blue , red, white and silver as my colours of choice and used https://coolors.co/ to help pick the shade
```
/* CSS HEX */
international-klein-blue: #052ab0ff;  
white: #ffffffff;  
silver: #c0c0c0ff;  
fire-engine-red: #d5002eff;  
```
## Typography
I used Raleway and Montserrat as the fonts for the project. They are Sans Serif fonts. Perplexity AI suggested the use of these fonts for a car maintenance themed website. They worked well upon trial so I kept them. The fonts were found and imported from Google Fonts.

Raleway:
![raleway font](readme-media/raleway-font.png)
Montserrat:
![raleway font](readme-media/montserrat-font.png)

### Wireframes
Wireframes were created using Blasamiq. First draft wireframes of the different pages as viewed on a laptop

Inex page: ![wireframe index page](readme-media/car-maintenance-bible-index.png)
Maintenance page: ![wireframe index page](readme-media/car-maintenance-bible-maintenance.png)
Contact page:![wireframe index page](readme-media/car-maintenance-bible-contact.png)

## Testing
Please refer to the [TESTING.md](TESTING.md) file for all testing documentation

## Deployment

### Deployment to GitHub pages
The site was deployed on gitHub pages on day 1 of the project undertaking. Steps taken are as follows:
- Inside the repo click the settings tab
- Click on pages menu item on the side bar
- Select the main branch and then click the link to go to the live site

The live link to the site can be found here https://fergal92.github.io/pp1-car-maintenance

### Local Deployment
In order to make a local copy of this project, you can clone it. In your IDE Terminal, type the following command to clone my repository:

`git clone https://fergal92.github.io/pp1-car-maintenance/`

## Credits

### Content
- Perplexity AI was used to generate each of the maintenance steps found on the maintenance page
- The fonts were taken from google fonts 
- The contact page was taken from a freecodecamp tutorial. I modified it to suit this project
### Media
The photos used for the website were taken from a google image search. The photos and the link to the site they were found are listed below.
- engine bay photo - https://www.meguiars.co.uk/showroom/detailing-bay-650bhp-full-stage-r34-gt-r/
- battery - https://www.goauto.ca/tools-resources/how-to-test-your-battery-voltage
- headlights - https://smartdriving.co.uk/Driving/Driving_emergencies/headlights.html
- engine oil check - https://www.gulfoilltd.com/blog/when-should-you-check-the-engine-oil-level
- coolant check - https://haynes.com/en-gb/tips-tutorials/how-check-and-change-your-car-s-coolant
- wiper blades - https://www.sunsetnorthcarwash.com/2020/12/14/it-might-be-time-to-change-your-windshield-wiper-blades/

The Favicons were taken for free from this website https://favicon.io/emoji-favicons/automobile

The icons in the footer were taken from font awesome - https://fontawesome.com/

## Future improvements
- add custom 404 page;
- add fully functional contact form.
- Add image maps for all screen sizes
- Add better commit messages from the start of the project

## Acknowledgements
- [Iuliia Konovalova](https://github.com/IuliiaKonovalova) - My mentor Julia was very supportive during this project. She certainly pushed me to complete a high standard of project especially for the readme and testing sections. I took inspiration from her README.md and TESTING.md files for my own.
- [Happiness Generator](https://github.com/broken-helix/happiness/) - My first hackathon project. I learned so much from participating in this project and team. We won the March hackathon for 2024 and my team members were a great source of inspiration for me.
- [freeCodeCamp](https://www.freecodecamp.org/) - I completed the freeCodeCamp responsive web design module before enrolling in code institute and I learned much from that module that I was able to utilise for this project.
