# Drum Deals
Drum Deals is a web app for drummers to buy, sale, trade, and favorite other listings. It's a full stack build using React and .NET 5 frameworks and utilizes single rule principal and object oriented principals as needed on the client side. The idea comes from using sites like Ebay and Reverb and always having to set a filter to drum related listings. This app will serve the drum community and elimnate the need for those filters while attempting to buy or sell their gear. 

## Navigating Drum Deals
Upon login a user will be presented with the 5 most recent listings. Should a user want to browse they my navigate to the all listings view. From here they may either browse all listings or use the search bar to find a particular listing that matches what they are trying to find. The search bar will filter the listings in real time and be presented to the user with any matches. 

Should the user want to create a listing they may do so by clicking on the "add listing" button located on either the "All Listings" or "My Listings" views. When the user clicks on this button they will be navigated to a new page with a form to fill out all details for their listing.

Should the user want to update a previously created listing, they may do so by clicking on the "update" button. Upon clicking "update" the user will be navigated to a view of a form with the all the listings previous details and the user the edit/update any info and save it to the database. Should the user not want to make changes, they may click "cancel" to navigate back to the view of all listings. 

Should the user want to delete a listing they've created, the user can click on the "delete" button located on the listing. If the delete button is clicked, a user will be navigated to a page to confirm the delete. From here the user can either cancel and be re-directed to a view of all listings or confirm the delete. If the user confirms the delete, the listing will be deleted from the database and the user will be re-directed to view of all listings. 

## Resources Used
This project utilizes the [ReactStrap](https://reactstrap.github.io/?path=/docs/home-installation--page) bootstrap css framework for styling

This project utilizes Google [Firebase](https://firebase.google.com/) user authentication

This project utilizes [FontAwesome](https://fontawesome.com/) Icons

### Technologies
- HTML/CSS
- React with Javascript Library
- .NET 5 framework with SQL Server RDBM
- [ERD](https://dbdiagram.io/d/62cf4732cc1bc14cc5b35274) with dbdiagram
- [Wireframe](https://www.figma.com/file/jOJWXN5s8aYcmk9EtfWKwZ/Drum-Deals?node-id=0%3A1) generated with Figma
- [Logo](https://www.canva.com/design/DAFHtsAHH34/EDTqJGsC2QEsxMVVzHoBlA/view?utm_content=DAFHtsAHH34&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) created on Canva
- Swagger to verify server side fetch responses

## App Views
![Home View](/Images/home-page.png)
![All Listings](/Images/all-listings.png)
<p align="center">
  <img src="/Images/create-form.png" alt="Drum Deals Create Form"/>
</p>
<p align="center">
  <img src="/Images/edit-form.png" alt="Drum Deals Edit Form/>
</p>
<p align="center">
  <img src="/Images/details-view.png" alt="Drum Deals details view"/>
</p>
<br />

## Author Info
**Created by Wes Mitchell**

- LinkedIn - [Wesley Mitchell](https://www.linkedin.com/in/wesleymitchell87/)
- GitHub - [@wes-mitchell](https://github.com/wes-mitchell)
- WMDRUMS Website - [Tunes & Things](https://www.wmdrums.com/)

