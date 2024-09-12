export const dynamic = 'force-dynamic' 
import getListings from "./actions/getListings";
import getCurrentUser from "./actions/getCurrentUser";
import EmptyListingsComponent from "@/components/listings/EmptyListingsComponent";
import Container from "@/components/common/Container";
import ListingCard from "@/components/listings/ListingCard";

/**
 * Home component that displays a list of listings.
 *
 * This component fetches listings data and the current user information,
 * then renders the listings in a grid layout. If no listings are found,
 * it displays an empty state component instead.
 *
 * @param {Object} searchParams - The query parameters from the URL, typically used for filtering listings.
 * @returns {JSX.Element} - Returns a JSX element containing either the listings or an empty state component.
 */
const Home = async ({ searchParams }) => {
  // Fetch listings based on search parameters (e.g., filters like location, dates)
  const listings = await getListings(searchParams);
  
  // Fetch the current user information
  const currentUser = await getCurrentUser();

  // If no listings are found, render the EmptyListingsComponent
  if (listings.length === 0) {
    return <EmptyListingsComponent showReset={true} />;
  }

  // Render the listings inside a grid layout if there are listings available
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default Home;