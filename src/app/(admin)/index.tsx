import { Redirect } from "expo-router";

export default function TabIndex() {
    return <Redirect href={'/(admin)/menu/'} />; // Redirects to the admin menu, this is done because the index 
}