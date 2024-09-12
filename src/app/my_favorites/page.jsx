import EmptyComponent from "@/components/common/EmptyComponent";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings"
import FavoriteListingsPageComponent from "./FavoriteListingsPageComponent";

const FavoriteListingsPage = async () => {
    const favoriteListings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyComponent
                title="Unauthorized"
                subtitle="Please login"
            />
        )
    }

    if (favoriteListings.length === 0) {
        return (
            <EmptyComponent
                title="No favorites found"
                subtitle="Looks like you have no favorites"
            />
        )
    }

    return (
        <FavoriteListingsPageComponent 
            favoriteListings={favoriteListings}
            currentUser={currentUser}
        />
    )
}
export default FavoriteListingsPage;