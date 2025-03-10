import twilio from 'twilio';
import { config } from 'dotenv';

config(); // Load .env automatically

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

if (!accountSid || !authToken || !whatsappNumber) {
    throw new Error("Twilio credentials are missing in .env file");
}

const client = twilio(accountSid, authToken);

/**
 * Send WhatsApp Message using Twilio API
 * @param {string} mobile - Recipient's WhatsApp number (e.g., "+919XXXXXXXXX")
 * @param {string} message - Message to send
 * @returns {Promise<object>} - Twilio API response
 */
const sendWhatsAppMessage = async (mobile, message) => {
    try {
        if (!mobile || !message) {
            throw new Error("Mobile number and message are required.");
        }

        const response = await client.messages.create({
            body: message,
            from: whatsappNumber,
            to: `whatsapp:${mobile}` // Ensure mobile includes +91
        });

        // console.log("Message sent successfully:", response.sid);
        return response;
    } catch (error) {
        console.error("Error sending WhatsApp message:", error.code, error.message, error.moreInfo);
        throw error;
    }
};

export default sendWhatsAppMessage;
