import Container from "@/components/common/Container";
import EmptyListingsComponent from "@/components/listings/EmptyListingsComponent";
import getListings from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";
import ListingCard from "@/components/listings/ListingCard";

const Home = async ({ params }) => {
  const listings = await getListings(params);
  const currentUser = await getCurrentUser();

  if(listings.length === 0) {
    return (
      <EmptyListingsComponent showReset={true} />
    )
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => {
          return (
            <ListingCard key={listing.id} data={listing} currentUser={currentUser}/>
          )
        })}
      </div>
    </Container>
  )
}

export default Home;