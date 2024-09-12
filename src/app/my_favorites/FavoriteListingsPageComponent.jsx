import Container from "@/components/common/Container"
import HeaderComponent from "@/components/common/HeaderComponent"
import ListingCard from "@/components/listings/ListingCard"

const FavoriteListingsPageComponent = ({favoriteListings, currentUser}) => {
    return (
        <Container>
            <HeaderComponent
                title="Favorites"
                subtitle="List of places you have favorited!"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {favoriteListings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        currentUser={currentUser}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    )
}

export default FavoriteListingsPageComponent;