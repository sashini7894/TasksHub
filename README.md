University of Kelaniya

Academic Year: 2024/2025 (Semester 2)

Course: Mobile Application Development

Practical Tutorial 07: Persistent Storage & Local Notifications 

1. Persistent Storage (AsyncStorage):
   - Securely stores user tasks and profile information locally on the device.
   - Data persists even if the app is completely closed or restarted.

2. Hybrid File-Based Navigation (Expo Router):
   - Combines Bottom Tabs (`Dashboard` and `Profile`) with Stack Navigation (Modal screen for adding new tasks).

3. Local Notifications (`expo-notifications`):
   - Triggers instant custom local notifications when a task is successfully created and saved.

4. Image Picker (`expo-image-picker`):
   - Allows users to pick profile photos from their device gallery, crop them into square avatars, and update their profile details.

TasksHub/
├── app/
│   ├── _layout.tsx           # Root Layout & Notification Setup
│   ├── add-task.tsx          # Add Task Modal Screen
│   └── (tabs)/
│       ├── _layout.tsx       # Bottom Tabs Configuration
│       ├── index.tsx         # Dashboard Screen (Reading Data)
│       └── profile.tsx       # Profile Screen & Image Picker
├── Output_Screens/           # Contains application output screenshots
├── package.json              # Project dependencies and metadata
└── README.md                 # Project Documentation
