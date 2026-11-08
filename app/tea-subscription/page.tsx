import type {Metadata} from "next";
import SubscriptionView from "./subscription-view";
export const metadata:Metadata={title:"Charim Tea Subscription | Million Routines",description:"Explore proposed Korean tea subscriptions: one 40 g tea from $24 or two 30 g teas from $39 per delivery, plus proposed US shipping. Join launch updates.",alternates:{canonical:"/tea-subscription"}};
export default function SubscriptionPage(){return <SubscriptionView/>}
