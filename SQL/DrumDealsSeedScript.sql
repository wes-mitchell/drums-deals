USE [DrumDeals]
GO

set identity_insert [UserProfile] on;
INSERT INTO "UserProfile" ("Id","FirstName", "LastName", "Email", "FirebaseUserId", IsAdmin, IsActive) 
VALUES 
(1, 'Wes', 'Mitchell', 'wmdrums@gmail.com', 'Ich4JafBP4WpbmBAJhdT7KYLryn2', 1, 1),
(2, 'John', 'Bonham', 'john@bonham.com', 'bVAkPyeO8Kfg5HirDKMsZlwp1TG3', 0, 1),
(3, 'Nikki', 'Glaspie', 'nikki@glaspie.com', '6dbWE1bQm0aX4EFSOCQUKZiUB8j1', 0, 1),
(4, 'Anika', 'Nilles', 'anika@nilles.com', 'eIP2L2BDrpafXNkBLBvofItSX5G3', 0, 1),
(5, 'Nate', 'Smith', 'nate@smith.com', 'FTNkSmNpWaZnn9Q8XIWLFWMpc9f1', 0, 1),
(6, 'Karen', 'Carpenter', 'karen@carpenter.com', 'MPaBjyclJbPZO8bujAvPWs3QtkJ2', 0, 1),
(7, 'Benny', 'Greb', 'benny@greb.com', 'BBpUgX4DwLSlxiYox6UAtMLa3qm1', 0, 1)
set identity_insert [UserProfile] off;

set identity_insert [Category] on;
INSERT INTO "Category" ("Id","Name")
VALUES 
(1, 'Shells'),
(2, 'Cymbals'),
(3, 'Auxiliary'),
(4, 'Hardware'),
(5, 'Misc'),
(6, 'Full Setup'),
(7, 'Snare'),
(8, 'Drumhead')
set identity_insert [Category] off;

set identity_insert [Listing] on;
INSERT INTO "Listing" ("Id", "Title", "Condition", "UserProfileId", "Location", "Description", "Price", "CategoryId", "PublishDate", "ImageUrl")
VALUES 
(1, 'Tama Swingstar with Sabian B8 Cymbals', 'Slightly Used', 1, 'Chicago, IL', 'Five piece beginner drum set with all hardware and Cymbals. Tom sizes are 22", 12", 13", 16" and 14 x 5 Snare Drum.
Cymbals include 14" hi hats, 16" crash, and 20" ride.', 350.00, 6, '20220618 10:34:09 AM',
'https://media.sweetwater.com/api/i/q-82__f-webp__ha-8104db655a366002__hmac-319630e204f511a9c29a31fa5216a10c1569391f/images/items/750/IE5[Roommates]8CHLB-large.jpg.auto.webp'),
(2, 'Meinl 20" Extra Dry Ride Cymbal', 'New', 7, 'Nashville, TN', 'Brand New 20" Meinl Byzance Extra Dry Ride Cymbal. Willing to ship.', 459.99, 2, '2020-07-07T20:46:06.003Z',
'https://media.sweetwater.com/api/i/q-82__f-webp__ha-ecbb70f1a5952270__hmac-83336188861919d2337a7905fec7cf46bd9b7fba/images/items/750/B20EDMR-large.jpg.auto.webp'),
(3, '14" x 5" DW Snare Drum', 'New', 5, 'Richmond, VA', '14 x 5 Maple Snare Drum in brand new condition. Warm and crisp sound', 329.50, 7, '2020-07-05T13:34:06.003Z', 
'https://media.sweetwater.com/api/i/q-82__f-webp__ha-e5cf3e61a7beda55__hmac-18df322330e9e8c1a8c245ec6b9cd1eb4b34bc7f/images/items/750/DRM40614SFC-large.jpg.auto.webp'),
(4, 'Pearl Rockin Cowbell', 'Used', 3, 'New York, NY', 'Loud cowbell just like Will Ferrell played in the Blue Oyster Cult skit from SNL!', 25.99, 3, '2020-07-15T15:37:06.003Z', 
'https://media.sweetwater.com/api/i/q-82__f-webp__ha-0ae95fae440afcfd__hmac-7dc50952fd0347ea4bada36d7173b59410d7304b/images/items/750/PCB1030-large.jpg.auto.webp'),
(5, 'Yamaha Boom Cymbal Stand', 'New', 6, 'Seattle, WA', 'Sturdy double braced boom cymbal stand for crash and ride cymbals.', 75.00, 4, '2020-06-29T14:31:06.003Z', 
'https://c1.zzounds.com/media/productmedia/fit,2018by3200/quality,85/YAM_CS665A_RESIZED_827662-f5c7b3b8a029ab088b1cc48139f1306d.jpg'),
(6, 'Gibraltar Aux Percussion Clamp', 'New', 4, 'Los Angeles, CA', 'Great clamp that goes on your cymbal stand to hold a cowbell, woodblock or any other aux percussion 
instrument you may have', 13.99, 5, '2020-07-03T16:51:06.003Z', 
'https://media.sweetwater.com/api/i/q-82__f-webp__ha-eb4becc09e340db8__hmac-b8a819aea891699a3b0d8a1ea96919811f1fd093/images/items/750/SCBGC-large.jpg.auto.webp'),
(7, 'Ludwig 22" Bass Drum', 'Used', 2, 'Rapid City, SD', 'Incredible sounding 22" vintage maple bass drum. Sounds just like the one Bonzo used in Madison Sqare Garden!!!', 415.00, 5, '2020-06-27T19:31:06.003Z', 
'https://i.ebayimg.com/images/g/Ys8AAOSwv85hsssb/s-l500.jpg'),
(8, 'Complete Risen Drums Custom Drums', 'Used', 1, 'St. Paul, MN', 'Complete birch shell kit custom built for my old band. I just don''t use them anymore and I would hate to see them
 go to waste. High Tom 12 x 10, Floor Tom 16 x 16, Kick Drum 22 x 18.', 465.00, 1, '2020-07-03T17:58:06.003Z', 
'https://risendrumco.com/wp-content/uploads/2019/11/Powder-Blue-Nic-2.jpg'),
(9, '14" K Zildjian Hi Hats', 'Slightly Used', 5, 'Atlanta, GA', 'I have only used these at a few gigs and they have minor signs of use. Dark timbre and great stick definition!', 510.99, 2, '2020-07-14T18:43:06.003Z', 
'https://m.media-amazon.com/images/I/61AOzWztiJL._AC_SX679_.jpg'),
(10, '20" Remo P3 Kick Batter Head', 'New', 4, 'Austin, TX', 'Found this clear 20" kick head in the studio and realized it has never been used. I have no need for it as I mostly track jazz artists.', 20.00, 8, '2020-07-04T09:41:06.003Z', 
'https://media.sweetwater.com/api/i/q-82__f-webp__ha-7e64a2abc6f55bfb__hmac-ca191f29f416897c5d1be60088f0991b2b45618c/images/items/750/P31322-C2-large.jpg.auto.webp'),
(11, 'Evans Practice Pad', 'Used', 6, 'Seattle, WA', 'This classic Evans Real Feel pad has seen a lot of use but still works great.', 15.99, 5, '2020-06-15T10:13:06.003Z', 
'https://i.ebayimg.com/images/g/RLUAAOSwMplhwNoY/s-l500.jpg')
set identity_insert [Listing] off;
