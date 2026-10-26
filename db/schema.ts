import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const waitlist = sqliteTable("waitlist", {
 id: text("id").primaryKey(),
 email: text("email").notNull().unique(),
 preference: text("preference").notNull(),
 consentVersion: text("consent_version").notNull(),
 createdAt: integer("created_at").notNull(),
});
