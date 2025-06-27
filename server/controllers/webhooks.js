import { Webhook } from "svix";
import User from '../models/user.js';

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    console.log("✅ Webhook hit");
    console.log("Headers:", req.headers);
    console.log("Body received:", JSON.stringify(req.body, null, 2));

    const { data, type } = req.body;

    console.log("➡️ Event type:", type);

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          image: data.image_url,
          resume: '',
        };

        console.log("📝 Creating user:", userData);

        await User.create(userData);
        res.status(200).json({});
        break;
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
          image: data.image_url,
        };

        console.log("🔄 Updating user:", userData);

        await User.findByIdAndUpdate(data.id, userData);
        res.status(200).json({});
        break;
      }

      case 'user.deleted': {
        console.log("❌ Deleting user:", data.id);

        await User.findByIdAndDelete(data.id);
        res.status(200).json({});
        break;
      }

      default: {
        console.log("⚠️ Unknown event:", type);
        res.status(200).json({});
      }
    }
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(500).json({
      success: false,
      message: "Webhook error",
      error: error.message,
    });
  }
};
