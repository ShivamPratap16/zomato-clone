import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
      ref: "User",
      required: true,
    },
    preferences: [
      {
        type: {
          type: String, // Example: "Enable all", "Newsletters", etc.
          required: true,
        },
        description: {
          type: String, // Description of the notification type
        },
        push: {
          type: Boolean, // Push notification preference
          default: false,
        },
        email: {
          type: Boolean, // Email notification preference
          default: false,
        },
        whatsapp: {
          type: Boolean, // WhatsApp notification preference
          default: false,
        },
      },
    ],
    updatedAt: {
      type: Date, // Timestamp of the last update
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

export const SettingModel = mongoose.model("Setting", SettingsSchema);
