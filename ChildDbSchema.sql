-- Child Database Schema

-- Child table
CREATE TABLE Child (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    spendingBalance DECIMAL(10, 2) DEFAULT 0,
    savingsBalance DECIMAL(10, 2) DEFAULT 0,
    yieldBalance DECIMAL(10, 2) DEFAULT 0,
    profilePicture VARCHAR(255)
);

-- Transaction table
CREATE TABLE Transaction (
    id SERIAL PRIMARY KEY,
    childId INTEGER REFERENCES Child(id),
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'spending', 'saving', 'yield'
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chore table
CREATE TABLE Chore (
    id SERIAL PRIMARY KEY,
    childId INTEGER REFERENCES Child(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    reward DECIMAL(10, 2) NOT NULL,
    frequency VARCHAR(50),
    lastCompleted TIMESTAMP,
    state INTEGER -- 0: pending, 1: completed, 2: approved
);

-- Quest table
CREATE TABLE Quest (
    id SERIAL PRIMARY KEY,
    childId INTEGER REFERENCES Child(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    reward DECIMAL(10, 2) NOT NULL,
    progress INTEGER DEFAULT 0,
    goal INTEGER,
    state INTEGER -- 0: in progress, 1: completed, 2: claimed
);

-- Notification table
CREATE TABLE ChildNotification (
    id SERIAL PRIMARY KEY,
    childId INTEGER REFERENCES Child(id),
    message TEXT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);