import { Schema } from "mongoose";
import {
  ACCOUNT_TYPES,
  EMAIL_STATUS,
  PHONE_STATUS,
  USER_ROLES,
  USER_STATUS,
} from "./user.constants";

export const UserSchema = new Schema(
  {
    customerId: {
      type: String,
      unique: true,
      index: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },
avatar: {
  type: String,
  default: null,
},
    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: USER_ROLES,
      default: "CUSTOMER",
    },

    status: {
      type: String,
      enum: USER_STATUS,
      default: "PENDING",
    },

    emailStatus: {
      type: String,
      enum: EMAIL_STATUS,
      default: "PENDING",
    },

    phoneStatus: {
      type: String,
      enum: PHONE_STATUS,
      default: "PENDING",
    },

    accountType: {
      type: String,
      enum: ACCOUNT_TYPES,
      default: "INDIVIDUAL",
    },

    verificationToken: {
      type: String,
      default: null,
    },

    verificationTokenExpires: {
      type: Date,
      default: null,
    },

    passwordResetToken: {
      type: String,
      default: null,
    },

   passwordResetTokenExpires: {
  type: Date,
  default: null,
},
twoFactorEnabled: {
  type: Boolean,
  default: false,
},

twoFactorCode: {
  type: String,
  default: null,
},

twoFactorCodeExpires: {
  type: Date,
  default: null,
},

twoFactorLastSent: {
  type: Date,
  default: null,
},
failedLoginAttempts: {
  type: Number,
  default: 0,
},

lockedUntil: {
  type: Date,
  default: null,
},

lastPasswordChanged: {
  type: Date,
  default: null,
},

lastLoginIp: {
  type: String,
  default: null,
},

lastLoginDevice: {
  type: String,
  default: null,
},
    lastLogin: {
      type: Date,
      default: null,
    },
    lastLoginLocation: {
  type: String,
  default: null,
},

lastLoginBrowser: {
  type: String,
  default: null,
},

passwordExpiresAt: {
  type: Date,
  default: null,
},
emailNotifications: {
  type: Boolean,
  default: true,
},

smsNotifications: {
  type: Boolean,
  default: false,
},

marketingEmails: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true,
  }
);