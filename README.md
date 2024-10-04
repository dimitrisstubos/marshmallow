# Marshmallow

Marshmallow is a financial education app designed to help parents teach their children about money management, savings, and responsibility through chores and quests.

## Hosted Demo

[marshmallow demo](https://marshmallow-radar.replit.app/)

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



