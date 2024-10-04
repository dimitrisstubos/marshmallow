# Marshmallow

Marshmallow is a financial education app designed to help parents teach their children about money management, savings, and responsibility through chores and quests.

## Hosted Demo

[Hosted Demo](https://marshmallow-radar.replit.app/)

## Views

### Landing Page

- **index.html**
  - Serves as the entry point for the application
  - Allows users to choose between Parent and Child dashboards

### Parent Views

1. **ParentDashboardView.html**
   - Main dashboard for parents
   - Displays children's accounts and balances
   - Shows recent activities across all children
   - Provides quick access to add chores and manage settings

2. **ParentAnalyticsView.html**
   - Displays analytics and statistics
   - Shows total savings across all children
   - Presents the number of completed chores and quests

3. **ParentSettingsView.html**
   - Allows parents to manage their account settings
   - Provides options to edit profile, change password, and set notification preferences
   - Includes settings for child accounts, allowance rules, and chore/quest configurations

4. **ParentNotificationsView.html**
   - Displays notifications for parents
   - Shows updates about children's activities, completed chores, and achieved goals

5. **ParentAddChoreView.html**
   - Allows parents to add new chores
   - Includes fields for chore name, description, reward, and child assignment

### Child Views

1. **ChildDashboardView.html**
   - Main dashboard for children
   - Displays total balance and individual balances for spending, savings, and yield accounts
   - Provides quick actions like claim, swap, and withdraw

2. **ChildChoreView.html**
   - Lists available and completed chores
   - Allows children to mark chores as done

3. **ChildQuestView.html**
   - Displays active and completed quests
   - Shows progress for each quest and associated rewards

4. **ChildNotificationsView.html**
   - Shows notifications for children
   - Includes updates about new chores, completed quests, and account activities

## Database Schemas

The project uses two main database schemas:

- **ParentDbSchema.sql**: Defines tables for parent accounts, settings, notifications, and analytics.
- **ChildDbSchema.sql**: Defines tables for child accounts, transactions, chores, quests, and notifications.

## Hosting on Replit

To host this project on Replit:

1. Create a new Repl and choose "HTML, CSS, JS" as the template.
2. Upload all the HTML files to the Repl.
3. Set the "index.html" file as the main file in your Repl settings.
4. Click the "Run" button to start the web server.
5. Your project will be accessible via a unique Replit URL.

Note: The database schemas are for reference only and cannot be directly used in the Replit environment. For a fully functional app, you would need to implement a backend server and database.

## Technologies Used

- HTML5
- CSS (Tailwind CSS)
- JavaScript
- SQL (PostgreSQL) - for reference only in this demo

## Contributing

(Add guidelines for contributing to the project)

## License

(Add license information)

