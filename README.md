## Data-Journalism-and-D3

### Summary 
Create interective scatter plots between data variables.
The data set included for this project is based on 2014 ACS 1-year estimates: [https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml](https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml), but you are free to investigate a different data set. The current data set incldes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

Using D3 techniques, a scatter plot was created that represents each state with circle elements. The code for the graphic was created in the `app.js` file. Data was pulled in from `data.csv` by using the `d3.csv` function. 

* Note: `python -m http.server` was used to run the visualization. This will host the page at `localhost:8000` in the web browser.

### Plots Outcome 

>![8-tooltip](8-tooltip.gif)
>![7-animated-scatter](7-animated-scatter.gif)
