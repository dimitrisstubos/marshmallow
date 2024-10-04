-- Parent Database Schema

-- Parent table
CREATE TABLE Parent (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL
);

-- Child-Parent relationship table
CREATE TABLE ChildParent (
    childId INTEGER REFERENCES Child(id),
    parentId INTEGER REFERENCES Parent(id),
    PRIMARY KEY (childId, parentId)
);

-- Parent Notification table
CREATE TABLE ParentNotification (
    id SERIAL PRIMARY KEY,
    parentId INTEGER REFERENCES Parent(id),
    message TEXT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE ParentSettings (
    parentId INTEGER PRIMARY KEY REFERENCES Parent(id),
    notificationPreferences JSON,
    allowanceRules JSON,
    choreSettings JSON,
    questSettings JSON
);

-- Analytics table (for storing aggregated data)
CREATE TABLE ParentAnalytics (
    id SERIAL PRIMARY KEY,
    parentId INTEGER REFERENCES Parent(id),
    totalSavings DECIMAL(10, 2),
    totalChoresCompleted INTEGER,
    totalQuestsCompleted INTEGER,
    date DATE
);