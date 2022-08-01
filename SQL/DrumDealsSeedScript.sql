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
'https://res.cloudinary.com/wmdrums/image/upload/v1659122404/drumdeals/swingstar_bisnmf.jpg'),
(2, 'Meinl 20" Extra Dry Ride Cymbal', 'New', 7, 'Nashville, TN', 'Brand New 20" Meinl Byzance Extra Dry Ride Cymbal. Willing to ship.', 459.99, 2, '2022-07-07T20:46:06.003Z',
'https://res.cloudinary.com/wmdrums/image/upload/v1659122700/drumdeals/meinl_y6bgci.jpg'),
(3, '14" x 5" DW Snare Drum', 'New', 5, 'Richmond, VA', '14 x 5 Maple Snare Drum in brand new condition. Warm and crisp sound', 329.50, 7, '2022-07-05T13:34:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659122840/drumdeals/dw_snare_tfhyb5.jpg'),
(4, 'Pearl Rockin Cowbell', 'Used', 3, 'New York, NY', 'Loud cowbell just like Will Ferrell played in the Blue Oyster Cult skit from SNL!', 25.99, 3, '2022-07-15T15:37:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659122101/drumdeals/cowbell_akbp2r.jpg'),
(5, 'Yamaha Boom Cymbal Stand', 'New', 6, 'Seattle, WA', 'Sturdy double braced boom cymbal stand for crash and ride cymbals.', 75.00, 4, '2022-06-29T14:31:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659122408/drumdeals/boom_stand_witlcc.jpg'),
(6, 'Gibraltar Aux Percussion Clamp', 'New', 4, 'Los Angeles, CA', 'Great clamp that goes on your cymbal stand to hold a cowbell, woodblock or any other aux percussion 
instrument you may have', 13.99, 5, '2022-07-03T16:51:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659122968/drumdeals/gibraltar_mwt3ch.jpg'),
(7, 'Ludwig 22" Bass Drum', 'Used', 2, 'Rapid City, SD', 'Incredible sounding 22" vintage maple bass drum. Sounds just like the one Bonzo used in Madison Sqare Garden!!!', 415.00, 5, '2022-06-27T19:31:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659123256/drumdeals/ludwig_bass_mdw7h6.jpg'),
(8, 'Complete Risen Drums Custom Drums', 'Used', 1, 'St. Paul, MN', 'Complete birch shell kit custom built for my old band. I just don''t use them anymore and I would hate to see them
 go to waste. High Tom 12 x 10, Floor Tom 16 x 16, Kick Drum 22 x 18.', 465.00, 1, '2022-07-03T17:58:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659122404/drumdeals/risen_drums_k2orab.jpg'),
(9, '14" K Zildjian Hi Hats', 'Slightly Used', 5, 'Atlanta, GA', 'I have only used these at a few gigs and they have minor signs of use. Dark timbre and great stick definition!', 510.99, 2, '2022-07-14T18:43:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659123335/drumdeals/zildjian_hats_rdisyp.jpg'),
(10, '20" Remo P3 Kick Batter Head', 'New', 4, 'Austin, TX', 'Found this clear 20" kick head in the studio and realized it has never been used. I have no need for it as I mostly track jazz artists.', 20.00, 8, '2020-07-04T09:41:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659123451/drumdeals/remo_head_tzlojp.jpg'),
(11, 'Evans Practice Pad', 'Used', 6, 'Seattle, WA', 'This classic Evans Real Feel pad has seen a lot of use but still works great.', 15.99, 5, '2022-06-15T10:13:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659123762/drumdeals/evans_yfts7u.jpg'),
(12, 'LP Triangle Like New', 'Like New', 2, 'Dayton, OH', 'This triangle was only used once for a community band performance. It has very minor wear from that performance.', 17.99, 3, '2022-07-20T10:13:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659122404/drumdeals/triangle_uydsap.jpg'),
(13, 'Sonic Energy Gong Mallet', 'Used', 3, 'Rockford, IL', 'This mallet has seen a good bit of use so I am will to let it go cheap!', 21.99, 5, '2022-07-28T10:13:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659122404/drumdeals/gong_mallet_ogqbqy.jpg'),
(14, 'SKB 14 x 5.5 Molded Hard Snare Drum Case', 'Slightly Used', 5, 'Reno, NV', 'This is slightly used and only been on a couple of tours. It stills holds up and has many years left.', 75.99, 7, '2022-08-01T10:13:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659369183/drumdeals/kbxzypcsl8hm0ia5hpyj.jpg')
(15, 'Meinl 22" Soft Cymbal Bag', 'New', 1, 'Orlando, FL', 'Brand New! Bought it for my kid and they never used it.', 55.75, 5, '2022-07-16T10:13:06.003Z', 
'https://res.cloudinary.com/wmdrums/image/upload/v1659369962/drumdeals/ijm10ztihaelyszurbxh.jpg')
set identity_insert [Listing] off;
