USE [master]

IF db_id('DrumDeals') IS NULL
  CREATE DATABASE [DrumDeals]
GO

USE [DrumDeals]
GO

DROP TABLE IF EXISTS [UserFavorite];
DROP TABLE IF EXISTS [Offer];
DROP TABLE IF EXISTS [Listing];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Category];
GO

CREATE TABLE [Listing] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [Condition] nvarchar(255) NOT NULL,
  [UserProfileId] int NOT NULL,
  [Location] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Price] decimal(38, 2) NOT NULL,
  [CategoryId] int NOT NULL,
  [PublishDate] datetime NOT NULL,
  [EndDate] datetime,
  [ImageUrl] nvarchar(255),
  [IsActive] bit NOT NULL DEFAULT (1),
  [PurchasePrice] decimal(38, 2) NOT NULL DEFAULT (0)
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(28) NOT NULL,
  [IsAdmin] bit NOT NULL,
  [IsActive] bit NOT NULL DEFAULT (1)
)
GO

CREATE TABLE [UserFavorite] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [ListingId] int,
  [UserProfileId] int
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Offer] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserProfileId] int NOT NULL,
  [ListingId] int NOT NULL,
  [OfferAmount] decimal(38, 2) NOT NULL,
  [Accepted] bit NOT NULL DEFAULT (0)
)
GO

ALTER TABLE [UserFavorite] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Listing] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserFavorite] ADD FOREIGN KEY ([ListingId]) REFERENCES [Listing] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Listing] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [Offer] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Offer] ADD FOREIGN KEY ([ListingId]) REFERENCES [Listing] ([Id]) ON DELETE CASCADE
GO
