BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Person] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Person_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Person_isActive_df] DEFAULT 1,
    CONSTRAINT [Person_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Person_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Print] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Print_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Print_isActive_df] DEFAULT 1,
    CONSTRAINT [Print_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Print_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Profile] (
    [id] INT NOT NULL IDENTITY(1,1),
    [bio] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Profile_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Profile_isActive_df] DEFAULT 1,
    CONSTRAINT [Profile_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Role_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Role_isActive_df] DEFAULT 1,
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RoleForPerson] (
    [id] INT NOT NULL IDENTITY(1,1),
    [personId] INT NOT NULL,
    [roleId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [RoleForPerson_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [RoleForPerson_isActive_df] DEFAULT 1,
    CONSTRAINT [RoleForPerson_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Door] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Door_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Door_isActive_df] DEFAULT 1,
    CONSTRAINT [Door_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Gender] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Gender_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Gender_isActive_df] DEFAULT 1,
    CONSTRAINT [Gender_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Directorate] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Directorate_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Directorate_isActive_df] DEFAULT 1,
    CONSTRAINT [Directorate_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Bank] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [nameEnglish] NVARCHAR(1000),
    [Bankid] INT,
    [status] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Bank_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Bank_isActive_df] DEFAULT 1,
    CONSTRAINT [Bank_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Ministry] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [code] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Ministry_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Ministry_isActive_df] DEFAULT 1,
    CONSTRAINT [Ministry_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Department] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [directorateId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Department_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Department_isActive_df] DEFAULT 1,
    CONSTRAINT [Department_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Event] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [fromDate] DATETIME2 NOT NULL,
    [toDate] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Event_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Event_isActive_df] DEFAULT 1,
    CONSTRAINT [Event_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Visitor] (
    [id] INT NOT NULL IDENTITY(1,1),
    [fullname] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [job_description] NVARCHAR(1000),
    [destination] NVARCHAR(1000),
    [mobile] NVARCHAR(1000),
    [h_Name] NVARCHAR(1000),
    [h_Department] NVARCHAR(1000),
    [h_Directorate] NVARCHAR(1000),
    [note] NVARCHAR(1000),
    [fromDate] DATETIME2 NOT NULL,
    [toDate] DATETIME2,
    [departmentId] INT,
    [directorateId] INT,
    [profileId] INT,
    [genderId] INT,
    [authorId] INT NOT NULL,
    [eventId] INT,
    [printId] INT,
    [bankId] INT,
    [ministryId] INT,
    [doorId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Visitor_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Visitor_isActive_df] DEFAULT 1,
    CONSTRAINT [Visitor_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Visitor_Logs] (
    [id] INT NOT NULL IDENTITY(1,1),
    [mainDoorIn] DATETIME2,
    [mainDoorOut] DATETIME2,
    [doorId] INT,
    [subDoorIn] DATETIME2,
    [subDoorOut] DATETIME2,
    [visitorId] INT,
    [online] BIT NOT NULL CONSTRAINT [Visitor_Logs_online_df] DEFAULT 1,
    [day] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Visitor_Logs_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [isActive] BIT NOT NULL CONSTRAINT [Visitor_Logs_isActive_df] DEFAULT 1,
    CONSTRAINT [Visitor_Logs_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[RoleForPerson] ADD CONSTRAINT [RoleForPerson_personId_fkey] FOREIGN KEY ([personId]) REFERENCES [dbo].[Person]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RoleForPerson] ADD CONSTRAINT [RoleForPerson_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Department] ADD CONSTRAINT [Department_directorateId_fkey] FOREIGN KEY ([directorateId]) REFERENCES [dbo].[Directorate]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_authorId_fkey] FOREIGN KEY ([authorId]) REFERENCES [dbo].[Person]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_printId_fkey] FOREIGN KEY ([printId]) REFERENCES [dbo].[Print]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_profileId_fkey] FOREIGN KEY ([profileId]) REFERENCES [dbo].[Profile]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_doorId_fkey] FOREIGN KEY ([doorId]) REFERENCES [dbo].[Door]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_genderId_fkey] FOREIGN KEY ([genderId]) REFERENCES [dbo].[Gender]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_directorateId_fkey] FOREIGN KEY ([directorateId]) REFERENCES [dbo].[Directorate]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_bankId_fkey] FOREIGN KEY ([bankId]) REFERENCES [dbo].[Bank]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_ministryId_fkey] FOREIGN KEY ([ministryId]) REFERENCES [dbo].[Ministry]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_departmentId_fkey] FOREIGN KEY ([departmentId]) REFERENCES [dbo].[Department]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor] ADD CONSTRAINT [Visitor_eventId_fkey] FOREIGN KEY ([eventId]) REFERENCES [dbo].[Event]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor_Logs] ADD CONSTRAINT [Visitor_Logs_doorId_fkey] FOREIGN KEY ([doorId]) REFERENCES [dbo].[Door]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Visitor_Logs] ADD CONSTRAINT [Visitor_Logs_visitorId_fkey] FOREIGN KEY ([visitorId]) REFERENCES [dbo].[Visitor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
