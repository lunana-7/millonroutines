import { getDb } from "../../../db";
import { waitlist } from "../../../db/schema";
export async function POST(request: Request) {
 const origin = request.headers.get("origin");
 if (origin && origin !== new URL(request.url).origin) return Response.json({error:"Please submit the form from this website."},{status:403});
 const bodyText = await request.text();
 if (bodyText.length > 2048) return Response.json({error:"Please check the form and try again."},{status:413});
 let body;
 try { body = JSON.parse(bodyText); } catch { return Response.json({error:"Please check the form and try again."},{status:400}); }
 if (!body || typeof body !== "object") return Response.json({error:"Please check the form."},{status:400});
 if (body.website) return Response.json({ok:true});
 const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
 if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({error:"Please enter a valid email address."},{status:400});
 if (body.consent !== true) return Response.json({error:"Please agree to receive project and launch updates."},{status:400});
 if (!["morning","connection","evening","undecided","korean-tea"].includes(body.preference)) return Response.json({error:"Please choose a routine preference."},{status:400});
 try {
  await getDb().insert(waitlist).values({id:crypto.randomUUID(),email,preference:body.preference,consentVersion:"launch-updates-v1",createdAt:Date.now()}).onConflictDoNothing({target:waitlist.email});
  return Response.json({ok:true},{headers:{"Cache-Control":"no-store"}});
 } catch { return Response.json({error:"We couldn’t save your spot. Please try again in a moment."},{status:503}); }
}
